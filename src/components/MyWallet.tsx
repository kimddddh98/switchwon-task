import type { Wallets } from '@/api/exchange'
import useWalletsQuery from '@/hooks/queries/useWalletsQuery'
import { formatNumber, getCurrencySymbol } from '@/utiles'

type WalletListItemProps = {
  wallet: Wallets
}
const WalletListItem = ({ wallet }: WalletListItemProps) => {
  const sylbol = getCurrencySymbol(wallet.currency)
  return (
    <li className="text-switchwon-gray-600 flex justify-between text-xl">
      <span className="text-sm font-medium md:text-base">
        {wallet.currency}
      </span>
      <b className="text-sm font-semibold md:text-base">
        {sylbol?.value} {formatNumber(wallet.balance)}
      </b>
    </li>
  )
}

const KRW_CURRENCY = 'KRW'
const MyWallet = () => {
  const { data } = useWalletsQuery()
  const wallets = data?.wallets
  const totalSylbol = getCurrencySymbol(KRW_CURRENCY)
  return (
    <div className="bg-switchwon-gray-0 border-switchwon-gray-300 flex flex-1 flex-col gap-4 rounded-2xl border px-6 py-4 md:gap-6 md:px-8 md:py-6 xl:gap-8">
      <h3 className="text-switchwon-gray-800 text-lg font-extrabold md:text-xl xl:text-2xl">
        내 지갑
      </h3>
      <div className="flex flex-1 flex-col gap-12 md:gap-0">
        <ul className="flex-1">
          {wallets?.map((wallet) => (
            <WalletListItem wallet={wallet} key={wallet.walletId} />
          ))}
        </ul>
        <div className="border-t-switchwon-gray-400 flex justify-between border-t pt-3 md:text-lg xl:text-xl">
          <span className="text-switchwon-gray-600 font-medium">
            총 보유 자산
          </span>
          <b className="text-switchwon-blue-500 font-bold">
            {data?.totalKrwBalance &&
              totalSylbol?.value + ' ' + formatNumber(data?.totalKrwBalance)}
          </b>
        </div>
      </div>
    </div>
  )
}
export default MyWallet
