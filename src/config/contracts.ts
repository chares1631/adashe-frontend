export const CONTRACTS = {
  USDC: '0x3600000000000000000000000000000000000000',
  ADASHE: '0x1109529b99060520179eBCD94dd869bB3DAaFa5A',
  CCTP_TOKEN_MESSENGER: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
  ARC_DOMAIN: 26,
} as const

export const ADASHE_ABI = [
  { name: 'createGroup', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'amount', type: 'uint256' }, { name: 'cycleDuration', type: 'uint256' }, { name: 'maxMembers', type: 'uint256' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'joinGroup', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'groupId', type: 'uint256' }], outputs: [] },
  { name: 'contribute', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'groupId', type: 'uint256' }], outputs: [] },
  { name: 'getGroup', type: 'function', stateMutability: 'view', inputs: [{ name: 'groupId', type: 'uint256' }], outputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }, { name: '', type: 'uint256' }, { name: '', type: 'uint256' }, { name: '', type: 'uint256' }, { name: '', type: 'uint256' }, { name: '', type: 'bool' }] },
  { name: 'getMembers', type: 'function', stateMutability: 'view', inputs: [{ name: 'groupId', type: 'uint256' }], outputs: [{ name: '', type: 'address[]' }] },
  { name: 'hasContributed', type: 'function', stateMutability: 'view', inputs: [{ name: 'groupId', type: 'uint256' }, { name: 'member', type: 'address' }], outputs: [{ name: '', type: 'bool' }] },
  { name: 'groupCount', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
] as const

export const ERC20_ABI = [
  'function approve(address,uint256) returns (bool)',
  'function allowance(address,address) view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
] as const
