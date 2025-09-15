export const categoryColorMap: { [key: string]: string } = {
    "국내 주식": "blue",
    "해외 주식": "green",
    "국내 채권": "indigo",
    "해외 채권": "purple",
    "자산배분(TDF/TRF)": "teal",
    "단기 금융": "gray",
    "배당주": "red",
    "커버드콜": "pink",
    "섹터": "lime",
    "테마": "yellow",
    "부동산/인프라": "orange",
    "원자재": "yellow",
    "기타 고배당": "red",
};

export const categoryStyleMap: { [key: string]: { active: string; inactive: string; } } = {
    "국내 주식": {
        active: 'bg-blue-600 text-white',
        inactive: 'text-blue-400 border-2 border-blue-500 hover:bg-blue-500 hover:text-white'
    },
    "해외 주식": {
        active: 'bg-green-600 text-white',
        inactive: 'text-green-400 border-2 border-green-500 hover:bg-green-500 hover:text-white'
    },
    "국내 채권": {
        active: 'bg-indigo-600 text-white',
        inactive: 'text-indigo-400 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white'
    },
    "해외 채권": {
        active: 'bg-purple-600 text-white',
        inactive: 'text-purple-400 border-2 border-purple-500 hover:bg-purple-500 hover:text-white'
    },
    "자산배분(TDF/TRF)": {
        active: 'bg-teal-600 text-white',
        inactive: 'text-teal-400 border-2 border-teal-500 hover:bg-teal-500 hover:text-white'
    },
    "단기 금융": {
        active: 'bg-gray-600 text-white',
        inactive: 'text-gray-400 border-2 border-gray-500 hover:bg-gray-500 hover:text-white'
    },
    "배당주": {
        active: 'bg-red-600 text-white',
        inactive: 'text-red-400 border-2 border-red-500 hover:bg-red-500 hover:text-white'
    },
    "커버드콜": {
        active: 'bg-pink-600 text-white',
        inactive: 'text-pink-400 border-2 border-pink-500 hover:bg-pink-500 hover:text-white'
    },
    "섹터": {
        active: 'bg-lime-600 text-white',
        inactive: 'text-lime-400 border-2 border-lime-500 hover:bg-lime-500 hover:text-white'
    },
    "테마": {
        active: 'bg-yellow-600 text-white',
        inactive: 'text-yellow-400 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white'
    },
    "부동산/인프라": {
        active: 'bg-orange-600 text-white',
        inactive: 'text-orange-400 border-2 border-orange-500 hover:bg-orange-500 hover:text-white'
    },
    "원자재": {
        active: 'bg-yellow-600 text-white',
        inactive: 'text-yellow-400 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white'
    },
    "기타 고배당": {
        active: 'bg-red-600 text-white',
        inactive: 'text-red-400 border-2 border-red-500 hover:bg-red-500 hover:text-white'
    },
};