class Config{
    public webPort = 8080;
    public webHost = 'localhost';
    public connectionString = "mongodb://localhost:27017/BankAccounts"
}
const config = new Config();
export default config;