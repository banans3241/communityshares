import React, { useMemo } from 'react';

export default function OwnershipCalculator() {
  const houses = useMemo(() => ({
    "Foot.Inside": { "Кампус": 80, "Хайдер": 17, "Файн": 1, "Нфорс": 1, "Шейн": 1 },
    "Foot.Rebel": { "Вансис": 50, "Ежик": 50 },
    "Foot.Reckless": { "Евнг": 50, "Сатору": 50 },
    "Foot.Elegant": { "Бьюти": 100 },
    "Eternal.Team": { "Вареник": 100 },
    "The.Eventide": { "Бьюти": 50, "Кампус": 50 },
    "Foot.Grayficent": { "Киа": 35, "Винди": 35, "Лемонадик": 30 },
    "Mirage.Team": { "Велни": 50, "Хайдер": 30, "Родрикс": 20 },
    "Foot.Revenge": { "Лука": 40, "Джеймс": 24, "Хайдер": 10, "Фэйс": 25, "Айскл": 1 },
    "Magnificent.Team": { "Иско": 70, "Вареник": 15, "Зере": 15 },
    "Darkness.Team": { "Вареник": 60, "Джаст": 40 },
    "Foot.Max.Team": { "Мистик": 25, "Ванилин": 25, "Родри": 25, "Шейн": 25 },
    "Foot.Shadow": { "Садио": 100 },
    "Samuraway.Team": { "Уппер": 100 },
    "Foot.Breath": { "Авекс": 30, "Ван": 25, "Микси": 25, "Зевс": 15, "Монти": 5 },
    "Foot.Vipers": { "Сомик": 100 },
    "Foot.Water": { "Неподетски": 40, "Мальма": 15, "Вареник": 45 },
    "Foot.Union": { "Стифлер": 100 },
    "Foot.Demons.Team": { "Ларсон": 50, "Ренат": 50 },
    "Foot.Dragon": { "Сомик": 100 },
    "Foot.Best": { "Фрейзз": 100 },
    "Foot.Desire": { "Файн": 100 },
    "Foot.Space": { "Коволер": 65, "Лемонадик": 15, "Лапорта": 20 },
    "Foot.Power": { "Сомик": 60, "Сабокс": 40 },
    "Foot.Avengers": { "Коволер": 100 },
    "Foot.Endless": { "Колос": 40, "Сабокс": 25, "Сомик": 20, "Орест": 5, "Твикс": 10 },
    "Foot.Crayst": { "Кроник": 100 },
    "Foot.Surrendhell": { "Фрейзз": 100 },
    "Galacticos.Team": { "Рев": 25, "Хусенчик": 25, "Дс": 50 },
    "Foot.Bristol": { "Каинс": 100 },
    "Flyers.Team": { "Янгер": 50, "Дерб": 50 },
    "Foot.Bavy": { "Янгер": 100 },
    "Foot.Mix.Team": { "Волвер": 100 },
    "Synemo": { "Настя": 100 },
    "Foot.Graceful": { "Зерокс": 50, "Ренат": 50 }
  }), []);

  const ownershipData = useMemo(() => {
    const totalOwnership = {};
    const conversionRate = 1 / 35;

    Object.entries(houses).forEach(([houseName, owners]) => {
      Object.entries(owners).forEach(([owner, housePercent]) => {
        const communityPercent = housePercent * conversionRate;
        if (!totalOwnership[owner]) {
          totalOwnership[owner] = { total: 0, houses: [] };
        }
        totalOwnership[owner].total += communityPercent;
        totalOwnership[owner].houses.push({
          name: houseName,
          housePercent,
          communityPercent
        });
      });
    });

    return Object.entries(totalOwnership)
      .map(([name, data]) => ({
        name,
        totalPercent: data.total,
        houses: data.houses
      }))
      .sort((a, b) => b.totalPercent - a.totalPercent);
  }, [houses]);

  const top30 = ownershipData.slice(0, 30);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Топ-30 владельцев комьюнити
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Общее количество хаусов: 35 • Конверсия: 1% хауса = {(1/35 * 100).toFixed(8)}% комьюнити
        </p>

        <div className="grid gap-4">
          {top30.map((person, index) => (
            <div
              key={person.name}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{person.name}</h3>
                    <p className="text-slate-400 text-sm">
                      {person.houses.length} {person.houses.length === 1 ? 'хаус' : person.houses.length < 5 ? 'хауса' : 'хаусов'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {person.totalPercent.toFixed(6)}%
                  </div>
                  <div className="text-slate-500 text-sm">комьюнити</div>
                </div>
              </div>

              <div className="space-y-2">
                {person.houses.map((house, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm bg-slate-900/50 rounded px-3 py-2"
                  >
                    <span className="text-slate-300 font-medium">{house.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400">{house.housePercent}% хауса</span>
                      <span className="text-slate-600">→</span>
                      <span className="text-purple-400 font-mono">
                        {house.communityPercent.toFixed(6)}% комьюнити
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Статистика</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {ownershipData.length}
              </div>
              <div className="text-slate-400 text-sm">Всего владельцев</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">35</div>
              <div className="text-slate-400 text-sm">Всего хаусов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {top30[0].totalPercent.toFixed(2)}%
              </div>
              <div className="text-slate-400 text-sm">Максимум</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {top30.reduce((sum, p) => sum + p.totalPercent, 0).toFixed(2)}%
              </div>
              <div className="text-slate-400 text-sm">Топ-30 владеют</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
