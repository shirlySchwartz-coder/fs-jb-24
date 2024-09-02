class Vars{
    public LOGIN_URL = `http://localhost:8080/api/v1/login/loginUser`;
    public REGISTER_URL= `http://localhost:8080/api/v1/login/registerUser`
    public VacationsUrl = `http://localhost:8080/api/v1/vacations/all`;
    public Add_Vac_URL = `http://localhost:8080/api/v1/vacations/addVacation`;

    public FavoritesUrl = `http://localhost:8080/api/v1/vacations/favorites/`;
    }
const vars= new Vars();
export default vars;