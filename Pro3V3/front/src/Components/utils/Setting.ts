class Setting{
    public SheetValues = {
        sx: {
          width: 500,
          mx: 'auto',
          my: 2,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          alignItems: 'center',
        },
      };
    //public REGISTER_URL= `http://localhost:8080/api/v1/login/registerUser`;
    public SheetChartValues = {
        sx: {
          width: 1000,
          height: 550,
          mx: 'auto',
          my: 2,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          alignItems: 'center',
        },
      };
}
const setting= new Setting();
export default setting;