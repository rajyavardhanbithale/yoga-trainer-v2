import Image from "next/image";


import { LuVegan } from "react-icons/lu";
import { TbMeat } from "react-icons/tb";

import Link from "next/link";
import { MealData, mealData } from "../api/meals/mealData";
import MealDialog from "../components/Meal/MealDialog";
import MealInput from "../components/Meal/MealInput";



export default async function Meals({
    searchParams
}: {
    searchParams?: { search?: string; tag?: string } | undefined
}) {


    const tag = searchParams?.tag
    const search = searchParams?.search?.toLowerCase()

    const filter = tag ? mealData.filter(item => item.tags.includes(tag)) :
        search ? mealData.filter(item => item.name.toLowerCase().includes(search)
            || item.tags.includes(search)) : mealData


    return (
        <>
            <div className="h-screen bg-white w-full">
                <h1 className="text-4xl mt-20 font-bold mb-8 text-center text-gray-800">Meal Planner</h1>
                <MealInput />
                <div className="flex flex-wrap gap-8 justify-center">
                    {filter.map((meal: MealData, idx) => (
                        <div key={idx} className="flex flex-col sm:w-1/3 xl:w-1/5 m-5 rounded-2xl shadow-xl gap-5">
                            <div className="w-full h-64 overflow-hidden rounded-2xl mx-auto">
                                <Image
                                    src={`/meals/${meal.image}`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-full object-center object-cover hover:scale-105 duration-700"
                                    alt={meal.name}
                                />
                            </div>

                            <div className="flex flex-col m-5 p-1 gap-1">
                                <span className="text-2xl font-bold text-slate-900 tracking-wide block  leading-tight">
                                    {meal.name}
                                    {meal.name.split(' ').length <= 3 && <br />}
                                </span>

                                <span className="text-lg font-semibold text-slate-600">
                                    {meal.meal_type}
                                    {meal.vegetarian ? (
                                        <LuVegan className="text-xl inline-flex mx-2 text-green-500 mb-1" />

                                    ) : (
                                        <TbMeat className="text-xl inline-flex mx-2 text-red-500 mb-1" />

                                    )}
                                </span>

                                <div className="flex flex-wrap gap-2 my-2">
                                    {meal.tags.map((tag, idx1) => (
                                        <Link
                                            href={`/meals?tag=${encodeURIComponent(tag)}`}

                                            className="text-base bg-blue-700 text-slate-50 rounded-2xl px-3 py-1 capitalize cursor-pointer hover:bg-blue-950 duration-500"
                                            key={idx1}
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                                <MealDialog meal={meal} />
                            </div>
                        </div>
                    ))}
                </div>

                {filter.length === 0 &&
                    <div className="flex flex-wrap gap-8 mt-20 justify-center">
                        <span className="text-3xl">No Result Found</span>
                    </div>
                }
            </div>
        </>
    )
}