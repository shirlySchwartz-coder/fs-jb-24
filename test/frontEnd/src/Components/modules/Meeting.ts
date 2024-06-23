export class Meeting {
  id: number;
  team_id: number;
  start_time: Date;
  end_time: Date;
  details: string;
  room: string;

  constructor(
    id: number,
    team_id: number,
    start_time: Date,
    end_time: Date,
    details: string,
    room: string
  ) {
    this.id = id;
    this.team_id = team_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.details = details;
    this.room = room;
  }
}
