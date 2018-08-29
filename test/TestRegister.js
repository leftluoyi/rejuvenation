const Authorization = artifacts.require("Register")

contract('Register', (accounts) =>  {
	let register;

	beforeEach('create new Register contract', async () => {
		register = await Register.new({name: "myname", category: "Doctor", from: accounts[0]});
	})

	it("check initial number of register patients", async () => {
		register.numAuthorized().then((num) => {
			assert.equal(num.toNumber(), 0, "Number of authorized patients should be 0");
		})
	})

	
	it("test register authorize", async () => {
		register.authorize({from: accounts[1]}).then(async (result) => {
			register.queryAuthority(accounts[1]).then(authorized => {
				assert.equal(authorized, true, "should be authorized")
			})
		})
	})


	it("test unauthorize", async () => {
		register.unauthorize({from: accounts[1]}).then(async (result) => {
			register.queryAuthority(accounts[1]).then(authorized => {
				assert.equal(authorized, false, "should be unauthorized")
			})			
		})
	})
})
