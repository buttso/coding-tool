export class CreateGameModel {
    constructor(
        public identifier: string,
        public matchDate: Date,
        public homeTeam: string,
        public awayTeam: string,
        public venue: string,
        public grade: string,
        public videoUrl: string,
        public importContent: string
      ) {  }
}