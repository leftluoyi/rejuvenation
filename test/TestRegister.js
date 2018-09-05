const Register = artifacts.require("Register")
const Series = artifacts.require("Series")
const Record = artifacts.require("Record")

contract('Register', (accounts) =>  {
    let patient;
    let provider;
    let record;
    let series;

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
        series = await Series.new(patient.address, "InterSystems");
		series.owner().then(patient => {
			assert.equal(patient, accounts[1], "Owner of the record is wrong!");
		})
    })
    
})
