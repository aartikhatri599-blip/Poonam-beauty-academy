import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page on">
      <section className="sec">
        <div className="wrap thanks">
          <h1>Page not found</h1>
          <p className="lead">The page you were looking for has moved or doesn&apos;t exist.</p>
          <div className="btn-row mt-24" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-primary" href="/">Go to the homepage</Link>
            <Link className="btn btn-ghost" href="/courses">See our courses</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
