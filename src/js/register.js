$(document).ready(() => {
    if(typeof web3 !== 'undefined') {
      web3Provider = web3.currentProvider
    } else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(web3Provider)
  
    const accounts = web3.eth.accounts
    $('#doctor_address').html('<b>' + accounts[0] + '</b>')
    $('#patient_address').html('<b>' + accounts[1] + '</b>')
    
  
    $.getJSON('contracts/Register.json', async (data) => {
      const RegisterArtifact = data;
      const Register = TruffleContract(RegisterArtifact);
      Register.setProvider(web3Provider)
      
      $('#register_patient').click(async () => {
        const patient = await Register.new($('#entityname_patient').val(), 0, {from: accounts[0], gas: 1000000});
        console.log(patient)
      })
        
      $('#register_doctor').click(async () => {
        const doctor = await Register.new($('#entityname_doctor').val(), 0, {from: accounts[1], gas: 1000000});
        console.log(doctor)
      })
        
  })

})