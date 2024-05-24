import "./page404.css";
import pic404 from '../../uploads/cat 404.jpeg'

export function Page404(): JSX.Element {
    return (
        <div className="page404">
            <br />
			<img src={pic404} alt="404" width="450" height="450" />
            <h3>Sorry, the location was not found but..</h3>
            <h3>We have other places for a perfect vacation</h3>
        </div>
    );
}
