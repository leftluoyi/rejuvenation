const Register = artifacts.require("Register")
const Record = artifacts.require("Record")

contract('Register', (accounts) =>  {
    let patient;
    let provider;
    let record;

	beforeEach('create new Register and Record contract', async () => {
        provider = await Register.new("Dr Strange", 0, {from: accounts[0]});
        patient = await Register.new("Lucy", 1, {from: accounts[1]});
    })

    it("test register initializer", async () => {
        provider.entity().then(entity => {
            assert.equal(entity, accounts[0], "Entity is wrong!");
        })
    })
    
    it("check record initializer", async () => {
        record = await Record.new(provider.address, patient.address, "InterSystems");
		record.owner().then(patient => {
			assert.equal(patient, accounts[1], "Owner of the record is wrong!");
		})
    })
    
})
