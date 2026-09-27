import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { staffEnquiryEmail, studentConfirmationEmail } from '../email/templates'

// After a new enquiry is saved: email the academy, and the student if they left an email.
const sendEnquiryEmails: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const { payload } = req
  if (!process.env.RESEND_API_KEY) {
    payload.logger.warn('RESEND_API_KEY is not set, so no enquiry email was sent.')
    return doc
  }

  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0, req })
  const notify = [settings?.notifications?.enquiryEmail, process.env.ENQUIRY_NOTIFY_EMAIL]
    .filter(Boolean)
    .join(',')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  try {
    if (notify.length) {
      const staff = staffEnquiryEmail(doc, `${serverUrl}/admin/collections/enquiries/${doc.id}`)
      await payload.sendEmail({ to: [...new Set(notify)], subject: staff.subject, html: staff.html })
    } else {
      payload.logger.warn('No enquiry notification address set (Site Settings → Notifications, or ENQUIRY_NOTIFY_EMAIL).')
    }
    if (doc.email) {
      const student = studentConfirmationEmail(doc, settings?.contact?.whatsapp || '')
      await payload.sendEmail({ to: doc.email, subject: student.subject, html: student.html })
    }
  } catch (err) {
    // Never lose an enquiry because an email failed: it is already saved in the database.
    payload.logger.error({ err, msg: `Failed to send enquiry email for enquiry ${doc.id}` })
  }
  return doc
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'course', 'status', 'createdAt'],
    group: 'Admissions',
    description: 'Every enquiry sent from the website forms. Update the status as you follow up.',
  },
  // Only logged-in staff can see enquiries. The website saves them through a server action.
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: '-createdAt',
  hooks: { afterChange: [sendEnquiryEmails] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'phone', type: 'text', required: true, admin: { description: '10-digit Indian mobile number' } },
        { name: 'email', type: 'email' },
      ],
    },
    { name: 'course', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Demo booked', value: 'demo' },
        { label: 'Enrolled', value: 'enrolled' },
        { label: 'Not interested', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', admin: { position: 'sidebar', description: 'Internal notes (not visible to the student).' } },
    { name: 'consent', type: 'checkbox', admin: { position: 'sidebar', readOnly: true } },
    { name: 'sourcePage', type: 'text', admin: { position: 'sidebar', readOnly: true } },
  ],
}
