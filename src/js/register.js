function getArtifact(contract){
    return $.getJSON('contracts/' + contract + '.json').then(function(data){
      return data;
    });
  }

$(document).ready(async () => {
    if(typeof web3 !== 'undefined') {
      web3Provider = web3.currentProvider;
    } else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(web3Provider);
    const accounts = web3.eth.accounts;
    console.log(web3)
    const Register = TruffleContract(await getArtifact('Register'));
    Register.setProvider(web3Provider);
    const Series = TruffleContract(await getArtifact('Series'));
    Series.setProvider(web3Provider);

    var entity_patient;
    var entity_doctor;

    $('#register_patient').click(async () => {
        await Register.new($('#entityname_patient').val(), 0, {from: accounts[0], gas: 1000000}).then(data => {entity_patient = data});
        $('#patient_address').html('<b>' + entity_patient.address + '</b>');
        entity_patient.getName().then(data => {
            $('#patient_address2').html(data);
        })
    })
    
    $('#register_doctor').click(async () => {
        await Register.new($('#entityname_doctor').val(), 0, {from: accounts[1], gas: 1000000}).then(data => {entity_doctor = data});
        $('#doctor_address').html('<b>' + entity_doctor.address + '</b>');
    })

    $('#btn_addseries').click(async () => {
        await Series.new(entity_patient.address, $("#input_seriesname").val(), entity_doctor.address, "", {from: accounts[1], gas: 1000000});
    })
})