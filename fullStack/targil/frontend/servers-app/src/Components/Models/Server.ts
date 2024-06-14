export class Server {
    server_id: number;
    server_name: string;
    server_ip: string;
    hosting_id: number;
    server_status: boolean;
    server_start: Date | null;
    hosting_name: string;
    constructor(
      server_id: number,
      server_name: string,
      server_ip: string,
      hosting_id: number,
      server_status: boolean,
      server_start: Date | null,
      hosting_name: string
    ) {
      this.server_id = server_id;
      this.server_name = server_name;
      this.server_ip = server_ip;
      this.hosting_id = hosting_id;
      this.server_status = server_status;
      this.server_start = server_start;
      this.hosting_name = hosting_name;
    }
  }
  