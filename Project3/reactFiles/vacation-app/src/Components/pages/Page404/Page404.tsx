import './Page404.css';

export function Page404(): JSX.Element {
  return (
    <div className='Page404'>
      <section className='error'>
        <div className='error__content'>
          <div className='error__message message'>
            <h1 className='message__title'>Page Not Found</h1>
            <p className='message__text'>
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or take a look at our.
            </p>
          </div>
          <div className='error__nav e-nav'>
            <a
              href='http://localhost:3000'
              target='_blank'
              className='e-nav__link'
            ></a>
          </div>
        </div>
      </section>
    </div>
  );
}
