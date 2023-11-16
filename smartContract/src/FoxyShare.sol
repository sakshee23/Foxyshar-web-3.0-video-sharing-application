// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FoxyShare {
    address public owner;

    struct Profile {
        string account;
        string name;
        string profileImg;
        string about;
    }

    struct Post {
        string name;
        string account;
        string title;
        string profileImg;
        string thumbnail;
        string videoUrl;
        string description;
    }

    mapping(address => Profile) public profiles;
    Post[] public allPosts;

    function setProfile(string memory _account, string memory _name, string memory _profileImg, string memory _about) public {
        Profile storage profile = profiles[msg.sender];
        profile.account = _account;
        profile.name = _name;
        profile.profileImg = _profileImg;
        profile.about = _about;
    }

    function getProfile() public view returns (string memory, string memory, string memory, string memory) {
        Profile storage profile = profiles[msg.sender];
        return (profile.account, profile.name, profile.profileImg, profile.about);
    }

    function addPost(
        string memory _name,
        string memory _title,
        string memory _profileImg,
        string memory _thumbnail,
        string memory _videoUrl,
        string memory _description
    ) public {
        Post memory newPost = Post(_name, profiles[msg.sender].account, _title, _profileImg, _thumbnail, _videoUrl, _description);
        allPosts.push(newPost);
    }

    function getPosts() public view returns (Post[] memory) {
        return allPosts;
    }
}
