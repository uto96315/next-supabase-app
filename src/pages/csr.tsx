import { useState, useEffect } from "react";
import { NextPage } from "next";
import { supabase } from "utils/supabase";
import { Task, Notice } from "types/types";
import { Layout } from "components/Layout";

const Csr: NextPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [notices, setNotice] = useState<Notice[]>([]);

    useEffect(() => {
        const getTasks = async () => {
            const { data: task } = await supabase
                .from("tasks")
                .select("*")
                .order("created_at", { ascending: true });
            setTasks(task as Task[]);
        };
        const getNotice = async () => {
            const { data: notice } = await supabase
                .from("notice")
                .select("*")
                .order("created_at", { ascending: true });
            setNotice(notice as Notice[]);
        };

        getTasks();
        getNotice();
    }, []);

    return (
        <Layout title="CSR">
            <p className="mb-3 text-blue-500">SSG + CSF</p>
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

export default Csr;