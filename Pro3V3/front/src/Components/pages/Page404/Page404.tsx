import './Page404.css';

export function Page404(): JSX.Element {
  return (
    <div className='Page404'>
      <section className='error'>
        <div className='error__content'>
          <div className='error__message message'>
            <h1 className='message__title'>Page Not Found</h1>
            <p className='message__text'>
              We're sorry, the page you were looking for isn't here.
              <img
                src='http://localhost:8080/1726574355017-cat.jpg'
                alt='Cat'
                width={600}
                height={400}
              />
              <br />
              <a
                href='http://localhost:3000'
                target='__blank'
                className='e-nav__link'
              >
                Go Home...!
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
