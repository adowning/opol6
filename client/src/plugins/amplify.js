// import Amplify, { Auth, Logger} from 'aws-amplify'
import Amplify from 'aws-amplify'
import AWSExports from '../aws-exports'
// import { Auth, PubSub } from 'aws-amplify'
// import { AWSIoTProvider } from 'aws-amplify/lib/PubSub/Providers';
Amplify.configure(AWSExports)
// Amplify.Logger.LOG_LEVEL = "WARN";
// const logger = new Logger('main')

// Auth.currentUserInfo()
//   .then(user => {
//       console.log(user)
//       Amplify.addPluggable(new AWSIoTProvider({
//         aws_pubsub_region: 'us-west-2',
//         aws_pubsub_endpoint: 'wss://a2irl5b2s0go37.iot.us-west-2.amazonaws.com/mqtt',
//       }));
//     //   PubSub.subscribe('owntracks').subscribe({
//     //     next: data => console.log('Message received', data),
//     //     error: error => console.error(error),
//     //     close: () => console.log('Done'),
//     // });
//     })
//   .catch(err => console.log(err))


