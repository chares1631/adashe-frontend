export const CONTRACTS = {
  USDC: '0x3600000000000000000000000000000000000000',
  ADASHE: '0x1109529b99060520179eBCD94dd869bB3DAaFa5A',
  CCTP_TOKEN_MESSENGER: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
  ARC_DOMAIN: 26,
} as const

export const ADASHE_ABI = [
  'function createGroup(uint256,uint256,uint256) returns (uint256)',
  'function joinGroup(uint256)',
  'function contribute(uint256)',
  'function getGroup(uint256) view returns (address,uint256,uint256,uint256,uint256,uint256,bool)',
  'function getMembers(uint256) view returns (address[])',
  'function hasContributed(uint256,address) view returns (bool)',
  'function groupCount() view returns (uint256)',
] as const

export const ERC20_ABI = [
  'function approve(address,uint256) returns (bool)',
  'function allowance(address,address) view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
] as const
