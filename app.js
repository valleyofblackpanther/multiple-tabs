document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on("app.activated", onAppActivate);
    }
  }
};

async function onAppActivate() {
  
  try{
  var getContact = await client.data.get('tickets');
  const iparams = await client.iparams.get();
  console.log("ticket data >>>", getContact)
  console.log("iparam data >>>", iparams)
  
    const ticketID = await getContact.tickets.id;
  const ticketField = await iparams.ticketFieldValues;
  const groupId = await iparams.group_id;
  const agentId = await iparams.agent_id;
  } catch(e) {
    handleErr(e)
  }
  
  function handleErr(err) {
    console.error(`Error occured detils:`, err);
  }




  // Check COndition - compare ticket details & Iparams

  // Yes -> Hide/Disable

  // No -> No Process



}
