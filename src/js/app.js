$(document).ready(() => {
  if(typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  web3 = new Web3(web3Provider)


  const accounts = web3.eth.accounts
  for(let i in accounts) {
    if(i < 2) $('#doctor').append('<option value="' + accounts[i] + '">' + accounts[i] + '</option>')
    else $('#patient').append('<option value="' + accounts[i] + '">' + accounts[i] + '</option>')
  }

  $('#doctor_address').html('<span>Address: <b>' + accounts[0] + '</b></span>')
  $('#patient_address').html('<span>Address: <b>' + accounts[2] + '</b></span>')
  

  $.getJSON('Authorization.json', async (data) => {
    const AuthorizationArtifact = data;
    const Authorization = TruffleContract(AuthorizationArtifact);
    Authorization.setProvider(web3Provider)

    const authorization = await Authorization.new({from: accounts[0], gas: 1000000});
    // const authorization = await Authorization.at('0xbB906Be58d877AeC601a705765fF72c61c6560C5');

    $('#contract_address').html("Contract address: " + authorization.address)
    
    $('#retrieve_doctor').click(() => {
      $('#message_doctor').html("")
      authorization.queryAuthority($('#patient').val()).then(authorized => {
        if(authorized) {
          $('#profile_doctor').html(getProfile())
        } else {
          $('#profile_doctor').html("")
          $('#message_doctor').html("Unauthorized!!")
        }
      })
    })

    $('#retrieve_patient').click(() => {
      $('#profile_patient').html(getProfile())
    })

    $('#authorize').click(() => {
      if($('#doctor').val() == accounts[0]) {
        authorization.authorize({from: accounts[2]}).then(result => {
          $('#message_patient').html("Authorized successfully!!")
        })
      }
        
    })

    $('#unauthorize').click(() => {
      if($('#doctor').val() == accounts[0]) {
        authorization.unauthorize({from: accounts[2]}).then(result => {
          $('#message_patient').html("Unauthorized successfully!!")
        })
      }
    })
    
  })

})



const getProfile = () => {
  return('<table class="table table-sm table-striped"> <thead> <tr style="color: black; background-color: gray"> <td colspan="5">一般检查</td> </tr> <tr> <th scope="col">#</th> <th scope="col">项目</th> <th scope="col">结果</th> <th scope="col">单位</th> <th scope="col">参考值</th> </tr> </thead> <tbody> <tr> <th scope="row">1</th> <td>身高</td> <td>163</td> <td>cm</td> <td></td> </tr> <tr> <th scope="row">2</th> <td>体重</td> <td>66.7</td> <td>kg</td> <td></td> </tr> <tr> <th scope="row">3</th> <td>收缩压</td> <td>128</td> <td>mmHg</td> <td>< 140</td> </tr> <tr> <th scope="row">4</th> <td>舒张压</td> <td>85</td> <td>mmHg</td> <td>< 90</td> </tr> <tr> <th scope="row">5</th> <td>腰围</td> <td>76</td> <td>cm</td> <td>60 - 90</td> </tr> </tbody> <thead> <tr style="color: black; background-color: gray"> <td colspan="5">口腔检查</td> </tr> <tr> <th scope="col">#</th> <th colspan="2" scope="col">项目</th> <th colspan="2" scope="col">结果</th> </tr> <tbody> <tr> <th scope="row">1</th> <td colspan="2">口腔黏膜</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">2</th> <td colspan="2">唇</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">3</th> <td colspan="2">牙齿</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">4</th> <td colspan="2">舌</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">5</th> <td colspan="2">腮腺</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">6</th> <td colspan="2">牙周</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">7</th> <td colspan="2">颚</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">8</th> <td colspan="2">颌下腺</td> <td colspan="2">正常</td> </tr> <tr> <th scope="row">9</th> <td colspan="2">颞下颌关节</td> <td colspan="2">正常</td> </tr> </tbody> </thead> </table>')
}

