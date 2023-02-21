import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage, GetStaticProps } from "next";
import { Layout } from "components/Layout";
import { supabase } from "utils/supabase";
import { Task, Notice } from "types/types";


// 画面読み込み時に発火して非同期処理を行う
export const getStaticProps: GetStaticProps = async () => {
    console.log("getStaticProps/ssg invoked");

    // supabaseのtodoテーブルからデータを取得する
    const { data: tasks } = await supabase  // todo: なんで{data:tasks}みたいに書いてるの？
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });

    // supabaseのnoticesテーブルからデータを取得する
    const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });

    return { props: { tasks, notices } };
};

type StaticProps = {
    tasks: Task[];  // これはTask型のオブジェクトが配列として格納されるということ
    notices: Notice[];
};

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
    const router = useRouter();

    return (
        <Layout title="SSG">
            <p className="mb-3 text-blue-300">SSG</p>

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

            <Link href="/ssr" prefetch={false}>
                <p className="mb-3 text-xs">Link to ssr</p>
            </Link>
            <Link href="/isr" prefetch={false}>
                <p className="mb-3 text-xs">Link to isr</p>
            </Link>

            <button className="mb-3 text-xs" onClick={() => router.push("/ssr")}>
                Route to ssr
            </button>
            <button className="mb-3 text-xs" onClick={() => router.push("/isr")}>
                Route to isr
            </button>
        </Layout>
    );
};

export default Ssg;