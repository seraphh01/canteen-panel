// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: "http://192.168.56.1:5000",
  baseUrl: "https://my-canteen.herokuapp.com",
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjg0MTU3MDM0LCJqdGkiOiIyYTkxN2YyOS0xZDJhLTQxYjItYmExYy1kNTkwMzE4OWQ2MTEiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODQxNTcwMzQsImV4cCI6MTY4Njc0OTAzNH0.pzs06DkCFSHx6IZ9bszkYhOae3oC1B6ZMMvGA8ZpUSU',
  // socketUrl: 'ws://192.168.100.11:5000'
  socketUrl: 'wss://my-canteen.herokuapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
