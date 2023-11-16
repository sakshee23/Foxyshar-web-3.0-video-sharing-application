// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {FoxyShare} from "../src/FoxyShare.sol";
import {Script} from "forge-std/Script.sol";

contract DeploySocialMedia is Script {
    
    function run() external returns (FoxyShare) {
        vm.startBroadcast();
        FoxyShare social = new FoxyShare();
        vm.stopBroadcast();
        return social;
    }
}