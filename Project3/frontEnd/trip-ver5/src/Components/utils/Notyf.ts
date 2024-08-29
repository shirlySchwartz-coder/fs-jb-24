import { Notyf } from 'notyf';

class Notification {
  private notification = new Notyf({
    duration: 1000,
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'warning',
        },
      },
      {
        type: 'error',
        background: 'red',
        duration: 2000,
        dismissible: true,
      },
      {
        type: 'success',
        background: 'green',
        duration: 1000,
        dismissible: true,
      },
    ],
  });

  public success(message: string) {
    this.notification.success(message);
  }

  public error(message: string) {
    this.notification.error(message);
  }
}

const notyf = new Notification();

export default notyf;
