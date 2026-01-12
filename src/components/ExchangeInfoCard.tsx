const ExchangeInfoCard = () => {
  return (
    <div className="border-switchwon-gray-300 flex flex-1 justify-between rounded-xl border px-8 py-6">
      <div className="flex flex-col gap-1">
        <h4 className="text-switchwon-gray-600 text-lg font-semibold">USD</h4>
        <div className="flex flex-col gap-1">
          <strong className="text-xl font-bold">1,320.50 KRW</strong>
          <span className="text-switchwon-red">+0.5%</span>
        </div>
      </div>
      <div className="text-switchwon-gray-600">미국 달러</div>
    </div>
  )
}
export default ExchangeInfoCard
