$(document).ready(() => {
  if(typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  web3 = new Web3(web3Provider)


  const accounts = web3.eth.accounts
  

  $.getJSON('Conference.json', async (data) => {
    
  })
  
})