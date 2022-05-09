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
  
  var getContact = await client.data.get('tickets');
  const iparams = await client.iparams.get();
  console.log("ticket data >>>", getContact)
  console.log("iparam data >>>", iparams)



  // Check COndition - compare ticket details & Iparams

  // Yes -> Hide/Disable

  // No -> No Process



}
