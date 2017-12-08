export class EditGameModel {
    constructor(
        public identifier: string,
        public matchDate: Date,
        public homeTeam: string,
        public awayTeam: string,
        public venue: string,
        public grade: string,
        public videoUrl: string,
        public videoType: string,
        public importContent: string
      ) {  }
}