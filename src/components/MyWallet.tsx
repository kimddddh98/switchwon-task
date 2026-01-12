const MyWallet = () => {
  return (
    <div className="bg-switchwon-gray-0 border-switchwon-gray-300 flex flex-col gap-8 rounded-2xl border px-8 py-6">
      <h3 className="text-switchwon-gray-800 text-2xl font-extrabold">
        내 지갑
      </h3>
      <div className="flex flex-col">
        <ul>
          <li className="text-switchwon-gray-600 flex justify-between text-xl">
            <span className="font-medium">KRW</span>
            <b className="font-semibold">3,000,000</b>
          </li>
        </ul>
        <div className="border-t-switchwon-gray-400 flex justify-between border-t pt-3 text-xl">
          <span className="text-switchwon-gray-600 font-medium">
            총 보유 자산
          </span>
          <b className="text-switchwon-blue-500 font-bold">3,000,000</b>
        </div>
      </div>
    </div>
  )
}
export default MyWallet
