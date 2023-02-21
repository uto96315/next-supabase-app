import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage, GetStaticProps } from "next";
import { Layout } from "components/Layout";
import { supabase } from "utils/supabase";
import { Task, Notice } from "types/types";

export const getStaticProps: GetStaticProps = async () => {
    console.log("getStaticProps/ssg invoked");

    // supabaseのtodoテーブルからデータを取得する
    const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });

    // supabaseのnoticesテーブルからデータを取得する
    const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });

    return { props: { tasks, notices }, revalidate: 5 };  // revalidate: 5 = HTMLの再生成は５秒間に最大1回という設定
};

type StaticProps = {
    tasks: Task[]; 
    notices: Notice[];
};

const Isr: NextPage<StaticProps> = ({ tasks, notices }) => {
    return (
        <Layout title="ISR">
            <p className="mb-3 text-indigo-500">ISR</p>

            <ul className="mb-3">
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <p className="text-lg font-extrabold">{task.title}</p>
                        </li>
                    );
                })}
            </ul>

            <ul className="mb-3">
                {notices.map((notice) => {
                    return (
                        <li key={notice.id}>
                            <p className="text-lg font-extrabold">{notice.content}</p>
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
};

export default Isr;