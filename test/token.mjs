import { expect } from "chai";
//const {isCallTrace} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");


// mocha framwork for testing 


// describe("Token Contract" , function(){
//     // test
//     it(" Deployment should assign the total supply of tokens to the owners" , async function(){

//         const [owner] = await ethers.getSigners(); // to access the account

//         // console.log("Signers object" , owner);

//         // instance of contract
//         const Token  = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy(); // deploy contract

//         const ownerBalance = await hardhatToken.balanceOf(owner.address);

//         // console.log("Owner Address ", owner.address);

//         // Compare the BigNumber values
//         expect((await hardhatToken.totalSupply()).toString()).to.equal(ownerBalance.toString());
//     })


//   it(" Should transfer tokens between contract" , async function(){

//     const [owner , addr1, addr2] = await ethers.getSigners(); // to access the account


//     // instance of contract
//     const Token  = await ethers.getContractFactory("Token");

//     const hardhatToken = await Token.deploy(); // deploy contract

//     // const ownerBalance = await hardhatToken.balanceOf(owner.address);

//     // transfer 10 tokens from owners to addr1
//     await hardhatToken.transfer(addr1.address , 10);
//     expect((await hardhatToken.balanceOf(addr1.address)).toString()).to.equal("10".toString());


//    // transfer 5 tokens from addr1 to addr2
//    await hardhatToken.connect(addr1).transfer(addr2.address , 5);
//    expect((await hardhatToken.balanceOf(addr2.address)).toString()).to.equal("5".toString());
// })
// })
















//****************    Now use Hooks in the Mocha Library ***************************
// Use chai-as-promised


describe("Token Contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;


    // it will run before the every test ;
    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    })

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        it("Should assignthe total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect((await hardhatToken.totalSupply()).toString()).to.equal(ownerBalance.toString());
        })
    })

    describe("Transactions" , function(){
        it("Should transfer tokens between the accounts" , async function(){
            // owners account to addr1.address
            await hardhatToken.transfer(addr1.address , 5);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect((addr1Balance).toString()).to.equal("5".toString());


            await hardhatToken.connect(addr1).transfer(addr2.address , 5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect((addr2Balance).toString()).to.equal("5".toString());
        })

        it("Should fail if sender does not have enough tokens" , async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address); //  initially - 0 tokens addr1
            await expect(hardhatToken.connect(addr1).transfer(owner.address , 1)).to.be.revertedWith("Not enough tokens");

            expect(await hardhatToken.balanceOf(owner.address).toString()).to.equal(initialOwnerBalance.toString());
        })

        
    })

})

