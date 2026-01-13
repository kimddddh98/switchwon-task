import Header from '@/components/Header'

const ExchangeList = () => {
  return (
    <div>
      <Header />
      <main className="mx-auto mt-10 flex w-7xl flex-col gap-6">
        <div>
          <h2 className="text-switchwon-gray-800 text-[40px] font-bold">
            환전 내역
          </h2>
          <p className="text-xl">환전 내역을 확인하실 수 있어요.</p>
        </div>
        <div className="border-switchwon-gray-300 rounded-2xl border py-4">
          <table className="w-full border-collapse">
            <colgroup>
              <col />
              {/* <col className="w-[180px]" /> */}
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
              {Array.from({ length: 10 }, (_, i) => i + 1).map((data) => (
                <tr
                  className="first:[&>td]:pt-5.5 [&>td:first-child]:pl-10 [&>td:last-child]:pr-10"
                  key={data}
                >
                  <td className="text-switchwon-gray-700 px-4 py-3.5">
                    {data}
                  </td>
                  <td className="text-switchwon-gray-700 px-4 py-3.5">
                    2024-01-01 00:00:00
                  </td>
                  <td className="text-switchwon-gray-700 px-4 py-3.5">활성</td>
                  <td className="text-switchwon-gray-700 px-4 py-3.5">활성</td>
                  <td className="text-switchwon-gray-700 px-4 py-3.5">활성</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default ExchangeList
