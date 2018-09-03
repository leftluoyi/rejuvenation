const Authorization = artifacts.require("Authorization")

contract('Authorization', (accounts) =>  {
	let authorization;

	beforeEach('create new Authorization', async () => {
		authorization = await Authorization.new({from: accounts[0]});
	})

	it("check initial number of authorized patients", async () => {
		authorization.numAuthorized().then((num) => {
			assert.equal(num.toNumber(), 0, "Number of authorized patients should be 0");
		})
	})
	
	it("test authorization", async () => {
		authorization.authorize({from: accounts[1]}).then(async (result) => {
			authorization.queryAuthority(accounts[1]).then(authorized => {
				assert.equal(authorized, true, "should be authorized")
			})
		})
	})

	it("test unauthorization", async () => {
		authorization.unauthorize({from: accounts[1]}).then(async (result) => {
			authorization.queryAuthority(accounts[1]).then(authorized => {
				assert.equal(authorized, false, "should be unauthorized")
			})			
		})
	})
})
