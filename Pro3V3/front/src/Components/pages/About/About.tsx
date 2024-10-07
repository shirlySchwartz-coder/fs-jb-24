import { CssBaseline, Sheet } from '@mui/joy';
import './About.css';
import setting from '../../utils/Setting';
import Shirly from '../../../Uploads/shirly.jpg';

export function About(): JSX.Element {
  return (
    <div className='About'>
      <CssBaseline />
      <Sheet variant='outlined' sx={setting.SheetAboutValues.sx}>
        <h2>About Me</h2>
        <div className='row'>
          <div className='col-2'>
            <img src={Shirly} alt='Shirly Schwartz' width={171} height={180} />
          </div>
          <div className='col-'>
            <div>
              <h4>Welcome to my website!</h4>
              <p>
                I'm Shirly Schwartz, a Full Stack developer with a passion for
                creating dynamic web applications. I've honed my skills in
                JavaScript, React, Node.js, MySQL, and Angular, and I'm excited
                to bring ideas to life.
              </p>
              <div>
                <h4>What I Do</h4>
                <ul>
                  <li>
                    <b>Frontend Development: </b>I build engaging user
                    interfaces using React and Angular, ensuring a smooth user
                    experience.
                  </li>
                  <li>
                    <b>Backend Development: </b>With Node.js, I create efficient
                    server-side applications that handle data seamlessly.
                  </li>
                  <li>
                    <b>Database Management:</b>I work with MySQL to design and
                    manage databases that support various applications.
                  </li>
                </ul>
              </div>
              <div>
                <h4>Why Work With Me?</h4>
                <p>
                  I am dedicated to understanding your needs and collaborating
                  closely to deliver tailored solutions. If you're looking for
                  someone who is eager to learn and grow alongside your project,
                  Id love to connect!
                </p>
              </div>
              <div>
                Feel free to reach out to discuss your ideas. Lets create
                something amazing together!
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
