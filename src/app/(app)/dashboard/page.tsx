"use client";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({ resolver: zodResolver(acceptMessageSchema) });

  const { register, watch, setValue } = form;

  const acceptMessage = watch("acceptMessage");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessage", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "failed to fetch message setting",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);
  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsloading(true);
    setIsSwitchLoading(false);

    try {
      const response = await axios.get<ApiResponse>("api/get-messages");

      setMessages(response.data.messages || []);

      if (refresh) {
        toast({
          title: "refreshed messages",
          description: "showing latest messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "failed to fetch message setting",
        variant: "destructive",
      });
    }
  }, []);
  return <div>sa</div>;
};

export default page;
