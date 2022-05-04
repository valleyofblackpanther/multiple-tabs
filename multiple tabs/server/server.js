
exports = {

  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onTicketCreateHandler: function (args) {
    // console.log('Hello ' + args['data']['requester']['name']);
    // console.log("ON Ticket Creation Args",args)
    const ticketId=args.data.ticket.id
    console.log('onTicketCreateHandler >> ',ticketId)
    const subdomain=args.iparams.subdomain
    const ccEmails=args.data.ticket.cc_emails || []
    const toEmails=args.data.ticket.to_emails || []
    const bccEmails=args.data.ticket.bcc_emails || []
    console.log('checking Bcc is getting >>', bccEmails);
    const ticketFieldValues=args.iparams.ticketFieldValues
    const groupId=args.iparams.group_id
    const esculationEmails=args.iparams.esculation_emails
    const bothMails=[...ccEmails, ...toEmails,...bccEmails]
    console.log('allMails >>',bothMails)
    assigningToGroup(esculationEmails,bothMails,subdomain,ticketId,ticketFieldValues,groupId)
  },

  onConversationCreateCallback: function (payload) {
    const ticketId=payload.data.conversation.ticket_id
    console.log("onConversationCreate >>", ticketId)
    const subdomain=payload.iparams.subdomain
    // const apiKey=payload.iparams.api_key
    const ticketFieldValues=payload.iparams.ticketFieldValues
    const groupId=payload.iparams.group_id
    const esculationEmails=payload.iparams.esculation_emails
    const ccEmails = payload.data.conversation.cc_emails
    const bccEmails = payload.data.conversation.bcc_emails
    const toEmails = payload.data.conversation.to_emails
    const bothMails = [...toEmails, ...ccEmails, ...bccEmails]
    console.log("allMails >>", bothMails);
    // const matchedMail = esculationEmail.filter(mail=>bothMails.includes(mail))
    assigningToGroup(esculationEmails,bothMails,subdomain,ticketId,ticketFieldValues,groupId)
  }

};


//assigning Group callback
const assigningToGroup=(esculationEmails,bothMails,subdomain,ticketId,ticketFieldValues,groupId)=>{
  // const matchedMail=esculationEmails.find(mail=>mail.indexOf(bothMails) !== -1)
  const matchedMail=esculationEmails.filter(mail=>bothMails.includes(mail)===true)
  console.log('matchedMails && esculationMails>>',matchedMail,esculationEmails)
  if(matchedMail.length>0){
    console.log('API Call');
    makingApiCall(subdomain,ticketId,ticketFieldValues,groupId)
  }else{
    console.log('No Emails Matching for #',ticketId)
  }
}



const makingApiCall = (subdomain,ticketId,ticketFieldValues,groupId) => {
  console.log('ticketFieldValues >>',ticketFieldValues)
  //
  const url = `https://${subdomain}.freshdesk.com//api/v2/tickets/${ticketId}`;
  const body={
    ...ticketFieldValues,group_id:Number(groupId)
  }

const options = {
		headers: {
			Authorization: "<%= encode(iparam.api_key) %>",
			"Content-Type": "application/json"
		},body:JSON.stringify(body)
	}

  console.log("URL >> "+url + "  Options >>", options)

  $request.put(url, options)
    .then(
      function (data) {
        //handle "data"
        //"data" is a json string with status, headers, and response.
        console.log("makingApiCall ~ Success",data)
      },
      function (error) {
        //handle failure
        console.error("makingApiCall ~ Error",error)
      }
    );


}


// callback function
// const comparingMails = (bothMails) => {
//   for (instEmail of email) {
//     for (customerEmail of bothMails) {
//       if (instEmail === customerEmail) {
//         matchedMails.push(instEmail)
//       }
//     }
//   }
// }



// let iparams = ["balu@s.com", "bene@s.com", "ven@s.com"]

// let conversationEmail = ["aegad", "adfgadfgfg", "agadfgadfdds", "balcu@s.com", "bene@s.com"]

// let found = iparams.filter(e => conversationEmail.includes(e))
// console.log(found)

// if (found) {
//   console.log("api call")
// } else {
//   console.log("do nothing!")
// }
