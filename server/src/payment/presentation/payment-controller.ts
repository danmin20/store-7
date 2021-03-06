import properties from "@/config/properties/properties";
import {
  Body,
  Controller,
  Query,
  Post,
  Get,
  Redirect,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

@Controller("/payment")
export class PaymentController {
  tid: string;

  @Post("/ready")
  async postPaymentReady(
    @Body() body,
    @Res({ passthrough: true }) res: Response
  ) {
    const params = new URLSearchParams();
    params.append("cid", body.cid);
    params.append("partner_order_id", "1234512345");
    params.append("partner_user_id", "1234512345");
    params.append("item_name", body.item_name);
    params.append("quantity", body.quantity);
    params.append("total_amount", body.total_amount);
    params.append("tax_free_amount", body.tax_free_amount);
    params.append("approval_url", body.approval_url);
    params.append("cancel_url", body.cancel_url);
    params.append("fail_url", body.fail_url);

    try {
      const response = await fetch("https://kapi.kakao.com/v1/payment/ready", {
        method: "POST",
        headers: {
          "Authorization": `KakaoAK ${process.env.KAKAO_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: params,
      });
      const json = await response.json();
      this.tid = json.tid;

      return {
        url: json.next_redirect_pc_url,
      };
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST);
      return { message: e.message };
    }
  }

  @Get("/approve")
  @Redirect()
  async postPaymentApprove(
    @Query("pg_token") pg_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const params = new URLSearchParams();
    params.append("cid", "TC0ONETIME");
    params.append("tid", this.tid);
    params.append("pg_token", pg_token);
    params.append("partner_order_id", "1234512345");
    params.append("partner_user_id", "1234512345");

    try {
      const response = await fetch(
        "https://kapi.kakao.com/v1/payment/approve",
        {
          method: "POST",
          headers: {
            "Authorization": `KakaoAK ${process.env.KAKAO_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: params,
        }
      );
      const json = await response.json();
      return json.aid
        ? {
            status: 301,
            url: properties.client,
          }
        : {
            status: 500,
            message: "payment failed",
          };
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST);
      return { message: e.message };
    }
  }
}
