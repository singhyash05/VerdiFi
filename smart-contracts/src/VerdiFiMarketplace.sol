// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VerdiToken.sol";
import "./VerdiFiRegistry.sol";

contract VerdiFiMarketplace {
    // Instance of the VerdiFi ERC20 Token contract.
    VerdiFiToken public token;
    // Instance of the VerdiFi Registry contract.
    VerdiFiRegistry public registry;
    // Owner of the marketplace (typically the deployer).
    address public owner;
    // Counter for listing IDs.
    uint256 public listingCount;

    // Structure to represent a marketplace listing.
    struct Listing {
        uint256 id;
        address seller;         // Seller's address.
        string category;        // Category of the offering (e.g., "Waste Management Credits").
        string description;     // Description of the item/service.
        uint256 price;          // Price in VerdiFi tokens.
        bool active;            // Listing status.
    }

    // Mapping from listing ID to Listing details.
    mapping(uint256 => Listing) public listings;

    // Events for logging marketplace actions.
    event ListingCreated(uint256 indexed id, address seller, string category, string description, uint256 price);
    event ListingUpdated(uint256 indexed id, string newDescription, uint256 newPrice);
    event ListingRemoved(uint256 indexed id);
    event ItemPurchased(uint256 indexed id, address buyer, uint256 price);

    // Modifier: Only the seller who created the listing can modify it.
    modifier onlySeller(uint256 listingId) {
        require(listings[listingId].seller == msg.sender, "Not authorized: Only seller can modify listing");
        _;
    }

    // Modifier: Only the marketplace owner (deployer) can perform certain actions.
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: Only marketplace owner");
        _;
    }

    // Modifier: Only registered and verified organizations can perform certain actions.
    modifier onlyRegistered(address org) {
        // Retrieve the entity details from the registry.
        (, , , , , bool verified) = registry.getEntityDetails(org);
        require(verified, "Not registered or verified on VerdiFi");
        _;
    }

    /**
     * @notice Constructor sets the token and registry contract addresses, and assigns the deployer as owner.
     * @param tokenAddress Address of the deployed VerdiFiToken contract.
     * @param registryAddress Address of the deployed VerdiFiRegistry contract.
     */
    constructor(address tokenAddress, address registryAddress) {
        token = VerdiFiToken(tokenAddress);
        registry = VerdiFiRegistry(registryAddress);
        owner = msg.sender;
    }

    /**
     * @notice Creates a new marketplace listing.
     * @param category The category of the offering (e.g., "Waste Management Credits").
     * @param description Description of the item/service.
     * @param price Price in VerdiFi tokens.
     * @dev Only verified organizations can create listings.
     */
    function createListing(string memory category, string memory description, uint256 price) external onlyRegistered(msg.sender) {
        listingCount++;
        listings[listingCount] = Listing(listingCount, msg.sender, category, description, price, true);
        emit ListingCreated(listingCount, msg.sender, category, description, price);
    }

    /**
     * @notice Updates an existing listing.
     * @param listingId The ID of the listing to update.
     * @param newDescription The new description for the listing.
     * @param newPrice The new price in VerdiFi tokens.
     * @dev Only the seller who created the listing can update it.
     */
    function updateListing(uint256 listingId, string memory newDescription, uint256 newPrice) external onlySeller(listingId) {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        listing.description = newDescription;
        listing.price = newPrice;
        emit ListingUpdated(listingId, newDescription, newPrice);
    }

    /**
     * @notice Removes an active listing.
     * @param listingId The ID of the listing to remove.
     * @dev Only the seller who created the listing can remove it.
     */
    function removeListing(uint256 listingId) external onlySeller(listingId) {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is already inactive");
        listing.active = false;
        emit ListingRemoved(listingId);
    }

    /**
     * @notice Purchases a listing.
     * @param listingId The ID of the listing to purchase.
     * @dev Only verified organizations can purchase listings.
     *      Buyer must approve the marketplace contract to spend tokens on their behalf.
     */
    function purchaseItem(uint256 listingId) external onlyRegistered(msg.sender) {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is inactive");
        // Transfer tokens from the buyer (msg.sender) to the seller.
        require(token.transferFrom(msg.sender, listing.seller, listing.price), "Token transfer failed");
        // Mark the listing as inactive after purchase.
        listing.active = false;
        emit ItemPurchased(listingId, msg.sender, listing.price);
    }
}
