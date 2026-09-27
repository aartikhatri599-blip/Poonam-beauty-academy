// Simple, inline-styled HTML emails (email clients ignore <style> blocks and external CSS).

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const shell = (title: string, body: string) => `<!doctype html>
<html><body style="margin:0;background:#F6EEF4;font-family:Arial,Helvetica,sans-serif;color:#3B2440">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
        <tr><td style="background:linear-gradient(120deg,#F7C6B5,#E58FB4);background-color:#EFA3B5;padding:20px 28px">
          <div style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#3A1E36">Poonam Beauty Academy</div>
          <div style="font-size:12px;letter-spacing:1px;color:#3A1E36;text-transform:uppercase">Kache Quarter · Sonipat</div>
        </td></tr>
        <tr><td style="padding:28px">
          <h1 style="font-family:Georgia,serif;font-size:22px;margin:0 0 16px;color:#3D2540">${esc(title)}</h1>
          ${body}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

type EnquiryData = {
  name: string
  phone: string
  email?: string | null
  course?: string | null
  message?: string | null
  sourcePage?: string | null
}

export const staffEnquiryEmail = (e: EnquiryData, adminUrl: string) => {
  const row = (label: string, value?: string | null) =>
    value
      ? `<tr><td style="padding:8px 0;color:#76666A;width:120px;vertical-align:top">${label}</td><td style="padding:8px 0;font-weight:bold">${esc(value)}</td></tr>`
      : ''
  const wa = `https://wa.me/91${encodeURIComponent(e.phone)}`
  return {
    subject: `New enquiry: ${e.name} – ${e.course || 'course not chosen'}`,
    html: shell(
      'New enquiry from the website',
      `<table role="presentation" width="100%" style="font-size:15px">
        ${row('Name', e.name)}
        ${row('Mobile', `+91 ${e.phone}`)}
        ${row('Email', e.email)}
        ${row('Course', e.course)}
        ${row('Message', e.message)}
        ${row('Page', e.sourcePage)}
      </table>
      <p style="margin:24px 0 8px">
        <a href="${wa}" style="display:inline-block;background:#25D366;color:#0B3D2E;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:999px">Reply on WhatsApp</a>
        &nbsp;
        <a href="tel:+91${esc(e.phone)}" style="display:inline-block;background:#3D2540;color:#fff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:999px">Call</a>
      </p>
      <p style="font-size:13px;color:#76666A">Promise on the website: a call back within 2 working hours. <a href="${esc(adminUrl)}" style="color:#A0458A">Open in admin</a></p>`,
    ),
  }
}

export const studentConfirmationEmail = (e: EnquiryData, whatsapp: string) => {
  const first = esc(e.name.split(' ')[0])
  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi! I just sent an enquiry on your website. My name is ${e.name}.`)}`
  return {
    subject: 'We got your enquiry – Poonam Beauty Academy',
    html: shell(
      `Thank you, ${first}!`,
      `<p style="font-size:15px;line-height:24px">We've received your enquiry${e.course ? ` about <b>${esc(e.course)}</b>` : ''}. Our team will call you on <b>+91 ${esc(e.phone)}</b> within 2 working hours to fix your free demo class.</p>
      <p style="font-size:15px;line-height:24px">Want a faster reply? Message us on WhatsApp.</p>
      <p style="margin:20px 0"><a href="${wa}" style="display:inline-block;background:#25D366;color:#0B3D2E;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:999px">Chat on WhatsApp</a></p>
      <p style="font-size:13px;color:#76666A">Poonam Beauty Academy, Kache Quarter, Sonipat, Haryana</p>`,
    ),
  }
}
