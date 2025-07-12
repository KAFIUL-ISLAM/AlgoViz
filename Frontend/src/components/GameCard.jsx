const GameCard = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col justify-between">
    <h3 className="text-xl font-semibold text-[#2B7A70] mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    <div className="flex-1">{children}</div>
  </div>
)

export default GameCard;