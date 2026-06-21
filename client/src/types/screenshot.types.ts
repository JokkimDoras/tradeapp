export interface responseScreenshotData{
  id:string;
  trade_id:string;
  user_id:string;
  file_path:string;
  file_name:number;
  created_at:string;
  pubblic_url:string;

}
export interface fetchScreenshotResponse {
  success:boolean;
  message:string;
  data:responseScreenshotData[]
}
