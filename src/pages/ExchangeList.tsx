import type { Orders } from '@/api/orders'
import useGetOrdersQuery from '@/hooks/queries/useGetOrdersQuery'
import { formatNumber, getCurrencySymbol } from '@/utiles'

type ExchangeListItemProps = {
  order: Orders
}
const ExchangeListItem = ({ order }: ExchangeListItemProps) => {
  const [date, time] = order.orderedAt.split('T')
  return (
    <tr
      className="first:[&>td]:pt-5.5 [&>td:first-child]:pl-10 [&>td:last-child]:pr-10"
      key={order.orderId}
    >
      <td className="text-switchwon-gray-700 px-4 py-3.5">{order.orderId}</td>
      <td className="text-switchwon-gray-700 px-4 py-3.5">{`${date} ${time}`}</td>
      <td className="text-switchwon-gray-700 px-4 py-3.5">
        {formatNumber(order.toAmount)}{' '}
        {getCurrencySymbol(order.toCurrency)?.value}
      </td>
      <td className="text-switchwon-gray-700 px-4 py-3.5">
        {order.appliedRate}
      </td>
      <td className="text-switchwon-gray-700 px-4 py-3.5">
        {formatNumber(order.fromAmount)}{' '}
        {getCurrencySymbol(order.fromCurrency)?.value}
      </td>
    </tr>
  )
}

const ExchangeList = () => {
  const { data } = useGetOrdersQuery()

  return (
    <div className="border-switchwon-gray-300 w-full rounded-2xl border py-4">
      <div className="overflow-auto">
        <table className="w-full border-collapse whitespace-nowrap">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="text-switchwon-gray-600">
            <tr className="[&>th:first-child]:pl-10 [&>th:last-child]:pr-10">
              <th className="border-border-default border-switchwon-gray-300 border-y px-4 py-3.5 text-left font-normal">
                거래 ID
              </th>
              <th className="border-border-default border-switchwon-gray-300 border-y px-4 py-3.5 text-left font-normal">
                거래 일시
              </th>
              <th className="border-border-default border-switchwon-gray-300 border-y px-4 py-3.5 text-left font-normal">
                매수 금액
              </th>
              <th className="border-border-default border-switchwon-gray-300 border-y px-4 py-3.5 text-left font-normal">
                체결 환율
              </th>
              <th className="border-border-default border-switchwon-gray-300 border-y px-4 py-3.5 text-left font-normal">
                매도 금액
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data?.map((order) => (
              <ExchangeListItem key={order.orderId} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExchangeList
