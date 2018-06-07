// import { get } from "http";
// import { getDiffieHellman } from "crypto";

// function getId() {
//     return new Promise(resolve => {
//         var data = new FormData();
//         data.append('Action', 'SessionCreate');
//         data.append('Username', 'ash@andrewsgroup.onsip.com');
//         data.append('Password', 'Sugarlips42!');
//         data.append('Output', 'json')

//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', 'https://api.onsip.com/api', true);
//         xhr.onload = function () {
//             var j = JSON.parse(this.response)
//             console.log(j.Response.Context.Session.SessionId)
//             resolve(j.Response.Context.Session.SessionId)

//         }
//         xhr.send(data)
//     })
// }

// async function subscribeOnsip() {
//     // console.log(id)
//     var id = await getId()

//     var data = new FormData();
//     data.append('Action', 'WebhookSubscriptionAdd');
//     // data.append('SessionId', 'iusj9dslgivu5vqsm28qq330k6');
//     data.append('SessionId', id);
//     data.append('OrganizationId', '74954');
//     data.append('Name', 'Example Subscription2');
//     data.append('TargetUrl', 'https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/express');
//     data.append('SslVerify', 'true');
//     data.append('Output', 'json')

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'https://api.onsip.com/api', true);
//     xhr.onload = function () {
//         console.log(JSON.parse(this.response))
//     }
//     xhr.send(data);
// }

// subscribeOnsip()