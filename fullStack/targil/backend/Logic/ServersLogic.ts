import { Servers } from '../Models/Servers';
import dal_mysql from '../dal/dal_mysql';

const getAllServers = async () => {
  //sql statement
  const sql = `
        SELECT *, \`hosting_comp\`.hosting_name FROM servers
        INNER JOIN \`hosting_comp\`
        ON \`servers\`.hosting_id = \`hosting_comp\`.hosting_id
    `;
  //execute the sql statement
  return await dal_mysql.execute(sql);
};

const addNewServer = async (newServer: Servers) => {
  const sql = `INSERT INTO servers 
  (server_id, server_name, server_ip,hosting_id, server_status, server_start)
    VALUES
    (${newServer.server_id}, '${newServer.server_name}', '${newServer.server_ip}', 
    ${newServer.hosting_id},  ${newServer.server_status} , '${newServer.server_start}'
    )`;
  return await dal_mysql.execute(sql);
};

const changStatus = async (serverId: number, stat: boolean) => {
  let timeNow: string | null = null;
  /*if (stat) {
      timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
  else{
    timeNow = null;
    
  }*/
  stat ? timeNow = new Date().toISOString().slice(0, 19).replace('T', ' '):  timeNow = null;
  console.log('serverId , timeNow , stat:', serverId, timeNow, stat);
  const sql = `UPDATE servers 
      SET server_status = ${stat},
      server_start = ${timeNow}
      WHERE (server_id = ${serverId}
      )`;
  return await dal_mysql.execute(sql);
};
export { getAllServers, addNewServer, changStatus };
