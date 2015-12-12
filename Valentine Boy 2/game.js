/*********************************************
 * Tululoo Game Maker v1.3.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011 - 2013
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/

function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// time:
	tu_frame_time = tu_frame_step = tu_frame_el = tu_frame_count = tu_elapsed = 0,
	tu_prev_cycle_time = tu_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_alpha = 1, tu_draw_color_red = tu_draw_color_green = tu_draw_color_blue = 0,
	tu_draw_font = "Arial 12px", tu_draw_halign = "left", tu_draw_valign = "top",
	tu_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	tu_draw_color = "rgb(" + tu_draw_color_red + "," + 
	tu_draw_color_green + "," + tu_draw_color_blue + ")", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color_red = _r;
	tu_draw_color_green = _g;
	tu_draw_color_blue = _b;
	tu_draw_color = tu_draw_color_red + "," + tu_draw_color_green + "," + tu_draw_color_blue;
	tu_context.fillStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.strokeStyle = "rgb(" + tu_draw_color + ")";
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_draw_font_ = _font;
	tu_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
}
function draw_set_halign(_halign) { tu_draw_halign = _halign; }
function draw_set_valign(_valign) { tu_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/


/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __sprite_162() { 
__sprite_init__(this, sprite_162, 32, 48, 16, 24, 'Box', 16, 0, 32, 0, 48, ['img/sprite_162_0.png','img/sprite_162_1.png','img/sprite_162_2.png','img/sprite_162_3.png','img/sprite_162_4.png','img/sprite_162_5.png','img/sprite_162_6.png','img/sprite_162_7.png','img/sprite_162_8.png','img/sprite_162_9.png','img/sprite_162_10.png','img/sprite_162_11.png','img/sprite_162_12.png','img/sprite_162_13.png','img/sprite_162_14.png','img/sprite_162_15.png']);
}; var sprite_162 = new __sprite_162();

function __sprite_342() { 
__sprite_init__(this, sprite_342, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_342_0.png']);
}; var sprite_342 = new __sprite_342();

function __sprite_384() { 
__sprite_init__(this, sprite_384, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_384_0.png']);
}; var sprite_384 = new __sprite_384();

function __drzwi() { 
__sprite_init__(this, drzwi, 82, 64, 0, 0, 'Box', 41, 0, 82, 0, 64, ['img/drzwi_0.png']);
}; var drzwi = new __drzwi();

function __sprite_469() { 
__sprite_init__(this, sprite_469, 34, 41, 0, 0, 'Box', 17, 0, 34, 0, 41, ['img/sprite_469_0.png','img/sprite_469_1.png','img/sprite_469_2.png','img/sprite_469_3.png','img/sprite_469_4.png','img/sprite_469_5.png','img/sprite_469_6.png','img/sprite_469_7.png','img/sprite_469_8.png','img/sprite_469_9.png','img/sprite_469_10.png','img/sprite_469_11.png','img/sprite_469_12.png','img/sprite_469_13.png','img/sprite_469_14.png','img/sprite_469_15.png','img/sprite_469_16.png','img/sprite_469_17.png']);
}; var sprite_469 = new __sprite_469();

function __mikro_sprite() { 
__sprite_init__(this, mikro_sprite, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/mikro_sprite_0.png']);
}; var mikro_sprite = new __mikro_sprite();

function __sprite_560() { 
__sprite_init__(this, sprite_560, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/sprite_560_0.png']);
}; var sprite_560 = new __sprite_560();

function __sprite_563() { 
__sprite_init__(this, sprite_563, 16, 16, 0, 0, 'Box', 8, 0, 16, 0, 16, ['img/sprite_563_0.png']);
}; var sprite_563 = new __sprite_563();

function __sprite_637() { 
__sprite_init__(this, sprite_637, 187, 60, 0, 0, 'Box', 93, 0, 187, 0, 60, ['img/sprite_637_0.png']);
}; var sprite_637 = new __sprite_637();

function __sprite_650() { 
__sprite_init__(this, sprite_650, 35, 64, 0, 0, 'Box', 17, 0, 35, 0, 64, ['img/sprite_650_0.png']);
}; var sprite_650 = new __sprite_650();

function __sprite_1188() { 
__sprite_init__(this, sprite_1188, 72, 62, 0, 0, 'Box', 36, 0, 72, 0, 62, ['img/sprite_1188_0.png']);
}; var sprite_1188 = new __sprite_1188();

function __sprite_1196() { 
__sprite_init__(this, sprite_1196, 33, 34, 0, 0, 'Box', 16, 0, 33, 0, 34, ['img/sprite_1196_0.png']);
}; var sprite_1196 = new __sprite_1196();

function __sprite_1216() { 
__sprite_init__(this, sprite_1216, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_1216_0.png']);
}; var sprite_1216 = new __sprite_1216();

function __sprite_1224() { 
__sprite_init__(this, sprite_1224, 64, 23, 0, 0, 'Box', 32, 0, 64, 0, 23, ['img/sprite_1224_0.png']);
}; var sprite_1224 = new __sprite_1224();

function __sprite_1228() { 
__sprite_init__(this, sprite_1228, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_1228_0.png','img/sprite_1228_1.png','img/sprite_1228_2.png','img/sprite_1228_3.png','img/sprite_1228_4.png','img/sprite_1228_5.png','img/sprite_1228_6.png','img/sprite_1228_7.png','img/sprite_1228_8.png','img/sprite_1228_9.png','img/sprite_1228_10.png','img/sprite_1228_11.png','img/sprite_1228_12.png','img/sprite_1228_13.png','img/sprite_1228_14.png','img/sprite_1228_15.png']);
}; var sprite_1228 = new __sprite_1228();

function __sprite_1229() { 
__sprite_init__(this, sprite_1229, 49, 48, 0, 0, 'Box', 24, 0, 49, 0, 48, ['img/sprite_1229_0.png','img/sprite_1229_1.png','img/sprite_1229_2.png','img/sprite_1229_3.png','img/sprite_1229_4.png','img/sprite_1229_5.png','img/sprite_1229_6.png','img/sprite_1229_7.png','img/sprite_1229_8.png','img/sprite_1229_9.png','img/sprite_1229_10.png','img/sprite_1229_11.png','img/sprite_1229_12.png','img/sprite_1229_13.png','img/sprite_1229_14.png','img/sprite_1229_15.png']);
}; var sprite_1229 = new __sprite_1229();

function __sprite_1240() { 
__sprite_init__(this, sprite_1240, 75, 70, 0, 0, 'Box', 37, 0, 75, 0, 70, ['img/sprite_1240_0.png','img/sprite_1240_1.png','img/sprite_1240_2.png','img/sprite_1240_3.png','img/sprite_1240_4.png','img/sprite_1240_5.png','img/sprite_1240_6.png','img/sprite_1240_7.png','img/sprite_1240_8.png','img/sprite_1240_9.png','img/sprite_1240_10.png','img/sprite_1240_11.png','img/sprite_1240_12.png','img/sprite_1240_13.png','img/sprite_1240_14.png','img/sprite_1240_15.png']);
}; var sprite_1240 = new __sprite_1240();

function __sprite_1322() { 
__sprite_init__(this, sprite_1322, 8, 8, 0, 0, 'Box', 4, 0, 8, 0, 8, ['img/sprite_1322_0.png']);
}; var sprite_1322 = new __sprite_1322();

function __sprite_1399() { 
__sprite_init__(this, sprite_1399, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_1399_0.png','img/sprite_1399_1.png','img/sprite_1399_2.png','img/sprite_1399_3.png','img/sprite_1399_4.png','img/sprite_1399_5.png','img/sprite_1399_6.png','img/sprite_1399_7.png','img/sprite_1399_8.png','img/sprite_1399_9.png','img/sprite_1399_10.png','img/sprite_1399_11.png','img/sprite_1399_12.png','img/sprite_1399_13.png','img/sprite_1399_14.png','img/sprite_1399_15.png']);
}; var sprite_1399 = new __sprite_1399();

function __sprite_1400() { 
__sprite_init__(this, sprite_1400, 35, 46, 0, 0, 'Box', 17, 0, 35, 0, 46, ['img/sprite_1400_0.png','img/sprite_1400_1.png','img/sprite_1400_2.png','img/sprite_1400_3.png','img/sprite_1400_4.png','img/sprite_1400_5.png','img/sprite_1400_6.png','img/sprite_1400_7.png','img/sprite_1400_8.png','img/sprite_1400_9.png','img/sprite_1400_10.png','img/sprite_1400_11.png','img/sprite_1400_12.png','img/sprite_1400_13.png','img/sprite_1400_14.png','img/sprite_1400_15.png']);
}; var sprite_1400 = new __sprite_1400();

function __sprite_2025() { 
__sprite_init__(this, sprite_2025, 20, 21, 0, 0, 'Box', 10, 0, 20, 0, 21, ['img/sprite_2025_0.png','img/sprite_2025_1.png','img/sprite_2025_2.png','img/sprite_2025_3.png','img/sprite_2025_4.png']);
}; var sprite_2025 = new __sprite_2025();

function __sprite_2067() { 
__sprite_init__(this, sprite_2067, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_2067_0.png','img/sprite_2067_1.png','img/sprite_2067_2.png','img/sprite_2067_3.png','img/sprite_2067_4.png','img/sprite_2067_5.png','img/sprite_2067_6.png','img/sprite_2067_7.png','img/sprite_2067_8.png','img/sprite_2067_9.png','img/sprite_2067_10.png','img/sprite_2067_11.png','img/sprite_2067_12.png','img/sprite_2067_13.png','img/sprite_2067_14.png','img/sprite_2067_15.png']);
}; var sprite_2067 = new __sprite_2067();

function __sprite_2078() { 
__sprite_init__(this, sprite_2078, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_2078_0.png','img/sprite_2078_1.png','img/sprite_2078_2.png','img/sprite_2078_3.png','img/sprite_2078_4.png','img/sprite_2078_5.png','img/sprite_2078_6.png','img/sprite_2078_7.png','img/sprite_2078_8.png','img/sprite_2078_9.png','img/sprite_2078_10.png','img/sprite_2078_11.png','img/sprite_2078_12.png','img/sprite_2078_13.png','img/sprite_2078_14.png','img/sprite_2078_15.png','img/sprite_2078_16.png','img/sprite_2078_17.png','img/sprite_2078_18.png','img/sprite_2078_19.png','img/sprite_2078_20.png','img/sprite_2078_21.png','img/sprite_2078_22.png','img/sprite_2078_23.png','img/sprite_2078_24.png','img/sprite_2078_25.png','img/sprite_2078_26.png','img/sprite_2078_27.png','img/sprite_2078_28.png','img/sprite_2078_29.png','img/sprite_2078_30.png','img/sprite_2078_31.png','img/sprite_2078_32.png','img/sprite_2078_33.png','img/sprite_2078_34.png','img/sprite_2078_35.png','img/sprite_2078_36.png','img/sprite_2078_37.png','img/sprite_2078_38.png','img/sprite_2078_39.png','img/sprite_2078_40.png','img/sprite_2078_41.png','img/sprite_2078_42.png','img/sprite_2078_43.png','img/sprite_2078_44.png','img/sprite_2078_45.png','img/sprite_2078_46.png','img/sprite_2078_47.png','img/sprite_2078_48.png','img/sprite_2078_49.png','img/sprite_2078_50.png','img/sprite_2078_51.png','img/sprite_2078_52.png','img/sprite_2078_53.png','img/sprite_2078_54.png','img/sprite_2078_55.png','img/sprite_2078_56.png','img/sprite_2078_57.png','img/sprite_2078_58.png','img/sprite_2078_59.png','img/sprite_2078_60.png','img/sprite_2078_61.png','img/sprite_2078_62.png','img/sprite_2078_63.png','img/sprite_2078_64.png','img/sprite_2078_65.png','img/sprite_2078_66.png','img/sprite_2078_67.png','img/sprite_2078_68.png','img/sprite_2078_69.png','img/sprite_2078_70.png','img/sprite_2078_71.png','img/sprite_2078_72.png','img/sprite_2078_73.png','img/sprite_2078_74.png','img/sprite_2078_75.png','img/sprite_2078_76.png','img/sprite_2078_77.png','img/sprite_2078_78.png','img/sprite_2078_79.png','img/sprite_2078_80.png','img/sprite_2078_81.png','img/sprite_2078_82.png','img/sprite_2078_83.png','img/sprite_2078_84.png','img/sprite_2078_85.png','img/sprite_2078_86.png','img/sprite_2078_87.png','img/sprite_2078_88.png','img/sprite_2078_89.png','img/sprite_2078_90.png','img/sprite_2078_91.png','img/sprite_2078_92.png','img/sprite_2078_93.png','img/sprite_2078_94.png','img/sprite_2078_95.png']);
}; var sprite_2078 = new __sprite_2078();

function __sprite_2092() { 
__sprite_init__(this, sprite_2092, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_2092_0.png','img/sprite_2092_1.png','img/sprite_2092_2.png','img/sprite_2092_3.png','img/sprite_2092_4.png','img/sprite_2092_5.png','img/sprite_2092_6.png','img/sprite_2092_7.png','img/sprite_2092_8.png','img/sprite_2092_9.png','img/sprite_2092_10.png','img/sprite_2092_11.png','img/sprite_2092_12.png','img/sprite_2092_13.png','img/sprite_2092_14.png','img/sprite_2092_15.png','img/sprite_2092_16.png','img/sprite_2092_17.png','img/sprite_2092_18.png','img/sprite_2092_19.png','img/sprite_2092_20.png','img/sprite_2092_21.png','img/sprite_2092_22.png','img/sprite_2092_23.png','img/sprite_2092_24.png','img/sprite_2092_25.png','img/sprite_2092_26.png','img/sprite_2092_27.png','img/sprite_2092_28.png','img/sprite_2092_29.png','img/sprite_2092_30.png','img/sprite_2092_31.png','img/sprite_2092_32.png','img/sprite_2092_33.png','img/sprite_2092_34.png','img/sprite_2092_35.png','img/sprite_2092_36.png','img/sprite_2092_37.png','img/sprite_2092_38.png','img/sprite_2092_39.png','img/sprite_2092_40.png','img/sprite_2092_41.png','img/sprite_2092_42.png','img/sprite_2092_43.png','img/sprite_2092_44.png','img/sprite_2092_45.png','img/sprite_2092_46.png','img/sprite_2092_47.png','img/sprite_2092_48.png','img/sprite_2092_49.png','img/sprite_2092_50.png','img/sprite_2092_51.png','img/sprite_2092_52.png','img/sprite_2092_53.png','img/sprite_2092_54.png','img/sprite_2092_55.png','img/sprite_2092_56.png','img/sprite_2092_57.png','img/sprite_2092_58.png','img/sprite_2092_59.png','img/sprite_2092_60.png','img/sprite_2092_61.png','img/sprite_2092_62.png','img/sprite_2092_63.png','img/sprite_2092_64.png','img/sprite_2092_65.png','img/sprite_2092_66.png','img/sprite_2092_67.png','img/sprite_2092_68.png','img/sprite_2092_69.png','img/sprite_2092_70.png','img/sprite_2092_71.png','img/sprite_2092_72.png','img/sprite_2092_73.png','img/sprite_2092_74.png','img/sprite_2092_75.png','img/sprite_2092_76.png','img/sprite_2092_77.png','img/sprite_2092_78.png','img/sprite_2092_79.png','img/sprite_2092_80.png','img/sprite_2092_81.png','img/sprite_2092_82.png','img/sprite_2092_83.png','img/sprite_2092_84.png','img/sprite_2092_85.png','img/sprite_2092_86.png','img/sprite_2092_87.png','img/sprite_2092_88.png','img/sprite_2092_89.png','img/sprite_2092_90.png','img/sprite_2092_91.png','img/sprite_2092_92.png','img/sprite_2092_93.png','img/sprite_2092_94.png','img/sprite_2092_95.png','img/sprite_2092_96.png','img/sprite_2092_97.png','img/sprite_2092_98.png','img/sprite_2092_99.png','img/sprite_2092_100.png','img/sprite_2092_101.png','img/sprite_2092_102.png','img/sprite_2092_103.png','img/sprite_2092_104.png','img/sprite_2092_105.png','img/sprite_2092_106.png','img/sprite_2092_107.png','img/sprite_2092_108.png','img/sprite_2092_109.png','img/sprite_2092_110.png','img/sprite_2092_111.png','img/sprite_2092_112.png','img/sprite_2092_113.png','img/sprite_2092_114.png','img/sprite_2092_115.png','img/sprite_2092_116.png','img/sprite_2092_117.png','img/sprite_2092_118.png','img/sprite_2092_119.png','img/sprite_2092_120.png','img/sprite_2092_121.png','img/sprite_2092_122.png','img/sprite_2092_123.png','img/sprite_2092_124.png','img/sprite_2092_125.png','img/sprite_2092_126.png','img/sprite_2092_127.png','img/sprite_2092_128.png','img/sprite_2092_129.png','img/sprite_2092_130.png','img/sprite_2092_131.png','img/sprite_2092_132.png','img/sprite_2092_133.png','img/sprite_2092_134.png','img/sprite_2092_135.png','img/sprite_2092_136.png','img/sprite_2092_137.png','img/sprite_2092_138.png','img/sprite_2092_139.png','img/sprite_2092_140.png','img/sprite_2092_141.png','img/sprite_2092_142.png','img/sprite_2092_143.png','img/sprite_2092_144.png','img/sprite_2092_145.png','img/sprite_2092_146.png','img/sprite_2092_147.png','img/sprite_2092_148.png','img/sprite_2092_149.png','img/sprite_2092_150.png','img/sprite_2092_151.png','img/sprite_2092_152.png','img/sprite_2092_153.png','img/sprite_2092_154.png','img/sprite_2092_155.png','img/sprite_2092_156.png','img/sprite_2092_157.png','img/sprite_2092_158.png','img/sprite_2092_159.png','img/sprite_2092_160.png','img/sprite_2092_161.png','img/sprite_2092_162.png','img/sprite_2092_163.png','img/sprite_2092_164.png','img/sprite_2092_165.png','img/sprite_2092_166.png','img/sprite_2092_167.png','img/sprite_2092_168.png','img/sprite_2092_169.png','img/sprite_2092_170.png','img/sprite_2092_171.png','img/sprite_2092_172.png','img/sprite_2092_173.png','img/sprite_2092_174.png','img/sprite_2092_175.png','img/sprite_2092_176.png','img/sprite_2092_177.png','img/sprite_2092_178.png','img/sprite_2092_179.png','img/sprite_2092_180.png','img/sprite_2092_181.png','img/sprite_2092_182.png','img/sprite_2092_183.png','img/sprite_2092_184.png','img/sprite_2092_185.png','img/sprite_2092_186.png','img/sprite_2092_187.png','img/sprite_2092_188.png','img/sprite_2092_189.png','img/sprite_2092_190.png','img/sprite_2092_191.png','img/sprite_2092_192.png','img/sprite_2092_193.png','img/sprite_2092_194.png','img/sprite_2092_195.png','img/sprite_2092_196.png','img/sprite_2092_197.png','img/sprite_2092_198.png','img/sprite_2092_199.png','img/sprite_2092_200.png','img/sprite_2092_201.png','img/sprite_2092_202.png','img/sprite_2092_203.png','img/sprite_2092_204.png','img/sprite_2092_205.png','img/sprite_2092_206.png','img/sprite_2092_207.png','img/sprite_2092_208.png','img/sprite_2092_209.png','img/sprite_2092_210.png','img/sprite_2092_211.png','img/sprite_2092_212.png','img/sprite_2092_213.png','img/sprite_2092_214.png','img/sprite_2092_215.png','img/sprite_2092_216.png','img/sprite_2092_217.png','img/sprite_2092_218.png','img/sprite_2092_219.png','img/sprite_2092_220.png','img/sprite_2092_221.png','img/sprite_2092_222.png','img/sprite_2092_223.png','img/sprite_2092_224.png','img/sprite_2092_225.png','img/sprite_2092_226.png','img/sprite_2092_227.png','img/sprite_2092_228.png','img/sprite_2092_229.png','img/sprite_2092_230.png','img/sprite_2092_231.png','img/sprite_2092_232.png','img/sprite_2092_233.png','img/sprite_2092_234.png','img/sprite_2092_235.png','img/sprite_2092_236.png','img/sprite_2092_237.png','img/sprite_2092_238.png','img/sprite_2092_239.png','img/sprite_2092_240.png','img/sprite_2092_241.png','img/sprite_2092_242.png','img/sprite_2092_243.png','img/sprite_2092_244.png','img/sprite_2092_245.png','img/sprite_2092_246.png','img/sprite_2092_247.png','img/sprite_2092_248.png','img/sprite_2092_249.png','img/sprite_2092_250.png','img/sprite_2092_251.png','img/sprite_2092_252.png','img/sprite_2092_253.png','img/sprite_2092_254.png','img/sprite_2092_255.png']);
}; var sprite_2092 = new __sprite_2092();

function __sprite_2093() { 
__sprite_init__(this, sprite_2093, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_2093_0.png']);
}; var sprite_2093 = new __sprite_2093();

function __sprite_2094() { 
__sprite_init__(this, sprite_2094, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_2094_0.png']);
}; var sprite_2094 = new __sprite_2094();

function __sprite_2106() { 
__sprite_init__(this, sprite_2106, 11, 11, 0, 0, 'Box', 5, 0, 11, 0, 11, ['img/sprite_2106_0.png']);
}; var sprite_2106 = new __sprite_2106();

function __kladka_sprite() { 
__sprite_init__(this, kladka_sprite, 53, 53, 0, 0, 'Box', 26, 0, 53, 24, 34, ['img/kladka_sprite_0.png']);
}; var kladka_sprite = new __kladka_sprite();

function __sprite_ryuk() { 
__sprite_init__(this, sprite_ryuk, 48, 64, 24, 32, 'Box', 24, 0, 48, 0, 64, ['img/sprite_ryuk_0.png','img/sprite_ryuk_1.png','img/sprite_ryuk_2.png','img/sprite_ryuk_3.png','img/sprite_ryuk_4.png','img/sprite_ryuk_5.png','img/sprite_ryuk_6.png','img/sprite_ryuk_7.png','img/sprite_ryuk_8.png','img/sprite_ryuk_9.png','img/sprite_ryuk_10.png','img/sprite_ryuk_11.png','img/sprite_ryuk_12.png','img/sprite_ryuk_13.png','img/sprite_ryuk_14.png','img/sprite_ryuk_15.png']);
}; var sprite_ryuk = new __sprite_ryuk();

function __sprite_2181() { 
__sprite_init__(this, sprite_2181, 48, 48, 0, 0, 'Box', 24, 0, 48, 0, 48, ['img/sprite_2181_0.png','img/sprite_2181_1.png','img/sprite_2181_2.png','img/sprite_2181_3.png','img/sprite_2181_4.png','img/sprite_2181_5.png','img/sprite_2181_6.png','img/sprite_2181_7.png','img/sprite_2181_8.png','img/sprite_2181_9.png','img/sprite_2181_10.png','img/sprite_2181_11.png','img/sprite_2181_12.png','img/sprite_2181_13.png','img/sprite_2181_14.png','img/sprite_2181_15.png']);
}; var sprite_2181 = new __sprite_2181();

function __sprite_bialorus2() { 
__sprite_init__(this, sprite_bialorus2, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_bialorus2_0.png','img/sprite_bialorus2_1.png','img/sprite_bialorus2_2.png','img/sprite_bialorus2_3.png','img/sprite_bialorus2_4.png','img/sprite_bialorus2_5.png','img/sprite_bialorus2_6.png','img/sprite_bialorus2_7.png','img/sprite_bialorus2_8.png','img/sprite_bialorus2_9.png','img/sprite_bialorus2_10.png','img/sprite_bialorus2_11.png','img/sprite_bialorus2_12.png','img/sprite_bialorus2_13.png','img/sprite_bialorus2_14.png','img/sprite_bialorus2_15.png']);
}; var sprite_bialorus2 = new __sprite_bialorus2();

function __sprite_kenijka() { 
__sprite_init__(this, sprite_kenijka, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_kenijka_0.png','img/sprite_kenijka_1.png','img/sprite_kenijka_2.png','img/sprite_kenijka_3.png','img/sprite_kenijka_4.png','img/sprite_kenijka_5.png','img/sprite_kenijka_6.png','img/sprite_kenijka_7.png','img/sprite_kenijka_8.png','img/sprite_kenijka_9.png','img/sprite_kenijka_10.png','img/sprite_kenijka_11.png','img/sprite_kenijka_12.png','img/sprite_kenijka_13.png','img/sprite_kenijka_14.png','img/sprite_kenijka_15.png']);
}; var sprite_kenijka = new __sprite_kenijka();

function __sprite_etipoka() { 
__sprite_init__(this, sprite_etipoka, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_etipoka_0.png','img/sprite_etipoka_1.png','img/sprite_etipoka_2.png','img/sprite_etipoka_3.png','img/sprite_etipoka_4.png','img/sprite_etipoka_5.png','img/sprite_etipoka_6.png','img/sprite_etipoka_7.png','img/sprite_etipoka_8.png','img/sprite_etipoka_9.png','img/sprite_etipoka_10.png','img/sprite_etipoka_11.png','img/sprite_etipoka_12.png','img/sprite_etipoka_13.png','img/sprite_etipoka_14.png','img/sprite_etipoka_15.png']);
}; var sprite_etipoka = new __sprite_etipoka();

function __sprite_hinduska() { 
__sprite_init__(this, sprite_hinduska, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_hinduska_0.png','img/sprite_hinduska_1.png','img/sprite_hinduska_2.png','img/sprite_hinduska_3.png','img/sprite_hinduska_4.png','img/sprite_hinduska_5.png','img/sprite_hinduska_6.png','img/sprite_hinduska_7.png','img/sprite_hinduska_8.png','img/sprite_hinduska_9.png','img/sprite_hinduska_10.png','img/sprite_hinduska_11.png','img/sprite_hinduska_12.png','img/sprite_hinduska_13.png','img/sprite_hinduska_14.png','img/sprite_hinduska_15.png']);
}; var sprite_hinduska = new __sprite_hinduska();

function __sprite_chinka1() { 
__sprite_init__(this, sprite_chinka1, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_chinka1_0.png','img/sprite_chinka1_1.png','img/sprite_chinka1_2.png','img/sprite_chinka1_3.png','img/sprite_chinka1_4.png','img/sprite_chinka1_5.png','img/sprite_chinka1_6.png','img/sprite_chinka1_7.png','img/sprite_chinka1_8.png','img/sprite_chinka1_9.png','img/sprite_chinka1_10.png','img/sprite_chinka1_11.png','img/sprite_chinka1_12.png','img/sprite_chinka1_13.png','img/sprite_chinka1_14.png','img/sprite_chinka1_15.png']);
}; var sprite_chinka1 = new __sprite_chinka1();

function __sprite_chinka3() { 
__sprite_init__(this, sprite_chinka3, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_chinka3_0.png','img/sprite_chinka3_1.png','img/sprite_chinka3_2.png','img/sprite_chinka3_3.png','img/sprite_chinka3_4.png','img/sprite_chinka3_5.png','img/sprite_chinka3_6.png','img/sprite_chinka3_7.png','img/sprite_chinka3_8.png','img/sprite_chinka3_9.png','img/sprite_chinka3_10.png','img/sprite_chinka3_11.png','img/sprite_chinka3_12.png','img/sprite_chinka3_13.png','img/sprite_chinka3_14.png','img/sprite_chinka3_15.png']);
}; var sprite_chinka3 = new __sprite_chinka3();

function __sprite_japonka() { 
__sprite_init__(this, sprite_japonka, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_japonka_0.png','img/sprite_japonka_1.png','img/sprite_japonka_2.png','img/sprite_japonka_3.png','img/sprite_japonka_4.png','img/sprite_japonka_5.png','img/sprite_japonka_6.png','img/sprite_japonka_7.png','img/sprite_japonka_8.png','img/sprite_japonka_9.png','img/sprite_japonka_10.png','img/sprite_japonka_11.png','img/sprite_japonka_12.png','img/sprite_japonka_13.png','img/sprite_japonka_14.png','img/sprite_japonka_15.png']);
}; var sprite_japonka = new __sprite_japonka();

function __sprite_2214() { 
__sprite_init__(this, sprite_2214, 32, 25, 0, 0, 'Box', 16, 0, 32, 0, 25, ['img/sprite_2214_0.png']);
}; var sprite_2214 = new __sprite_2214();

function __grastra_logo() { 
__sprite_init__(this, grastra_logo, 110, 88, 0, 0, 'Box', 55, 0, 110, 0, 88, ['img/grastra_logo_0.png']);
}; var grastra_logo = new __grastra_logo();

function __napis_girl() { 
__sprite_init__(this, napis_girl, 410, 118, 0, 0, 'Box', 205, 0, 410, 0, 118, ['img/napis_girl_0.png']);
}; var napis_girl = new __napis_girl();

function __american_girl() { 
__sprite_init__(this, american_girl, 80, 87, 0, 0, 'Box', 40, 0, 80, 0, 87, ['img/american_girl_0.png']);
}; var american_girl = new __american_girl();

function __dzwieki_on_sprite() { 
__sprite_init__(this, dzwieki_on_sprite, 29, 30, 0, 0, 'Box', 14, 0, 29, 0, 30, ['img/dzwieki_on_sprite_0.png']);
}; var dzwieki_on_sprite = new __dzwieki_on_sprite();

function __dzwieki_off_sprite() { 
__sprite_init__(this, dzwieki_off_sprite, 29, 29, 0, 0, 'Box', 14, 0, 29, 0, 29, ['img/dzwieki_off_sprite_0.png']);
}; var dzwieki_off_sprite = new __dzwieki_off_sprite();

function __muzyka_on_sprite() { 
__sprite_init__(this, muzyka_on_sprite, 29, 29, 0, 0, 'Box', 14, 0, 29, 0, 29, ['img/muzyka_on_sprite_0.png']);
}; var muzyka_on_sprite = new __muzyka_on_sprite();

function __muzyka_off_sprite() { 
__sprite_init__(this, muzyka_off_sprite, 29, 29, 0, 0, 'Box', 14, 0, 29, 0, 29, ['img/muzyka_off_sprite_0.png']);
}; var muzyka_off_sprite = new __muzyka_off_sprite();

function __kwiatek() { 
__sprite_init__(this, kwiatek, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/kwiatek_0.png']);
}; var kwiatek = new __kwiatek();

function __burger() { 
__sprite_init__(this, burger, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/burger_0.png']);
}; var burger = new __burger();

function __skrzydla_sprite() { 
__sprite_init__(this, skrzydla_sprite, 47, 47, 0, 0, 'Box', 23, 0, 47, 0, 47, ['img/skrzydla_sprite_0.png']);
}; var skrzydla_sprite = new __skrzydla_sprite();

function __skrzydlo_ludzika() { 
__sprite_init__(this, skrzydlo_ludzika, 31, 33, 16, 0, 'Box', 15, 0, 31, 0, 33, ['img/skrzydlo_ludzika_0.png','img/skrzydlo_ludzika_1.png']);
}; var skrzydlo_ludzika = new __skrzydlo_ludzika();

function __kongg() { 
__sprite_init__(this, kongg, 88, 31, 0, 0, 'Box', 44, 0, 88, 0, 31, ['img/kongg_0.png']);
}; var kongg = new __kongg();

function __konggbig() { 
__sprite_init__(this, konggbig, 121, 139, 0, 0, 'Box', 60, 0, 121, 0, 139, ['img/konggbig_0.png']);
}; var konggbig = new __konggbig();

function __sprite_jablko() { 
__sprite_init__(this, sprite_jablko, 34, 41, 0, 0, 'Box', 17, 0, 34, 0, 41, ['img/sprite_jablko_0.png']);
}; var sprite_jablko = new __sprite_jablko();

function __sprite_pause() { 
__sprite_init__(this, sprite_pause, 66, 32, 0, 0, 'Box', 33, 0, 66, 0, 32, ['img/sprite_pause_0.png']);
}; var sprite_pause = new __sprite_pause();

function __sprite_slon_pomyslany() { 
__sprite_init__(this, sprite_slon_pomyslany, 41, 39, 0, 0, 'Box', 20, 0, 41, 0, 39, ['img/sprite_slon_pomyslany_0.png']);
}; var sprite_slon_pomyslany = new __sprite_slon_pomyslany();

function __sprite_slon() { 
__sprite_init__(this, sprite_slon, 67, 64, 0, 0, 'Box', 33, 0, 67, 0, 64, ['img/sprite_slon_0.png']);
}; var sprite_slon = new __sprite_slon();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __snd_jump() { 
__audio_init__(this, snd_jump, 'aud/coin06.wav', '', '');
}; var snd_jump = new __snd_jump();



/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __background_3() { 
__background_init__(this, background_3, 'img/tilea4.png')}; var background_3 = new __background_3();

function __background_272() { 
__background_init__(this, background_272, 'img/tilea4szare.png')}; var background_272 = new __background_272();

function __niebo_szare() { 
__background_init__(this, niebo_szare, 'img/niebo_szare.png')}; var niebo_szare = new __niebo_szare();

function __background_661() { 
__background_init__(this, background_661, 'img/future-joy-tilee_750_transparent.png')}; var background_661 = new __background_661();

function __background_1190() { 
__background_init__(this, background_1190, 'img/rtp-addons.png')}; var background_1190 = new __background_1190();

function __niebo_ciemne() { 
__background_init__(this, niebo_ciemne, 'img/ciemne_niebo.png')}; var niebo_ciemne = new __niebo_ciemne();

function __VALENTINE_TLO() { 
__background_init__(this, VALENTINE_TLO, 'img/ValentineBoy_2.png')}; var VALENTINE_TLO = new __VALENTINE_TLO();

function __poziom_tlo() { 
__background_init__(this, poziom_tlo, 'img/level_tlo.png')}; var poziom_tlo = new __poziom_tlo();

function __background_4177() { 
__background_init__(this, background_4177, 'img/JapaneseVillage.png')}; var background_4177 = new __background_4177();



/***********************************************************************
 * FONTS
 ***********************************************************************/
function __F_Arial() { 
__font_init__(this, F_Arial, 'Arial', 18, 1, 0)}; var F_Arial = new __F_Arial();



/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __Walenty() {
__instance_init__(this, Walenty, null, 1, 1000, sprite_162, 1, 0);
this.on_creation = function() {
with(this) {
this.air = 0;
this.jump = 0;
bity = 0;
this.odrzut=0;

global.poczatkowe_punkty=punkty;
global.game_paused=false; 
global.friendzoned=false;

this.nieruchomosc=0;

image_speed = 0; // zatrzymuje animację obrazka
gra_wstepna=0;

co_ma={
'kot':0,
'pierścień':0,
'but':0,
'filizanka':0,
'kwiat':0,
'burg':0,
'jablko':0,
'slon':0
};


hudini = instance_create(0,0 ,HUD);


this.kier=1;
this.skrzydelko = instance_create(-100,-100,skrzydlo_obj);


dzwieki_tylko_etapu=true;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

if 	(global.game_paused) return;


odliczanie++;
	if (odliczanie>360)
	{
		odliczanie=0;
	}

if (odrzut!=0)
{
	x+=odrzut;
	odrzut-=sign(odrzut)/2;
	if ((place_meeting(x, y, podloze_ziemia) != null) || (place_meeting(x, y, podloze_trawa) != null)) {
			x = xprevious;
		}
}


if (gra_wstepna<=18)
	{


	if (moze_latac)
	{
		this.skrzydelko.image_index=this.kier;
		
		
		
		if (image_index>0)
		{
			if ( keyboard_check(vk_d)  || keyboard_check(vk_a) || keyboard_check( vk_left ) || keyboard_check( vk_right ))  {
				this.skrzydelko.x=x; 
				this.skrzydelko.y=y-15+sin(odliczanie/2)*5;
				this.skrzydelko.image_angle=sin(odliczanie*tu_d2r*24)*15;
			}
			else if ( keyboard_check(vk_w) || keyboard_check( vk_up ))
			{
				this.skrzydelko.x=x; 
				this.skrzydelko.y=y-15+sin(odliczanie)*5;
				this.skrzydelko.image_angle=sin(odliczanie*tu_d2r*48)*15;
			}
			else if ( keyboard_check(vk_s) || keyboard_check( vk_down ))
			{
				this.skrzydelko.x=x; 
				this.skrzydelko.y=y-15;
				this.skrzydelko.image_angle=sin(odliczanie*tu_d2r*3)*15;
			}
			else
			{
				this.skrzydelko.x=x+5-this.kier*10;
				//this.skrzydelko.y=y+15+sin(odliczanie*tu_d2r)*5;
				//this.skrzydelko.y=y-15+sin(odliczanie/6)*5;
				this.skrzydelko.y=y-15;
				
				this.skrzydelko.image_angle=sin(odliczanie*tu_d2r*6)*15;
			}
			
			if (kier==0)
				{
					image_angle=60;
				}
				else
				{
					image_angle=-60;
				}

		}
		
		
		if ( keyboard_check(vk_w) || keyboard_check( vk_up ) )
		{
			y-=3;
			direction = 90;
		}
		if ( keyboard_check(vk_s) || keyboard_check( vk_down ) )
		{
			y+=5;
			direction = 270;
		}
		
		if (odliczanie % 12 < 6)
		{
			y+=0.5;
		}
		else
		{
			y-=0.5;
		}
	}
	else
	{
		image_angle=0;
		if ( (keyboard_check_pressed(vk_w) ||  keyboard_check( vk_up )) && jump == 0 ) {
			jump = 1;
			air =  9; // siła skoku
			if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(snd_jump);
			 
		}

		if ( air > -16 ) air -= 0.5;

		y -= air;
	}





	if  (( place_meeting(x, y, podloze_ziemia) != null)
		|| ( place_meeting(x, y, podloze_trawa) != null)
		|| ( place_meeting(x, y, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y, tasma_prawo) != null)
		|| ( place_meeting(x, y, tasma_lewo) != null)
		|| ( place_meeting(x, y, klocek) != null)
		|| ( place_meeting(x, y, klocek_ciemny) != null)
		|| ( place_meeting(x, y, kladka) != null)
		)
		{
			if ( place_meeting(x, y, klocek) != null)
			{
				obj= place_meeting(x, y, klocek) ;
				obj.y+=2;
			}
			
			if ( place_meeting(x, y, klocek_ciemny) != null)
			{
				obj= place_meeting(x, y, klocek_ciemny) ;
				obj.y+=2;
			}
			
			
			
			y = yprevious;
			air = 0;
			jump = 0;
			
			if ( place_meeting(x, y, kladka) != null)
			{
				y-=2;
				if ( place_meeting(x, y+4, kladka) != null)
				{
					y-=2;
				}
			}
			
		}
	
	
	if ( place_meeting(x, y+8, tasma_lewo) != null)
	{
		x--;
	}
	
	if ( place_meeting(x, y+8, tasma_prawo) != null)
	{
		x++;
	}
	
	if ( keyboard_check(vk_d) || keyboard_check( vk_right ) )  {
		x += 4;
		if (moze_latac)
			{
				x += 4;
			}
		direction = 0;
		image_index = 8 + floor((x % 32) / 8);
		this.kier=1;
		
		if ((place_meeting(x, y, podloze_ziemia) != null) || (place_meeting(x, y, podloze_trawa) != null)) {
				x = xprevious;		
		}
		
		if (place_meeting(x, y+8, podloze_skos_lewy) != null)
			{
				y -= 2;
				x += 1;
			}
		
		 
	}

	if ( keyboard_check(vk_a) || keyboard_check( vk_left )) {
		x -= 4;
		if (moze_latac)
			{
				x -= 4;
			}
		direction = 180;
		image_index = 4+ floor((x % 32 ) / 8);
		this.kier=0;
		
		if ((place_meeting(x, y, podloze_ziemia) != null) || (place_meeting(x, y, podloze_trawa) != null)) {
			x = xprevious;
		}
		
		if  (place_meeting(x, y+8, podloze_skos_prawy) != null)
		{
			y -= 2;
			x -= 1;
		}
		
		 

	}


	 
	


	/*
	if (keyboard_check_pressed(vk_space)) {
		bullet = instance_create(x,y - 25,obj_bullet);
		bullet.direction = direction;
		bullet.speed = 15;
	}
	*/

	if ( x < 0 ) x = 0;
	if ( x > room_width -32 ) x = room_width-32;

	if (y>480)
	{
		dodajZycie(-1);
	}
}
else
{
		this.skrzydelko.x=-100;
		image_angle=-80;
		przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*4;
		x=loze.x+37+przes*1.5;
		y=loze.y+24+przes;
		
		image_index=8;
		
		if (gra_wstepna==19)
		{
			cenz.image_alpha=1;
			cenz.x=x-45;
			cenz.y=y-10;
		}
		
		cenz.image_xscale+=0.02;
		cenz.image_yscale+=0.02;
		cenz.x-=0.2;
		cenz.y-=0.2;
		/*
		przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*6;
		x=obj_drzwi.x+przes;
		y=obj_drzwi.y+przes;
		*/
}

x_gracza=x;
y_gracza=y;

if  ( (x == xprevious) &&  (y == yprevious) )
{
	this.nieruchomosc++;
	if (this.nieruchomosc>600)
	{
		x-=3;
		y+=6;
		global.friendzoned=true;
	}
}
else
{
	this.nieruchomosc=0;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, obj_drzwi);
if(this.other != null) {
if (gra_wstepna<100)
{
	gra_wstepna++
	if (gra_wstepna % 10 == 0)
	{
		//this.odliczanie;
		serc = instance_create(x-20,y ,serduszko);
		serc.direction=irandom(360);
		serc.speed=4;
	}
}
else
{
	gra_wstepna=0;
	room_goto_next();
}
}
this.other = this.place_meeting(this.x, this.y, wrog1);
if(this.other != null) {
bity++;
image_index=1;
y-=2*irandom(2);

expl = instance_create(x+irandom(20)-10,y +irandom(20)-10 ,explozja);
if (bity>10)
{
	dodajZycie(-1);
}
}
this.other = this.place_meeting(this.x, this.y, wrog2);
if(this.other != null) {
bity++;
image_index=1;
y-=2*irandom(2);

expl = instance_create(x+irandom(20)-10,y +irandom(20)-10 ,explozja);
if (bity>10)
{
	dodajZycie(-1);
}
}
this.other = this.place_meeting(this.x, this.y, kula_wroga);
if(this.other != null) {
bity+=3;
image_index=1;

expl = instance_create(x+irandom(20)-10,y +irandom(20)-10 ,explozja);
if (bity>10)
{
	dodajZycie(-1);
}
if (other.direction==180)
{
	this.odrzut=-9;
}
else
{
	this.odrzut=9;
}


other.instance_destroy();
}
}
};
this.on_roomstart = function() {
with(this) {
var t_game = document.getElementById('tululoogame');

var p_game = document.getElementById('punkty');
// jeśli obiekt punkty nie istnieje:

/*
if (p_game===null)
{
	var punkty_div = document.createElement('div');
	divIdName = 'punkty';

	punkty_div.setAttribute('id',divIdName);
	punkty_div.setAttribute('name',divIdName);
	punkty_div.setAttribute('style','position: absolute; top: 460px; left: 20px; background-color: red; padding: 5px;');

	punkty_div.innerHTML = 'Score:<span id="pkt" name="pkt">'+punkty+'</span> Lives: <span id="zyc" name="zyc">'+zycia+'</span>';

	t_game.appendChild(punkty_div);
	
}
*/

cenz = instance_create(x+15,y - 55 ,cenzura);
cenz.image_alpha=0;

ile_chmurek=0;
chmurki=[];
zawartosc_chmurek=[];
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var Walenty = new __Walenty();

function __podloze_ziemia() {
__instance_init__(this, podloze_ziemia, null, 1, 0, mikro_sprite, 1, 1);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, girl_american);
if(this.other != null) {
y+=2;
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var podloze_ziemia = new __podloze_ziemia();

function __podloze_trawa() {
__instance_init__(this, podloze_trawa, null, 1, 0, sprite_384, 1, 5);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, girl_american);
if(this.other != null) {
y+=2;
}
this.other = this.place_meeting(this.x, this.y, podloze_ziemia);
if(this.other != null) {
y++;
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var podloze_trawa = new __podloze_trawa();

function __bonus() {
__instance_init__(this, bonus, null, 1, 0, sprite_469, 1, 70);
this.on_creation = function() {
with(this) {
image_speed = 0; // zatrzymuje animację obrazka

odliczanie=0;
kolysanie=0;

image_index = irandom(18)-1; // Math.floor(Math.random()*18);

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

	
	//image_alpha=Math.sin(odliczanie/90*Math.PI)*0.25+0.75 ;
	
	y=ystart+Math.sin((xstart+ystart+odliczanie)/90*Math.PI)*10; 
	
	
	
/*
odliczanie++;
	if (odliczanie>20)
	{
		odliczanie=0;
		kolysanie++;
	}

if (kolysanie<3)
{
	y--;
}

if  ((kolysanie>6) && (kolysanie<10))
{
	y++;
}

if (kolysanie>13)
{
	kolysanie=0;
}

*/
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
if (image_index==5)
{
	dodajZycie(1);
}
else
{
	doliczPunkty(3);
	if (image_index<5)
	{
		bity-=(6-image_index);
		if (bity<0) bity=0;
	}
}

instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var bonus = new __bonus();

function __obj_drzwi() {
__instance_init__(this, obj_drzwi, null, 1, 0, drzwi, 1, 85);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (y<ystart+180)
{
	y+=4;
	depth++;
	//depthstart;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_drzwi = new __obj_drzwi();

function __podloze_skos_lewy() {
__instance_init__(this, podloze_skos_lewy, null, 1, 0, sprite_560, 1, 110);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var podloze_skos_lewy = new __podloze_skos_lewy();

function __podloze_skos_prawy() {
__instance_init__(this, podloze_skos_prawy, null, 1, 0, sprite_563, 1, 112);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var podloze_skos_prawy = new __podloze_skos_prawy();

function __chmura() {
__instance_init__(this, chmura, null, 1, 0, sprite_637, 1, 132);
this.on_creation = function() {
with(this) {
direction=180;
speed=0.25;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (x < -250 ) x = room_width + 250;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var chmura = new __chmura();

function __na_zakupach() {
__instance_init__(this, na_zakupach, null, 1, 0, sprite_650, 1, 138);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}

if (co_ma[co_wymagane]==0)
{
	if (odliczanie % 10 <5)
	{
		image_angle++;
	}
	else
	{
		image_angle--;
	}

	przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
	x=xstart+przes;
	mysl.x=mysl.xstart+przes;
	pier.x=pier.xstart+przes;
}
else if (co_ma[co_wymagane]==1)
{
	
	przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
	y=ystart+przes;
	mysl.y=mysl.ystart+2*przes;
	pier.y=pier.ystart+2*przes;
}
else
{
	if (gra_wstepna>18)
	{
		image_angle=-90;
		
		przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
		x=xstart+przes+35;
		y=ystart+przes+10;
	
	
	}
}

	

}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {

if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,y - 180 ,obj_drzwi);
}

}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;

}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var na_zakupach = new __na_zakupach();

function __chmurka_myslenia() {
__instance_init__(this, chmurka_myslenia, null, 1, 0, sprite_1188, 1, 347);
this.on_creation = function() {
with(this) {
pier = instance_create(x+15,y +5 ,co_moze_miec[co_wymagane][0]);
pier.image_alpha=0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var chmurka_myslenia = new __chmurka_myslenia();

function __pierscien_do_wziecia() {
__instance_init__(this, pierscien_do_wziecia, null, 1, 0, sprite_1196, 1, 350);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['pierścień']=1;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pierscien_do_wziecia = new __pierscien_do_wziecia();

function __pierscien_pomyslany() {
__instance_init__(this, pierscien_pomyslany, null, 1, 0, sprite_1196, 0, 351);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pierscien_pomyslany = new __pierscien_pomyslany();

function __but_do_wziecia() {
__instance_init__(this, but_do_wziecia, null, 1, 0, sprite_1216, 1, 354);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['but']=1;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var but_do_wziecia = new __but_do_wziecia();

function __but_pomyslany() {
__instance_init__(this, but_pomyslany, null, 1, 0, sprite_1216, 0, 355);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var but_pomyslany = new __but_pomyslany();

function __cenzura() {
__instance_init__(this, cenzura, null, 1, 0, sprite_1224, 0, 356);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var cenzura = new __cenzura();

function __wrog1() {
__instance_init__(this, wrog1, null, 1, 0, sprite_1228, 1, 357);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=4;
this.kier=-2;
}
};
this.on_destroy = function() {
with(this) {
expl = instance_create(x+irandom(5)-3,y +irandom(5)-3 ,explozja);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		)
		{
			if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				)
				{
					// zmiana kierunku
					this.kier=-this.kier;
				}
				
			x+=this.kier;
			if (kier<0)
			{
				image_index=4+(x/8+y/8) % 4;
			}
			else
			{
				image_index=8+(x/8+y/8) % 4;
			}
		}
		else
		{
			image_index=0;
			y+=4;
		}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {

instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var wrog1 = new __wrog1();

function __wrog2() {
__instance_init__(this, wrog2, null, 1, 0, sprite_1229, 1, 358);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=4;
this.kier=-1.5;
this.odlicz=100;
}
};
this.on_destroy = function() {
with(this) {
expl = instance_create(x+irandom(5)-3,y +irandom(5)-3 ,explozja);
doliczPunkty(16);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		)
		{
			if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				)
				{
					// zmiana kierunku
					this.kier=-this.kier;
				}
				
			x+=this.kier;
			if (kier<0)
			{
				image_index=4+(x/8+y/8) % 4;
				direction = 180;
			}
			else
			{
				image_index=8+(x/8+y/8) % 4;
				direction = 0;
			}
		}
		else
		{
			image_index=0;
			y+=4;
		}
		
		
		this.odlicz--;
		if (this.odlicz<0)
		{
			if (abs(x-x_gracza)<220)
			{
				this.odlicz=40;				
				kula = instance_create(x,y +15,kula_wroga);
				kula.direction = direction;
				kula.speed = 15;
			}
		}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var wrog2 = new __wrog2();

function __explozja() {
__instance_init__(this, explozja, null, 1, 0, sprite_1240, 1, 360);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = function() {
if(this.image_index >= this.image_number - 1) {
with(this) {
instance_destroy();
}
}
};
this.on_draw = on_draw_i;
}; var explozja = new __explozja();

function __kula_wroga() {
__instance_init__(this, kula_wroga, null, 1, 0, sprite_1322, 1, 395);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < 0 || x > room_width) instance_destroy();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kula_wroga = new __kula_wroga();

function __Niemka() {
__instance_init__(this, Niemka, null, 1, 0, sprite_1399, 1, 464);
this.on_creation = function() {
with(this) {
image_speed=0;
this.tut_raz=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}

if ( keyboard_check(vk_a) )  {
if (this.tut_raz==0)
	{
		var tut_div = document.getElementById('tut');
		tut_div.innerHTML=' Wrong Way! <br> Use [D] and go right, not left!';
	}
}

if ( keyboard_check(vk_d) )  {
if (this.tut_raz==0)
	{
		var tut_div = document.getElementById('tut');
		tut_div.innerHTML=' [A] left [D] right [W] jump';
		this.tut_raz=1;
	}
}

if (co_ma[co_wymagane]==0)
{
/*
	if (odliczanie % 10 <5)
	{
		image_angle++;
	}
	else
	{
		image_angle--;
	}
*/
	przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
	x=xstart+przes;
	mysl.x=mysl.xstart+przes;
	pier.x=pier.xstart+przes;
}
else if (co_ma[co_wymagane]==1)
{
	
	przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
	y=ystart+przes;
	mysl.y=mysl.ystart+2*przes;
	pier.y=pier.ystart+2*przes;
}
else
{
	if (gra_wstepna>18)
	{
		image_angle=-90;
		
		przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
		x=xstart+przes+35;
		y=ystart+przes+10;
	
	
	}
}

	

}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
if (co_ma[co_wymagane]==0)
{
	
	pier.image_alpha=1;
	mysl.image_alpha=1;
	
	var tut_div = document.getElementById('tut');
	tut_div.innerHTML=' Go for flower. ';

}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,y - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;

}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var Niemka = new __Niemka();

function __tasma_lewo() {
__instance_init__(this, tasma_lewo, null, 1, 0, sprite_2025, 1, 589);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=1;
this.przesow=10;
this.meta_przesow=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.przesow--;
if (this.przesow<0)
{
	this.przesow=15;
	image_index++;
	this.meta_przesow++;
	if (this.meta_przesow>11) this.meta_przesow=0;
	
	
	
	if (image_index>3)
	{
		image_index=1;
	}
	
	if ((Math.floor(x/20)+this.meta_przesow) % 12==1)
	{
		image_index=4;
	}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var tasma_lewo = new __tasma_lewo();

function __tasma_prawo() {
__instance_init__(this, tasma_prawo, null, 1, 0, sprite_2025, 1, 595);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=1;
this.przesow=10;
this.meta_przesow=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.przesow--;
if (this.przesow<0)
{
	this.przesow=15;
	
	if (image_index>1)
	{
		image_index--;
	}
	else
	{
		image_index=3;
	}

	this.meta_przesow++;
	if (this.meta_przesow>11) this.meta_przesow=0;
	
	if ((Math.floor(x/20)-this.meta_przesow) % 12==1)
	{
		image_index=4;
	}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var tasma_prawo = new __tasma_prawo();

function __tasma_skraj() {
__instance_init__(this, tasma_skraj, null, 1, 0, sprite_2025, 1, 596);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var tasma_skraj = new __tasma_skraj();

function __tasma_skraj_prawy() {
__instance_init__(this, tasma_skraj_prawy, null, 1, 0, sprite_2025, 1, 604);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
image_xscale=-1;
x+=20;

}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var tasma_skraj_prawy = new __tasma_skraj_prawy();

function __egipska_krolewna() {
__instance_init__(this, egipska_krolewna, null, 1, 0, sprite_2067, 1, 619);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var egipska_krolewna = new __egipska_krolewna();

function __kot_pomyslany() {
__instance_init__(this, kot_pomyslany, null, 1, 0, sprite_2078, 0, 620);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=13;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kot_pomyslany = new __kot_pomyslany();

function __kot_do_wziecia() {
__instance_init__(this, kot_do_wziecia, null, 1, 0, sprite_2078, 1, 621);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=13;
this.opoznienie=10;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.opoznienie--;

if (this.opoznienie<0)
{
this.opoznienie=10;
	image_index++;
	if (image_index<15)
	{
		x-=2;
	}
	else if (image_index==15)
	{
		image_index=24;
	}
	else if ((image_index>23) && (image_index<27))
	{
		
		x+=2;
	}
	else
	{
		image_index=12;
	}
	
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['kot']=1;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kot_do_wziecia = new __kot_do_wziecia();

function __serduszko() {
__instance_init__(this, serduszko, null, 1, 0, sprite_469, 1, 623);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=5;

image_xscale=0.5;
image_yscale=0.5;
this.odliczanie=15;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

this.odliczanie--;
if (this.odliczanie<0)
{
	image_alpha-=0.1;
	image_xscale+=0.1;
	image_yscale+=0.1;
	if (image_alpha<0.5)
	{
		instance_destroy();
	}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var serduszko = new __serduszko();

function __klocek() {
__instance_init__(this, klocek, null, 1, 0, sprite_2093, 1, 624);
this.on_creation = function() {
with(this) {
this.air = 0;

}
};
this.on_destroy = function() {
with(this) {
for (i=0;i<10;i++)
{
	instance_create(x,y,kawalek);
}
}
};
this.on_step = function() {
with(this) {
if (y>ystart)
{

	if  (( place_meeting(x, y, podloze_ziemia) != null)
		|| ( place_meeting(x, y, podloze_trawa) != null)
		|| ( place_meeting(x, y, tasma_prawo) != null)
		|| ( place_meeting(x, y, tasma_lewo) != null)
		|| ( place_meeting(x, y, klocek_ciemny) != null)
		)
		{
			instance_destroy();
		}
		else
		{
			air++;
			y+=air;
		}
}
else
{
	if  (( place_meeting(x, y, podloze_ziemia) != null)
		|| ( place_meeting(x, y, podloze_trawa) != null) )
		{
			y+=4;
		}
}


if (y>470)
{
	instance_destroy();
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var klocek = new __klocek();

function __klocek_ciemny() {
__instance_init__(this, klocek_ciemny, null, 1, 0, sprite_2094, 1, 625);
this.on_creation = on_creation_i;
this.on_destroy = function() {
with(this) {
for (i=0;i<10;i++)
{
	instance_create(x,y,kawalek);
}
}
};
this.on_step = function() {
with(this) {
if (y>ystart)
{
	y--;
}

if (y>470)
{
	instance_destroy();
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var klocek_ciemny = new __klocek_ciemny();

function __kawalek() {
__instance_init__(this, kawalek, null, 1, 0, sprite_2106, 1, 631);
this.on_creation = function() {
with(this) {
speed = irandom(2) + 2;
direction = irandom(360);
this.air = 0;
image_angle = direction;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
air++;
y+=air;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kawalek = new __kawalek();

function __kladka() {
__instance_init__(this, kladka, null, 1, 0, kladka_sprite, 1, 648);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
y-=2;
if (ystart>y+200)
{
	y=ystart;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kladka = new __kladka();

function __HUD() {
__instance_init__(this, HUD, null, 1, 0, null, 1, 664);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
x=room_viewport_x+50;
y=20;

if ( mouse_check_released() )
{

	if  ((mouse_x>370) && (mouse_y<38)  && (mouse_x<400) )
	{
		dzwieki_on_bool=!dzwieki_on_bool;
	}
	
	if ((mouse_x>420) && (mouse_y<38)  && (mouse_x<450) )
	{
		muzyka_on_bool=!muzyka_on_bool;
	}

	if ((mouse_x>560) && (mouse_y<38)  && (mouse_x<600) )
	{
		global.game_paused=!global.game_paused;
	}
	
	if ((mouse_x>600) && (mouse_y<38)  && (mouse_x<640) )
	{
		punkty=global.poczatkowe_punkty;
		room_restart();
	}
	
}


}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {

draw_set_font(F_Arial);
draw_text(x+35 , y , punkty);
draw_text(x+130 , y , zycia);
draw_text(x+200 , y , (10-bity)*10+'%');



if (global.friendzoned)
{
	draw_text(x+200 , y+150 , "FRIENDZONED!");
}


if (global.game_paused)
{
	draw_text(x+300 , y+200 , "PAUSED");
}

draw_sprite(sprite_469,5,x+80,y-20 );
draw_sprite(sprite_469,7,x+0,y-25 );
draw_sprite(sprite_469,0,x+160,y-22 );

//dzwieki_off_sprite
if (dzwieki_on_bool)
{
	draw_sprite(dzwieki_on_sprite,0,x+320,y-10);
}
else
{
	draw_sprite(dzwieki_off_sprite,0,x+320,y-10);
}


//dzwieki_off_sprite
if (muzyka_on_bool)
{
	draw_sprite(muzyka_on_sprite,0,x+370,y-10);
}
else
{
	draw_sprite(muzyka_off_sprite,0,x+370,y-10);
}


przes_obr=0;

for (var przedmiot in co_ma)
{
		if (co_ma[przedmiot]>0)
		{
			draw_sprite(co_moze_miec[przedmiot][2],0,x+240+przes_obr,y-15 );
			przes_obr+=32;
		}
}

if (moze_latac)
{
	draw_sprite(skrzydla_sprite,0,x+440,y-15);
}

draw_sprite(sprite_pause,0,x+520,y-20);


}
}
};
}; var HUD = new __HUD();

function __filizanka_do_wziecia() {
__instance_init__(this, filizanka_do_wziecia, null, 1, 0, sprite_2214, 1, 666);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['filizanka']=1;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var filizanka_do_wziecia = new __filizanka_do_wziecia();

function __filizanka_pomyslana() {
__instance_init__(this, filizanka_pomyslana, null, 1, 0, sprite_2214, 1, 667);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var filizanka_pomyslana = new __filizanka_pomyslana();

function __zlozona_dziewczyna() {
__instance_init__(this, zlozona_dziewczyna, null, 1, 0, sprite_1400, 1, 669);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
this.ident=-1;
this.jestem_juz=1;
this.sledz_gracza=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (this.jestem_juz==1)
{
	this.ident=ile_chmurek;
	chmurki[this.ident]= instance_create(x+15,y - 55 ,chmurka_myslenia_dup);
	chmurki[this.ident].image_alpha=0;
	this.jestem_juz=2;
	ile_chmurek++;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				

if (this.ident>=0)
				{
			if (co_ma[co_wymagane[this.ident]]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				
				
				chmurki[this.ident].x=x+15;
				chmurki[this.ident].y=y - 55;
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
				
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane[this.ident]]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;

				chmurki[this.ident].x=x+15;
				chmurki[this.ident].y=y - 55;
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
				
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					//x=this.xss+przes+35;
					//y=this.yss+przes+10;
					x=x_gracza+przes*(1+this.ident);
					y=y_gracza+przes*(3-this.ident);
				
				
				}
			}
		}
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane[this.ident]]<1) y+=6;
		}
	
if (this.sledz_gracza>0)
{
	if (x<x_gracza) x+=3;
	if (x>x_gracza) x-=3;
	
	if (y<y_gracza) y+=3;
	if (y>y_gracza) y-=3;
}

if (y>500)
{
y=-50;
}
}
};
this.on_end_step = function() {
with(this) {
if (liczba_spelnionych==3)
{
	liczba_spelnionych=0;
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}

}
};
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
if (this.ident>=0)
				{
					chmurki[this.ident].x=x+15;
					chmurki[this.ident].y=y - 55;
					zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
					zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;


					if (co_ma[co_wymagane[this.ident]]==0)
					{
						zawartosc_chmurek[this.ident].image_alpha=1;
						chmurki[this.ident].image_alpha=1;
					}
					else if (co_ma[co_wymagane[this.ident]]==1)
					{
						co_ma[co_wymagane[this.ident]]=-1;
						zawartosc_chmurek[this.ident].image_alpha=0;
						chmurki[this.ident].image_alpha=0;
						
						liczba_spelnionych++;
						this.sledz_gracza=1;
						//loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
					}
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
				}


}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var zlozona_dziewczyna = new __zlozona_dziewczyna();

function __chmurka_myslenia_dup() {
__instance_init__(this, chmurka_myslenia_dup, null, 1, 0, sprite_1188, 1, 670);
this.on_creation = function() {
with(this) {

zawartosc_chmurek[ile_chmurek] = instance_create(x+15,y +5 ,co_moze_miec[co_wymagane[ile_chmurek]][0]);
zawartosc_chmurek[ile_chmurek].image_alpha=0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var chmurka_myslenia_dup = new __chmurka_myslenia_dup();

function __zlozona_dziewczyna_or() {
__instance_init__(this, zlozona_dziewczyna_or, null, 1, 0, sprite_1400, 1, 673);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
this.ident=-1;
this.jestem_juz=1;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (this.jestem_juz==1)
{
	this.ident=ile_chmurek;
	chmurki[this.ident]= instance_create(x+15,y - 55 ,chmurka_myslenia_dup);
	chmurki[this.ident].image_alpha=0;
	this.jestem_juz=2;
	ile_chmurek++;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				

if (this.ident>=0)
				{
			if (co_ma[co_wymagane[this.ident]]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				
				
				chmurki[this.ident].x=x+15;
				chmurki[this.ident].y=y - 55;
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
				
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane[this.ident]]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;

				chmurki[this.ident].x=x+15;
				chmurki[this.ident].y=y - 55;
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
				
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
		}
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane[this.ident]]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
if (this.ident>=0)
				{
					chmurki[this.ident].x=x+15;
					chmurki[this.ident].y=y - 55;
					zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
					zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;


					if (co_ma[co_wymagane[this.ident]]==0)
					{
						zawartosc_chmurek[this.ident].image_alpha=1;
						chmurki[this.ident].image_alpha=1;
					}
					else if (co_ma[co_wymagane[this.ident]]==1)
					{
						co_ma[co_wymagane[this.ident]]=2;
						zawartosc_chmurek[this.ident].image_alpha=0;
						chmurki[this.ident].image_alpha=0;
						
						
						
						loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
				zawartosc_chmurek[this.ident].x=chmurki[this.ident].x+15;
				zawartosc_chmurek[this.ident].y=chmurki[this.ident].y +5;
				}


}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var zlozona_dziewczyna_or = new __zlozona_dziewczyna_or();

function __serce_tile() {
__instance_init__(this, serce_tile, null, 1, 0, sprite_469, 1, 674);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=5;

image_xscale=0.5;
image_yscale=0.5;

this.odliczanie=150;

this.szybkosc=irandom(3)+1;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
y-=this.szybkosc;
x+=sin(y/100)*2;

if (y<-30) {
	y+=500;
}

if (x<0)
{
	x+=640;
}

if (x>650)
{
	x-=640;
}

this.odliczanie-=this.szybkosc;
if (this.odliczanie>0)
{
	image_xscale+=1.5/150;
	image_yscale+=1.5/150;
}
else if (this.odliczanie>-149)
{
	image_xscale-=1.5/150;
	image_yscale-=1.5/150;
	
	if (image_xscale<0)
	{
		image_xscale=0.5;
		image_yscale=0.5;
	}
}
else
{
	this.odliczanie=150;
}

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var serce_tile = new __serce_tile();

function __girl_tile() {
__instance_init__(this, girl_tile, null, 1, 0, sprite_etipoka, 1, 687);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=4;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

image_index=4+(Math.floor(x/4) % 4);
x--;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var girl_tile = new __girl_tile();

function __logo_grastry() {
__instance_init__(this, logo_grastry, null, 1, 0, grastra_logo, 1, 689);
this.on_creation = function() {
with(this) {

image_xscale=0;
image_yscale=1;

this.start_x=x;
this.odliczanie=0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

this.odliczanie+=0.05;


xsin=sin(this.odliczanie);

image_xscale=xsin;
x=this.start_x-xsin*64;


}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var logo_grastry = new __logo_grastry();

function __girl_napis() {
__instance_init__(this, girl_napis, null, 1, 0, napis_girl, 1, 690);
this.on_creation = function() {
with(this) {
image_xscale=0.1;
image_yscale=0.1;

this.start_x=x;
this.odliczanie=0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.odliczanie++;
if (this.odliczanie<10)
{
	y+=this.odliczanie;
	image_xscale+=0.1;
	image_yscale+=0.1;
	x-=image_xscale*64;
	
	
	e_game = document.getElementById('nazwa_poziomu');
	//e_game.setAttribute('style','position: absolute; top: '+30+15*this_odliczanie+'px; left: 20px; background-color: red; padding: 5px; font-size: 25px; color: pink; text-align: center;');
	
	//e_game.style.position = "absolute";
	//e_game.style.left = x_pos;
	//e_game.style.top=30+15*this.odliczanie;
	//e_game.style.top = 30+15*this_odliczanie;
	e_game.innerHTML = '* '+poziomu_nazwa+' *';

	e_next = document.getElementById('next_poziom');
	
	e_next.style.left=400-39*this.odliczanie;
	e_next.innerHTML = 'Level: '+poziomu_nr+'';
	
}

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = function() {
with(this) {
var t_game = document.getElementById('tululoogame');

var e_game = document.getElementById('nazwa_poziomu');

var e_next = document.getElementById('next_poziom');
// jeśli obiekt punkty nie istnieje:

if (e_game===null)
{
	var nazwa_poziomu_div = document.createElement('div');
	divIdName = 'nazwa_poziomu';

	nazwa_poziomu_div.setAttribute('id',divIdName);
	nazwa_poziomu_div.setAttribute('name',divIdName);
	nazwa_poziomu_div.setAttribute('style','position: absolute; top: 134px; left: 20px; background-color: red; padding: 5px; font-size: 25px; color: pink; text-align: center;');

	nazwa_poziomu_div.innerHTML = '* '+poziomu_nazwa+' *';

	t_game.appendChild(nazwa_poziomu_div);
	
	
	var next_poziomu_div = document.createElement('div');
	divIdName = 'next_poziom';

	next_poziomu_div.setAttribute('id',divIdName);
	next_poziomu_div.setAttribute('name',divIdName);
	next_poziomu_div.setAttribute('style','position: absolute; top: 30px; left: 20px; background-color: red; padding: 5px; font-size: 48px; color: pink; text-align: center;');

	next_poziomu_div.innerHTML = ' Level: '+poziomu_nr;

	t_game.appendChild(next_poziomu_div);
	
	next_poziomu_div.addEventListener("click",room_goto_next,false);
	nazwa_poziomu_div.addEventListener("click",room_goto_next,false);
	
}

}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var girl_napis = new __girl_napis();

function __girl_american() {
__instance_init__(this, girl_american, null, 1, 0, american_girl, 1, 698);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}

if (co_ma[co_wymagane]==0)
{
/*
	if (odliczanie % 10 <5)
	{
		image_angle++;
	}
	else
	{
		image_angle--;
	}

	przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
	x=xstart+przes;
	mysl.x=mysl.xstart+przes;
	pier.x=pier.xstart+przes;
*/
}
else if (co_ma[co_wymagane]==1)
{
	przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
	y=ystart+przes;
	mysl.y=mysl.ystart+2*przes;
	pier.y=pier.ystart+2*przes;
}
else
{
	if (gra_wstepna>18)
	{
		image_angle=-90;
		
		przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*2;
		x=xstart+przes+75;
		y=ystart+przes+10;
	}
}

}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,y - 140 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var girl_american = new __girl_american();

function __dzwieki_wlaczone() {
__instance_init__(this, dzwieki_wlaczone, null, 1, 0, dzwieki_on_sprite, 1, 725);
this.on_creation = function() {
with(this) {
dzwieki_on_bool=true;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( mouse_check_pressed() && position_meeting(mouse_x,mouse_y,this) ){
        //do stuff
		// alert('wyłączam dźwięk');
		// dzwieki_on_bool=!dzwieki_on_bool;
		dzwieki_on_bool=false;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var dzwieki_wlaczone = new __dzwieki_wlaczone();

function __kwiatek_do_wziecia() {
__instance_init__(this, kwiatek_do_wziecia, null, 1, 0, kwiatek, 1, 787);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['kwiat']=1;
var tut_div = document.getElementById('tut');
if (tut_div) {
	tut_div.innerHTML=' Back to girl with flower. ';
}

instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kwiatek_do_wziecia = new __kwiatek_do_wziecia();

function __kwiatek_pomyslany() {
__instance_init__(this, kwiatek_pomyslany, null, 1, 0, kwiatek, 1, 788);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kwiatek_pomyslany = new __kwiatek_pomyslany();

function __burger_do_wziecia() {
__instance_init__(this, burger_do_wziecia, null, 1, 0, burger, 1, 789);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['burg']=1;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var burger_do_wziecia = new __burger_do_wziecia();

function __burger_pomyslany() {
__instance_init__(this, burger_pomyslany, null, 1, 0, burger, 1, 790);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var burger_pomyslany = new __burger_pomyslany();

function __wrogAniol() {
__instance_init__(this, wrogAniol, null, 1, 0, sprite_2181, 1, 904);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=4;
this.kier=-3;
this.odlicz=100;
}
};
this.on_destroy = function() {
with(this) {
expl = instance_create(x+irandom(5)-3,y +irandom(5)-3 ,explozja);
doliczPunkty(128);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

			if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				)
				{
					// zmiana kierunku
					this.kier=-this.kier;
				}
				
			x+=this.kier;
			y+=sin(x/30)*2;
			
			if (x<10) {
				this.kier=abs(this.kier);
			}
			
			if (x>1640) {
				this.kier=-abs(this.kier);
			}
			
			if (this.kier<0)
			{
				image_index=4+(x/8+y/8) % 4;
				direction = 180;
			}
			else
			{
				image_index=8+(x/8+y/8) % 4;
				direction = 0;
			}
		
		
		
		this.odlicz--;
		if (this.odlicz<0)
		{
			if (abs(x-x_gracza)<220)
			{
				this.odlicz=20;				
				kula = instance_create(x,y +15,kula_wroga);
				kula.direction = direction;
				kula.speed = 15;
			}
		}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var wrogAniol = new __wrogAniol();

function __niewidzialny_obiekt() {
__instance_init__(this, niewidzialny_obiekt, null, 1, 0, null, 1, 933);
this.on_creation = function() {
with(this) {
this.wz = 0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if  ( (abs(x_gracza-x)<16) && (abs(y_gracza-y+30)<16) )
{
	//alert(x_gracza+' '+x+' '+y_gracza+' '+y);
	
	if (this.wz % 2 == 0)
	{
		this.wz++;
		if (this.wz<4)
		{
			var tut_div = document.getElementById('tut');
			tut_div.innerHTML=' You are cheater!<br > Your terrible behavior will be raported!';
		}
		
		if (this.wz<36) {
			bon = instance_create(x+200,y -25,bonus);
		}
		
		dzwieki_tylko_etapu=false;

		if  ( (this.wz>32) && (this.wz<34) )
		{
			ron1 = instance_create(x+180,y-50,bonus);
			ron2 = instance_create(x+220,y-50,bonus);
			ron3 = instance_create(x+160,y-75,bonus);
			ron4 = instance_create(x+240,y-75,bonus);
			ron5 = instance_create(x+160,y-100,bonus);
			ron6 = instance_create(x+240,y-100,bonus);
			ron7 = instance_create(x+220,y-100,bonus);
			ron8 = instance_create(x+180,y-100,bonus);
		}

		
		if  (this.wz>40) 
		{
			ron1 = instance_create(x+180,y-50,klocek);
			ron2 = instance_create(x+220,y-50,klocek_ciemny);
			ron3 = instance_create(x+260,y-100,klocek);
			ron4 = instance_create(x+300,y-100,klocek);
			ron5 = instance_create(x+340,y-150,klocek_ciemny);
			ron6 = instance_create(x+380,y-200,klocek);
			ron7 = instance_create(x+420,y-220,klocek);
			ron8 = instance_create(x+500,y-180,skrzydla);
			instance_destroy();
		}
		
	}
	//instance_destroy();
}


if  ( (abs(x_gracza-x-200)<16) && (abs(y_gracza-y+30)<16) )
{
	//alert(x_gracza+' '+x+' '+y_gracza+' '+y);
	
	if (this.wz % 2 == 1)
	{
		
		this.wz++;
		
		if (this.wz>10)
		{
			if (this.wz<36) {
			bon = instance_create(x-6,y -25,bonus);
			}
		}
	}
	//instance_destroy();
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var niewidzialny_obiekt = new __niewidzialny_obiekt();

function __skrzydla() {
__instance_init__(this, skrzydla, null, 1, 0, skrzydla_sprite, 1, 943);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
y=ystart+Math.sin((xstart+ystart+odliczanie)/90*Math.PI)*10; 
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
moze_latac=true;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var skrzydla = new __skrzydla();

function __skrzydlo_obj() {
__instance_init__(this, skrzydlo_obj, null, 1, 0, skrzydlo_ludzika, 1, 1428);
this.on_creation = function() {
with(this) {
image_speed = 0;
image_index = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var skrzydlo_obj = new __skrzydlo_obj();

function __konggobj() {
__instance_init__(this, konggobj, null, 1, 0, kongg, 1, 1527);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var konggobj = new __konggobj();

function __kongbigobj() {
__instance_init__(this, kongbigobj, null, 1, 0, konggbig, 1, 1541);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kongbigobj = new __kongbigobj();

function __jablko_pomyslane() {
__instance_init__(this, jablko_pomyslane, null, 1, 0, sprite_jablko, 1, 1577);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var jablko_pomyslane = new __jablko_pomyslane();

function __jablko_do_wziecia() {
__instance_init__(this, jablko_do_wziecia, null, 1, 0, sprite_jablko, 1, 1578);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['jablko']=1;
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, ryuk);
if(this.other != null) {
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var jablko_do_wziecia = new __jablko_do_wziecia();

function __japonka() {
__instance_init__(this, japonka, null, 1, 0, sprite_japonka, 1, 1593);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var japonka = new __japonka();

function __bialorusinka2() {
__instance_init__(this, bialorusinka2, null, 1, 0, sprite_bialorus2, 1, 1594);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var bialorusinka2 = new __bialorusinka2();

function __kenijka() {
__instance_init__(this, kenijka, null, 1, 0, sprite_kenijka, 1, 1595);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kenijka = new __kenijka();

function __etiopka() {
__instance_init__(this, etiopka, null, 1, 0, sprite_etipoka, 1, 1596);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var etiopka = new __etiopka();

function __hinduska() {
__instance_init__(this, hinduska, null, 1, 0, sprite_hinduska, 1, 1597);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var hinduska = new __hinduska();

function __chinka() {
__instance_init__(this, chinka, null, 1, 0, sprite_chinka1, 1, 1598);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var chinka = new __chinka();

function __chinka3() {
__instance_init__(this, chinka3, null, 1, 0, sprite_chinka3, 1, 1599);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (jestem_juz==1)
{
	mysl = instance_create(x+15,y - 55 ,chmurka_myslenia);
	mysl.image_alpha=0;
	jestem_juz=2;
}



		

			if ( place_meeting(x, y+8, tasma_lewo) != null)
				{
					this.xss--;
				}
				
				if ( place_meeting(x, y+8, tasma_prawo) != null)
				{
					this.xss++;
				}
				


			if (co_ma[co_wymagane]==0)
			{
				if (odliczanie % 10 <5)
				{
					image_angle++;
				}
				else
				{
					image_angle--;
				}

				przes=Math.sin((xstart+ystart+odliczanie)/45*Math.PI)*10;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes>4)
				{	
					image_index=4+(Math.floor(x/4) % 4);
				}
				else if (przes<-4)
				{
					image_index=8+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=(Math.floor(x/4) % 4);
				}
			}
			else if (co_ma[co_wymagane]==1)
			{
				
				przes=Math.sin((xstart+ystart+odliczanie)/15*Math.PI)*10;
				y=this.yss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
			}
			else
			{
				if (gra_wstepna>18)
				{
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				
				
				}
			}
			
if  (( place_meeting(x, y+4, podloze_ziemia) != null)
		|| ( place_meeting(x, y+4, podloze_trawa) != null)
		|| ( place_meeting(x, y+4, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+4, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+4, tasma_lewo) != null)
		|| ( place_meeting(x, y+4, tasma_prawo) != null)
		)
		{
		}
		else
		{
			if (co_ma[co_wymagane]<1) y+=6;
		}
	
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
mysl.x=x+15;
mysl.y=y - 55;
pier.x=mysl.x+15;
pier.y=mysl.y +5;


if (co_ma[co_wymagane]==0)
{
	pier.image_alpha=1;
	mysl.image_alpha=1;
}
else if (co_ma[co_wymagane]==1)
{
	co_ma[co_wymagane]=2;
	pier.image_alpha=0;
	mysl.image_alpha=0;
	
	
	
	loze = instance_create(x-15,this.yss - 180 ,obj_drzwi);
}
}
}
};
this.on_roomstart = function() {
with(this) {
jestem_juz=1;
}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var chinka3 = new __chinka3();

function __ryuk() {
__instance_init__(this, ryuk, null, 1, 0, sprite_ryuk, 1, 1601);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
this.kier=-2;
this.odliczanie=100;
}
};
this.on_destroy = function() {
with(this) {
expl = instance_create(x+irandom(5)-3,y +irandom(5)-3 ,explozja);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if (this.odliczanie>0)
{
	this.odliczanie--;
	image_index=floor(odliczanie/10) % 4;
	y+=sin(this.odliczanie/5);
}
else
{
if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				|| (x<0)
				|| (x>room_width)
				)
				{
					// zmiana kierunku
					this.kier=-this.kier;
				}
				
		x+=this.kier;
			if (kier<0)
			{
				image_index=4+(x/8+y/8) % 4;
			}
			else
			{
				image_index=8+(x/8+y/8) % 4;
			}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {

instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ryuk = new __ryuk();

function __slon_pomyslany() {
__instance_init__(this, slon_pomyslany, null, 1, 0, sprite_slon_pomyslany, 1, 2151);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var slon_pomyslany = new __slon_pomyslany();

function __slon_do_wziecia_dup() {
__instance_init__(this, slon_do_wziecia_dup, null, 1, 0, sprite_slon, 1, 2152);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
co_ma['slon']=1;
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var slon_do_wziecia_dup = new __slon_do_wziecia_dup();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __EkranStartowy() { 
this.tiles = [
];
this.objects = [
[{o:serce_tile, x:300, y:420}],
[{o:serce_tile, x:260, y:340}],
[{o:serce_tile, x:360, y:340}],
[{o:serce_tile, x:420, y:300}],
[{o:serce_tile, x:180, y:300}],
[{o:serce_tile, x:140, y:220}],
[{o:serce_tile, x:160, y:140}],
[{o:serce_tile, x:240, y:100}],
[{o:serce_tile, x:300, y:140}],
[{o:serce_tile, x:380, y:100}],
[{o:serce_tile, x:460, y:140}],
[{o:serce_tile, x:480, y:220}],
[{o:girl_tile, x:608, y:432}],
[{o:dzwieki_wlaczone, x:600, y:20}]];
this.start = function() {
__room_start__(this, EkranStartowy, 640, 480, 30, 255, 128, 255, VALENTINE_TLO.image, 0, 0, 0, 640, 480, null, 50, 50);

//alert ("tload:"+tu_load_total +"=> tloading: "+ tu_loading);

czy_inicjowac();

function czy_inicjowac()
{
	if  ((typeof tu_loading == 'undefined') || (tu_loading===0)) {
		inicjalizacja();
	} else {
		t = setTimeout(function(){ czy_inicjowac() }, 1000);
	}
}

function inicjalizacja()
{
	dedykacja='';
	if (typeof kongregate != 'undefined')
	{
		
	}
	
	var t_game = document.getElementById('tululoogame');

	var p_game = document.getElementById('punkty');
	// jeśli obiekt punkty nie istnieje:

	if (p_game===null)
	{
		var start_div = document.createElement('div');
		var divIdName = 'start';
		start_div.setAttribute('id',divIdName);
		start_div.setAttribute('name',divIdName);
		start_div.setAttribute('style','position: absolute; top: 105px; left: 0px; width: 640px; background-color: transparent; font-size: 95px; color: black; text-align: center; text-shadow: 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #00ffff , 0 0 70px #00ffff , 0 0 80px #00ffff , 0 0 100px #00ffff ;');
		start_div.innerHTML = 'Start'+dedykacja;
		
		var tytul_div = document.createElement('div');
		var divIdName = 'tytul';
		tytul_div.setAttribute('id',divIdName);
		tytul_div.setAttribute('name',divIdName);
		tytul_div.setAttribute('style','position: absolute; top: 385px; left: 485px; background-color: transparent;');
		tytul_div.innerHTML = '<img src="imq/grastra1999.gif" alt="grastra logo" >';
		
		var punkty_div = document.createElement('div');
		divIdName = 'punkty';

		punkty_div.setAttribute('id',divIdName);
		punkty_div.setAttribute('name',divIdName);
		punkty_div.setAttribute('style','border: 2px solid; border-radius: 1em; position: absolute; top: 280px; left: 450px; background-color: blue; color: white; padding: 1.5em;');

		if (!((punkty>0) || (best_punkty>0)))
		{
			loadHighscore();
		}
		
		if  ((punkty>0) || (best_punkty>0))
		{
			
			
			if (best_punkty>0)
			{
				if (typeof kongregate != 'undefined')
				{
					kongregate.stats.submit("HighScore",best_punkty);
				}
			}
			else if (punkty>0)
			{
				if (typeof kongregate != 'undefined')
				{
					kongregate.stats.submit("HighScore",punkty);
				}
			}
			
			if (punkty>best_punkty)
			{
				best_punkty=punkty;
			}
			saveHighscore();
			punkty_div.innerHTML = 'Last Score:'+punkty+' <br>'+'Best Score:'+best_punkty;
		}
		else
		{
			punkty_div.innerHTML = 'No scores <br> recorded.';
		}
		punkty=0;
		zycia=3;
		
		t_game.appendChild(punkty_div);
		t_game.appendChild(tytul_div);
		t_game.appendChild(start_div);
		
		start_div.addEventListener("click",room_goto_next,false);
		
	}
}
};
}
var EkranStartowy = new __EkranStartowy();
tu_scenes.push(EkranStartowy);
function __Tlo_Tutorial1() { 
this.tiles = [
];
this.objects = [
[{o:girl_napis, x:420, y:200}]];
this.start = function() {
__room_start__(this, Tlo_Tutorial1, 640, 480, 30, 0, 0, 0, poziom_tlo.image, 0, 0, 0, 640, 480, null, 50, 50);

poziomu_nazwa='TUTORIAL';
poziomu_nr=1;
};
}
var Tlo_Tutorial1 = new __Tlo_Tutorial1();
tu_scenes.push(Tlo_Tutorial1);
function __tutorial() { 
this.tiles = [
[1000000,
[background_1190,
[32,192,32,32,0,320],
[32,192,32,32,32,320],
[32,192,32,32,64,320],
[32,192,32,32,96,320],
[32,192,32,32,128,320],
[32,192,32,32,160,320],
[32,192,32,32,192,320],
[32,192,32,32,224,320],
[32,192,32,32,256,320],
[32,192,32,32,288,320],
[32,192,32,32,320,320],
[32,192,32,32,352,320],
[32,192,32,32,384,320],
[32,192,32,32,416,320],
[32,192,32,32,448,320],
[32,192,32,32,480,320],
[32,192,32,32,512,320],
[32,192,32,32,544,320],
[32,192,32,32,576,320],
[32,192,32,32,608,320],
[0,64,32,32,0,352],
[0,64,32,32,32,352],
[0,64,32,32,64,352],
[0,64,32,32,96,352],
[0,320,32,32,128,352],
[0,320,32,32,160,352],
[0,320,32,32,192,352],
[0,320,32,32,224,352],
[0,320,32,32,256,352],
[0,320,32,32,288,352],
[0,320,32,32,320,352],
[0,320,32,32,352,352],
[0,320,32,32,384,352],
[0,320,32,32,416,352],
[0,320,32,32,448,352],
[0,320,32,32,480,352],
[0,320,32,32,512,352],
[0,320,32,32,544,352],
[0,320,32,32,576,352],
[0,320,32,32,608,352],
[32,192,32,32,640,320],
[32,192,32,32,672,320],
[32,192,32,32,704,320],
[32,192,32,32,736,320],
[32,192,32,32,768,320],
[32,192,32,32,800,320],
[32,192,32,32,832,320],
[0,320,32,32,640,352],
[0,320,32,32,672,352],
[0,320,32,32,704,352],
[0,320,32,32,736,352],
[0,320,32,32,768,352],
[0,320,32,32,800,352],
[0,320,32,32,832,352],
[32,416,32,32,864,320],
[32,96,32,32,864,352],
[128,320,32,32,992,320],
[128,320,32,32,1024,320],
[128,320,32,32,1040,320],
[128,320,32,32,1072,320],
[128,320,32,32,1104,320],
[128,320,32,32,992,352],
[128,320,32,32,1024,352],
[128,320,32,32,1056,352],
[128,320,32,32,1088,352],
[128,320,32,32,1104,352],
[0,320,32,32,960,320],
[0,320,32,32,960,352],
[0,320,32,32,1136,320],
[0,320,32,32,1136,352],
[32,192,32,32,1344,320],
[32,192,32,32,1360,352],
[32,192,32,32,1376,320],
[32,192,32,32,1408,320],
[32,192,32,32,1440,320],
[32,192,32,32,1472,320],
[32,192,32,32,1504,320],
[32,192,32,32,1536,320],
[32,192,32,32,1568,320],
[32,192,32,32,1616,320],
[32,192,32,32,1600,320],
[32,192,32,32,1648,320],
[32,192,32,32,1632,352],
[32,192,32,32,1600,352],
[32,192,32,32,1568,352],
[32,192,32,32,1536,352],
[32,192,32,32,1504,352],
[32,192,32,32,1472,352],
[32,192,32,32,1440,352],
[32,192,32,32,1408,352],
[32,192,32,32,1392,352],
[0,320,32,32,1328,352],
[0,320,32,32,1328,320],
[448,192,32,32,144,272],
[256,448,32,32,1632,240],
[480,384,32,32,1632,256],
[480,384,32,32,1632,272]],
[background_3,
[64,32,16,16,272,272],
[112,32,16,16,288,272],
[192,96,16,16,0,400],
[192,96,16,16,16,400],
[192,96,16,16,32,400],
[192,96,16,16,48,400],
[192,96,16,16,64,400],
[192,96,16,16,80,400],
[192,96,16,16,96,400],
[192,96,16,16,112,400],
[192,96,16,16,128,400],
[192,96,16,16,144,400],
[192,96,16,16,144,416],
[192,96,16,16,144,432],
[192,96,16,16,144,448],
[192,96,16,16,144,464],
[192,96,16,16,240,464],
[192,96,16,16,240,448],
[192,96,16,16,240,432],
[192,96,16,16,240,416],
[192,96,16,16,240,400],
[192,96,16,16,256,400],
[192,96,16,16,272,400],
[192,96,16,16,288,400],
[192,96,16,16,304,400],
[192,96,16,16,320,400],
[192,96,16,16,336,400],
[192,96,16,16,336,432],
[192,96,16,16,336,416],
[192,96,16,16,336,448],
[192,96,16,16,336,464]]]];
this.objects = [
[{o:podloze_trawa, x:0, y:288}],
[{o:podloze_trawa, x:32, y:288}],
[{o:podloze_trawa, x:64, y:288}],
[{o:podloze_trawa, x:96, y:288}],
[{o:podloze_trawa, x:128, y:288}],
[{o:podloze_trawa, x:160, y:288}],
[{o:podloze_trawa, x:192, y:288}],
[{o:podloze_trawa, x:224, y:288}],
[{o:podloze_trawa, x:256, y:288}],
[{o:podloze_trawa, x:288, y:288}],
[{o:podloze_trawa, x:320, y:288}],
[{o:podloze_trawa, x:352, y:288}],
[{o:podloze_trawa, x:384, y:288}],
[{o:podloze_trawa, x:416, y:288}],
[{o:podloze_trawa, x:448, y:288}],
[{o:podloze_trawa, x:480, y:288}],
[{o:podloze_trawa, x:512, y:288}],
[{o:podloze_trawa, x:544, y:288}],
[{o:podloze_trawa, x:576, y:288}],
[{o:podloze_trawa, x:608, y:288}],
[{o:podloze_trawa, x:640, y:288}],
[{o:podloze_trawa, x:672, y:288}],
[{o:podloze_trawa, x:704, y:288}],
[{o:podloze_trawa, x:736, y:288}],
[{o:podloze_trawa, x:768, y:288}],
[{o:podloze_trawa, x:800, y:288}],
[{o:podloze_trawa, x:832, y:288}],
[{o:podloze_ziemia, x:864, y:288}],
[{o:podloze_ziemia, x:864, y:304}],
[{o:podloze_ziemia, x:880, y:304}],
[{o:podloze_skos_prawy, x:880, y:288}],
[{o:podloze_skos_lewy, x:960, y:288}],
[{o:podloze_ziemia, x:960, y:304}],
[{o:podloze_ziemia, x:976, y:304}],
[{o:podloze_ziemia, x:976, y:288}],
[{o:podloze_trawa, x:992, y:288}],
[{o:podloze_trawa, x:1024, y:288}],
[{o:podloze_trawa, x:1056, y:288}],
[{o:podloze_trawa, x:1088, y:288}],
[{o:podloze_trawa, x:1120, y:288}],
[{o:podloze_ziemia, x:1152, y:288}],
[{o:podloze_ziemia, x:1152, y:304}],
[{o:klocek_ciemny, x:1168, y:288}],
[{o:klocek_ciemny, x:1200, y:288}],
[{o:klocek_ciemny, x:1232, y:288}],
[{o:klocek_ciemny, x:1264, y:288}],
[{o:klocek_ciemny, x:1296, y:288}],
[{o:podloze_ziemia, x:1328, y:288}],
[{o:podloze_ziemia, x:1328, y:304}],
[{o:podloze_trawa, x:1344, y:288}],
[{o:podloze_trawa, x:1376, y:288}],
[{o:podloze_trawa, x:1408, y:288}],
[{o:podloze_trawa, x:1440, y:288}],
[{o:podloze_trawa, x:1472, y:288}],
[{o:podloze_trawa, x:1504, y:288}],
[{o:podloze_trawa, x:1536, y:288}],
[{o:podloze_trawa, x:1568, y:288}],
[{o:podloze_trawa, x:1600, y:288}],
[{o:podloze_trawa, x:1632, y:288}],
[{o:kwiatek_do_wziecia, x:1520, y:240}],
[{o:Niemka, x:544, y:240}],
[{o:niewidzialny_obiekt, x:16, y:272}],
[{o:Walenty, x:368, y:240}],
[{o:podloze_ziemia, x:256, y:272}],
[{o:podloze_skos_lewy, x:240, y:272}],
[{o:podloze_skos_lewy, x:256, y:256}],
[{o:podloze_ziemia, x:272, y:256}],
[{o:podloze_ziemia, x:288, y:256}],
[{o:podloze_trawa, x:96, y:256}],
[{o:konggobj, x:544, y:64}],
[{o:klocek, x:544, y:64}],
[{o:klocek, x:576, y:64}],
[{o:klocek, x:608, y:64}],
[{o:podloze_ziemia, x:1580, y:220}],
[{o:podloze_ziemia, x:1600, y:224}],
[{o:podloze_ziemia, x:1616, y:224}]];
this.start = function() {
__room_start__(this, tutorial, 1660, 480, 30, 128, 0, 255, null, 0, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane='kwiat';// kwiatek_pomyslany



	var t_game = document.getElementById('tululoogame');
 
		var tut_div = document.createElement('div');
		var divIdName = 'tut';
		tut_div.setAttribute('id',divIdName);
		tut_div.setAttribute('name',divIdName);
		tut_div.setAttribute('style','position: absolute; top: 105px; left: 0px; width: 640px; background-color: transparent; font-size: 48px; color: yellow; text-align: center;');
		tut_div.innerHTML = 'Use [D] to go right';
		
		t_game.appendChild(tut_div);
 
};
}
var tutorial = new __tutorial();
tu_scenes.push(tutorial);
function __tlo_Material_2et() { 
this.tiles = [
];
this.objects = [
[{o:girl_napis, x:340, y:200}]];
this.start = function() {
__room_start__(this, tlo_Material_2et, 640, 480, 30, 0, 0, 0, poziom_tlo.image, 0, 0, 0, 640, 480, null, 50, 50);

poziomu_nazwa='Material';
poziomu_nr=2;
};
}
var tlo_Material_2et = new __tlo_Material_2et();
tu_scenes.push(tlo_Material_2et);
function __GaleriaHandlowa() { 
this.tiles = [
[1000000,
[background_661,
[352,384,32,32,32,416],
[352,352,32,32,32,384],
[352,320,32,32,128,416],
[352,288,32,32,128,384],
[448,320,32,32,0,448],
[448,320,32,32,32,448],
[448,320,32,32,64,448],
[448,320,32,32,96,448],
[448,320,32,32,128,448],
[448,320,32,32,160,448],
[448,320,32,32,192,448],
[448,320,32,32,224,448],
[448,320,32,32,256,448],
[320,288,32,32,288,448],
[320,288,32,32,320,448],
[320,288,32,32,352,448],
[320,288,32,32,384,448],
[320,288,32,32,416,448],
[448,288,32,32,448,448],
[448,288,32,32,480,448],
[448,288,32,32,512,448],
[448,288,32,32,544,448],
[448,320,32,32,576,448],
[448,320,32,32,608,448],
[448,320,32,32,416,448],
[448,320,32,32,384,448],
[448,320,32,32,560,448],
[448,320,32,32,544,448],
[288,320,32,32,288,416],
[288,288,32,32,288,384],
[320,288,32,32,320,384],
[320,320,32,32,320,416],
[32,160,32,32,528,416],
[32,128,32,32,528,384],
[64,160,32,32,560,416],
[64,128,32,32,560,384],
[96,96,32,32,256,432],
[96,96,32,32,384,432],
[128,64,32,32,0,336],
[160,64,32,32,32,336],
[160,64,32,32,64,336],
[160,64,32,32,96,336],
[160,64,32,32,128,336],
[160,64,32,32,160,336],
[160,64,32,32,192,336],
[160,64,32,32,224,336],
[160,64,32,32,256,336],
[160,64,32,32,288,336],
[160,64,32,32,320,336],
[160,64,32,32,352,336],
[160,64,32,32,384,336],
[160,64,32,32,416,336],
[160,64,32,32,448,336],
[160,64,32,32,480,336],
[160,32,32,32,448,432],
[192,0,32,32,496,336],
[160,0,32,32,464,336],
[64,32,32,32,432,288],
[64,64,32,32,400,288],
[0,160,32,32,32,304],
[0,128,32,32,32,272],
[32,128,32,32,64,272],
[32,160,32,32,64,304],
[0,128,32,32,96,272],
[0,160,32,32,96,304],
[64,128,32,32,128,272],
[64,160,32,32,128,304],
[128,160,32,32,288,352],
[160,160,32,32,320,352],
[128,160,32,32,288,304],
[160,160,32,32,320,304],
[128,160,32,32,288,272],
[160,160,32,32,320,272],
[192,288,32,32,288,240],
[224,288,32,32,320,240],
[32,64,32,32,160,272],
[160,32,32,32,192,304],
[64,32,32,32,192,272],
[96,64,32,32,224,288],
[64,64,32,32,160,288],
[128,416,32,32,368,304],
[0,384,32,32,160,416],
[352,384,32,32,752,432],
[352,352,32,32,752,400],
[352,320,32,32,784,432],
[352,288,32,32,784,400],
[352,352,32,32,928,320],
[352,288,32,32,880,320],
[352,288,32,32,912,320],
[352,352,32,32,864,336],
[352,352,32,32,928,352],
[352,352,32,32,864,416],
[352,352,32,32,928,416],
[352,288,32,32,944,416],
[352,288,32,32,848,416],
[416,352,32,32,1296,416],
[416,352,32,32,1296,384],
[416,352,32,32,1296,400],
[320,352,32,32,224,304],
[320,352,32,32,160,304],
[320,352,32,32,224,192],
[320,352,32,32,192,192],
[320,352,32,32,160,192],
[320,352,32,32,128,192],
[320,352,32,32,304,208],
[64,224,32,32,1328,432],
[0,256,32,32,1296,368],
[0,256,32,32,1296,336],
[0,256,32,32,1328,336],
[0,256,32,32,1328,368],
[0,256,32,32,1360,368],
[0,256,32,32,1360,336],
[0,256,32,32,1392,336],
[0,256,32,32,1392,368],
[0,256,32,32,1424,368],
[0,256,32,32,1424,336],
[0,256,32,32,1456,336],
[0,256,32,32,1456,368],
[0,256,32,32,1488,368],
[0,256,32,32,1488,336],
[0,256,32,32,1520,336],
[0,256,32,32,1520,368],
[0,256,32,32,1552,368],
[0,256,32,32,1552,336],
[0,256,32,32,1584,336],
[0,256,32,32,1584,368],
[0,256,32,32,1616,368],
[0,256,32,32,1616,336],
[32,224,32,32,1360,432],
[32,192,32,32,1360,400],
[0,224,32,32,1408,416],
[0,192,32,32,1408,384],
[32,256,32,32,1328,432],
[32,256,32,32,1360,432],
[64,256,32,32,1392,432],
[96,256,32,32,1424,432],
[192,288,32,32,1552,400],
[224,288,32,32,1600,400],
[192,320,32,32,1552,432],
[224,320,32,32,1600,432],
[64,96,32,32,1584,400],
[0,256,32,32,1584,432],
[96,256,32,32,464,176],
[32,256,32,32,416,176],
[64,256,32,32,448,176],
[352,352,32,32,928,336],
[352,352,32,32,864,320],
[352,352,32,32,896,320],
[448,320,32,32,1088,416],
[448,320,32,32,1088,384],
[448,320,32,32,1120,416],
[448,320,32,32,1120,384],
[416,256,32,32,1152,416],
[416,256,32,32,1152,384],
[448,256,32,32,1152,400],
[448,256,32,32,1152,416],
[448,256,32,32,1152,432],
[448,192,32,32,1152,384],
[288,96,32,32,1120,352],
[288,64,32,32,1120,320],
[256,64,32,32,1088,320],
[256,96,32,32,1088,352],
[320,64,32,32,1088,288],
[320,64,32,32,1120,288],
[320,64,32,32,1120,256],
[320,64,32,32,1088,256],
[288,480,32,32,1184,432],
[288,448,32,32,1184,400],
[352,448,32,32,1248,432],
[352,416,32,32,1248,400],
[448,384,32,32,1472,448],
[480,384,32,32,1504,448],
[448,352,32,32,1472,416],
[480,352,32,32,1504,416],
[416,224,32,32,1216,432],
[416,192,32,32,1216,400],
[416,160,32,32,1216,368],
[384,192,32,32,1200,224]],
[background_3,
[128,144,16,16,880,432],
[144,144,16,16,896,432],
[160,144,16,16,912,432],
[176,144,16,16,928,432],
[176,128,16,16,928,416],
[160,128,16,16,912,416],
[144,128,16,16,896,416],
[128,128,16,16,880,416],
[128,112,16,16,880,400],
[144,112,16,16,896,400],
[160,112,16,16,912,400],
[176,112,16,16,928,400],
[128,96,16,16,880,384],
[144,96,16,16,896,384],
[160,96,16,16,912,384],
[176,96,16,16,928,384],
[128,80,16,16,880,368],
[144,80,16,16,912,368],
[144,80,16,16,896,368],
[160,80,16,16,912,368],
[176,80,16,16,928,368]],
[background_272,
[96,0,16,16,816,416],
[96,0,16,16,816,432],
[208,48,16,16,992,304],
[224,48,16,16,1008,304],
[208,64,16,16,992,320],
[224,64,16,16,1008,320],
[208,80,16,16,992,304],
[208,80,16,16,1008,304],
[208,80,16,16,1056,272],
[192,80,16,16,1056,272],
[208,80,16,16,1072,272],
[208,96,16,16,1056,288],
[208,96,16,16,1072,288],
[192,112,16,16,1056,304],
[192,112,16,16,1072,304],
[208,112,16,16,1072,304],
[192,128,16,16,1056,320],
[192,128,16,16,1072,320],
[192,144,16,16,1056,336],
[192,144,16,16,1072,336],
[192,272,16,16,1056,352],
[192,288,16,16,1056,368],
[192,304,16,16,1056,384],
[192,304,16,16,1056,400],
[192,288,16,16,1056,384],
[192,288,16,16,1056,400],
[192,288,16,16,1056,416],
[192,304,16,16,1056,432],
[240,304,16,16,1072,432],
[240,288,16,16,1072,416],
[240,272,16,16,1072,400],
[240,256,16,16,1072,384],
[192,256,16,16,1056,384],
[240,304,16,16,1072,368],
[192,304,16,16,1056,368],
[240,288,16,16,1072,352],
[192,112,16,16,992,336],
[192,112,16,16,1008,336],
[192,112,16,16,1008,352],
[192,112,16,16,992,352],
[192,112,16,16,992,368],
[192,112,16,16,1008,368],
[192,112,16,16,1008,384],
[192,112,16,16,992,384],
[192,112,16,16,992,400],
[192,112,16,16,1008,400],
[192,112,16,16,1008,416],
[192,112,16,16,992,416],
[192,112,16,16,992,432],
[192,112,16,16,1008,432],
[128,352,16,16,1024,432],
[128,352,16,16,1040,432],
[128,352,16,16,1040,416],
[128,352,16,16,1024,416],
[128,352,16,16,1024,400],
[128,352,16,16,1040,400],
[128,352,16,16,1040,384],
[128,352,16,16,1024,384],
[128,352,16,16,1040,368],
[128,352,16,16,1024,368],
[144,352,16,16,1024,352],
[144,352,16,16,1040,352],
[144,352,16,16,1040,336],
[144,352,16,16,1024,336],
[144,352,16,16,1024,320],
[144,352,16,16,1040,320],
[64,352,16,16,1024,304],
[112,352,16,16,1040,304],
[128,352,16,16,1024,288],
[176,352,16,16,1040,288],
[64,320,16,16,1024,272],
[80,320,16,16,1040,272],
[128,144,16,16,944,432],
[128,128,16,16,944,416],
[128,112,16,16,944,400],
[128,96,16,16,944,384],
[144,144,16,16,960,432],
[144,128,16,16,960,416],
[144,112,16,16,960,400],
[144,96,16,16,960,384],
[160,144,16,16,976,432],
[160,128,16,16,976,416],
[160,112,16,16,976,400],
[160,96,16,16,976,384],
[128,80,16,16,960,368],
[128,80,16,16,976,368],
[128,80,16,16,944,368],
[128,32,16,16,944,352],
[128,32,16,16,960,352],
[128,32,16,16,976,352],
[384,112,16,16,1120,144],
[384,112,16,16,1136,144],
[384,112,16,16,1168,144],
[384,112,16,16,1152,144],
[400,112,16,16,1248,192],
[400,112,16,16,1264,192],
[320,96,16,16,1184,240],
[320,96,16,16,1200,240],
[320,96,16,16,1216,240],
[320,96,16,16,1232,240]],
[background_1190,
[128,352,32,32,848,432],
[256,128,32,32,720,432]]]];
this.objects = [
[{o:podloze_ziemia, x:32, y:336}],
[{o:podloze_ziemia, x:48, y:336}],
[{o:podloze_ziemia, x:64, y:336}],
[{o:podloze_ziemia, x:80, y:336}],
[{o:podloze_ziemia, x:96, y:336}],
[{o:podloze_ziemia, x:112, y:336}],
[{o:podloze_ziemia, x:128, y:336}],
[{o:podloze_ziemia, x:144, y:336}],
[{o:podloze_ziemia, x:160, y:336}],
[{o:podloze_ziemia, x:176, y:336}],
[{o:podloze_ziemia, x:192, y:336}],
[{o:podloze_ziemia, x:208, y:336}],
[{o:podloze_ziemia, x:224, y:336}],
[{o:podloze_ziemia, x:240, y:336}],
[{o:podloze_ziemia, x:256, y:336}],
[{o:podloze_ziemia, x:272, y:336}],
[{o:podloze_ziemia, x:288, y:336}],
[{o:podloze_ziemia, x:304, y:336}],
[{o:podloze_ziemia, x:320, y:336}],
[{o:podloze_ziemia, x:336, y:336}],
[{o:podloze_ziemia, x:352, y:336}],
[{o:podloze_ziemia, x:368, y:336}],
[{o:podloze_ziemia, x:384, y:336}],
[{o:podloze_ziemia, x:400, y:336}],
[{o:podloze_ziemia, x:416, y:336}],
[{o:podloze_ziemia, x:432, y:336}],
[{o:podloze_ziemia, x:448, y:336}],
[{o:podloze_ziemia, x:464, y:320}],
[{o:podloze_ziemia, x:480, y:320}],
[{o:podloze_ziemia, x:496, y:320}],
[{o:podloze_ziemia, x:512, y:320}],
[{o:podloze_skos_lewy, x:448, y:320}],
[{o:podloze_skos_lewy, x:16, y:336}],
[{o:podloze_ziemia, x:0, y:432}],
[{o:podloze_ziemia, x:16, y:432}],
[{o:podloze_ziemia, x:32, y:432}],
[{o:podloze_ziemia, x:48, y:432}],
[{o:podloze_ziemia, x:64, y:432}],
[{o:podloze_ziemia, x:80, y:432}],
[{o:podloze_ziemia, x:96, y:432}],
[{o:podloze_ziemia, x:112, y:432}],
[{o:podloze_ziemia, x:128, y:432}],
[{o:podloze_ziemia, x:144, y:432}],
[{o:podloze_ziemia, x:160, y:432}],
[{o:podloze_ziemia, x:176, y:432}],
[{o:podloze_ziemia, x:192, y:432}],
[{o:podloze_ziemia, x:208, y:432}],
[{o:podloze_ziemia, x:224, y:432}],
[{o:podloze_ziemia, x:240, y:432}],
[{o:podloze_ziemia, x:256, y:432}],
[{o:podloze_ziemia, x:272, y:432}],
[{o:podloze_ziemia, x:288, y:432}],
[{o:podloze_ziemia, x:304, y:432}],
[{o:podloze_ziemia, x:320, y:432}],
[{o:podloze_ziemia, x:336, y:432}],
[{o:podloze_ziemia, x:352, y:432}],
[{o:podloze_ziemia, x:368, y:432}],
[{o:podloze_ziemia, x:384, y:432}],
[{o:podloze_ziemia, x:400, y:432}],
[{o:podloze_ziemia, x:416, y:432}],
[{o:podloze_ziemia, x:432, y:432}],
[{o:podloze_ziemia, x:448, y:432}],
[{o:podloze_ziemia, x:464, y:432}],
[{o:podloze_ziemia, x:480, y:432}],
[{o:podloze_ziemia, x:496, y:432}],
[{o:podloze_ziemia, x:512, y:432}],
[{o:podloze_ziemia, x:528, y:432}],
[{o:podloze_ziemia, x:544, y:432}],
[{o:podloze_ziemia, x:560, y:432}],
[{o:podloze_ziemia, x:576, y:432}],
[{o:podloze_ziemia, x:592, y:432}],
[{o:podloze_ziemia, x:608, y:432}],
[{o:podloze_ziemia, x:624, y:432}],
[{o:podloze_ziemia, x:640, y:432}],
[{o:podloze_ziemia, x:640, y:448}],
[{o:podloze_ziemia, x:640, y:464}],
[{o:podloze_ziemia, x:704, y:464}],
[{o:podloze_ziemia, x:656, y:464}],
[{o:podloze_ziemia, x:672, y:464}],
[{o:podloze_ziemia, x:688, y:464}],
[{o:podloze_ziemia, x:128, y:224}],
[{o:podloze_ziemia, x:144, y:224}],
[{o:podloze_ziemia, x:160, y:224}],
[{o:podloze_ziemia, x:176, y:224}],
[{o:podloze_ziemia, x:192, y:224}],
[{o:podloze_ziemia, x:208, y:224}],
[{o:podloze_ziemia, x:224, y:224}],
[{o:podloze_ziemia, x:240, y:224}],
[{o:podloze_ziemia, x:304, y:240}],
[{o:podloze_ziemia, x:320, y:240}],
[{o:Walenty, x:160, y:160}],
[{o:chmura, x:784, y:208}],
[{o:chmura, x:1312, y:176}],
[{o:chmura, x:1120, y:112}],
[{o:chmura, x:1536, y:128}],
[{o:podloze_trawa, x:720, y:448}],
[{o:podloze_trawa, x:752, y:448}],
[{o:podloze_trawa, x:784, y:448}],
[{o:podloze_trawa, x:816, y:448}],
[{o:podloze_trawa, x:848, y:448}],
[{o:podloze_trawa, x:896, y:448}],
[{o:podloze_trawa, x:880, y:448}],
[{o:podloze_trawa, x:928, y:448}],
[{o:podloze_trawa, x:960, y:448}],
[{o:podloze_trawa, x:992, y:448}],
[{o:podloze_trawa, x:1024, y:448}],
[{o:podloze_trawa, x:1056, y:448}],
[{o:podloze_trawa, x:1088, y:448}],
[{o:podloze_trawa, x:1120, y:448}],
[{o:podloze_trawa, x:1152, y:448}],
[{o:podloze_trawa, x:1184, y:448}],
[{o:podloze_trawa, x:1232, y:448}],
[{o:podloze_trawa, x:1216, y:448}],
[{o:podloze_trawa, x:1264, y:448}],
[{o:podloze_trawa, x:1296, y:448}],
[{o:podloze_ziemia, x:1328, y:464}],
[{o:podloze_ziemia, x:1360, y:464}],
[{o:podloze_ziemia, x:1344, y:464}],
[{o:podloze_ziemia, x:1376, y:464}],
[{o:podloze_ziemia, x:1392, y:464}],
[{o:podloze_ziemia, x:1408, y:464}],
[{o:podloze_ziemia, x:1424, y:464}],
[{o:podloze_ziemia, x:1440, y:464}],
[{o:podloze_ziemia, x:1472, y:464}],
[{o:podloze_ziemia, x:1456, y:464}],
[{o:podloze_ziemia, x:1504, y:464}],
[{o:podloze_ziemia, x:1488, y:464}],
[{o:podloze_ziemia, x:1520, y:464}],
[{o:podloze_ziemia, x:1536, y:464}],
[{o:podloze_ziemia, x:1552, y:464}],
[{o:podloze_ziemia, x:1584, y:464}],
[{o:podloze_ziemia, x:1568, y:464}],
[{o:podloze_ziemia, x:1600, y:464}],
[{o:podloze_ziemia, x:1616, y:464}],
[{o:podloze_ziemia, x:1632, y:464}],
[{o:podloze_ziemia, x:1648, y:464}],
[{o:podloze_trawa, x:880, y:336}],
[{o:podloze_trawa, x:912, y:336}],
[{o:podloze_skos_lewy, x:1296, y:320}],
[{o:podloze_skos_prawy, x:1632, y:320}],
[{o:podloze_ziemia, x:1312, y:320}],
[{o:podloze_ziemia, x:1328, y:320}],
[{o:podloze_ziemia, x:1344, y:320}],
[{o:podloze_ziemia, x:1360, y:320}],
[{o:podloze_ziemia, x:1376, y:320}],
[{o:podloze_ziemia, x:1392, y:320}],
[{o:podloze_ziemia, x:1408, y:320}],
[{o:podloze_ziemia, x:1424, y:320}],
[{o:podloze_ziemia, x:1440, y:320}],
[{o:podloze_ziemia, x:1456, y:320}],
[{o:podloze_ziemia, x:1472, y:320}],
[{o:podloze_ziemia, x:1488, y:320}],
[{o:podloze_ziemia, x:1504, y:320}],
[{o:podloze_ziemia, x:1520, y:320}],
[{o:podloze_ziemia, x:1536, y:320}],
[{o:podloze_ziemia, x:1552, y:320}],
[{o:podloze_ziemia, x:1568, y:320}],
[{o:podloze_ziemia, x:1584, y:320}],
[{o:podloze_ziemia, x:1600, y:320}],
[{o:podloze_ziemia, x:1616, y:320}],
[{o:podloze_ziemia, x:416, y:208}],
[{o:podloze_ziemia, x:432, y:208}],
[{o:podloze_ziemia, x:448, y:208}],
[{o:podloze_ziemia, x:464, y:208}],
[{o:podloze_ziemia, x:480, y:208}],
[{o:na_zakupach, x:448, y:144}],
[{o:podloze_ziemia, x:816, y:400}],
[{o:podloze_ziemia, x:768, y:368}],
[{o:podloze_ziemia, x:784, y:368}],
[{o:podloze_ziemia, x:992, y:288}],
[{o:podloze_ziemia, x:1008, y:288}],
[{o:podloze_ziemia, x:1056, y:256}],
[{o:podloze_ziemia, x:1072, y:256}],
[{o:podloze_ziemia, x:1120, y:240}],
[{o:podloze_ziemia, x:1136, y:240}],
[{o:podloze_ziemia, x:1248, y:176}],
[{o:podloze_ziemia, x:1264, y:176}],
[{o:podloze_ziemia, x:1168, y:128}],
[{o:podloze_ziemia, x:1152, y:128}],
[{o:podloze_ziemia, x:1136, y:128}],
[{o:podloze_ziemia, x:1120, y:128}],
[{o:podloze_ziemia, x:1056, y:96}],
[{o:podloze_ziemia, x:1040, y:96}],
[{o:podloze_ziemia, x:1024, y:96}],
[{o:podloze_ziemia, x:1008, y:96}],
[{o:podloze_ziemia, x:928, y:96}],
[{o:podloze_ziemia, x:912, y:96}],
[{o:podloze_ziemia, x:896, y:96}],
[{o:podloze_ziemia, x:880, y:96}],
[{o:podloze_ziemia, x:816, y:64}],
[{o:podloze_ziemia, x:800, y:64}],
[{o:podloze_ziemia, x:784, y:64}],
[{o:podloze_ziemia, x:768, y:64}],
[{o:podloze_ziemia, x:688, y:32}],
[{o:podloze_ziemia, x:672, y:32}],
[{o:podloze_ziemia, x:656, y:32}],
[{o:podloze_ziemia, x:640, y:32}],
[{o:podloze_ziemia, x:560, y:32}],
[{o:podloze_ziemia, x:544, y:32}],
[{o:podloze_ziemia, x:528, y:32}],
[{o:podloze_ziemia, x:512, y:32}],
[{o:bonus, x:80, y:384}],
[{o:bonus, x:208, y:384}],
[{o:bonus, x:64, y:224}],
[{o:bonus, x:768, y:304}],
[{o:bonus, x:1344, y:256}],
[{o:bonus, x:1440, y:256}],
[{o:bonus, x:1520, y:256}],
[{o:podloze_ziemia, x:656, y:448}],
[{o:podloze_ziemia, x:656, y:432}],
[{o:pierscien_do_wziecia, x:1328, y:400}],
[{o:podloze_ziemia, x:256, y:320}],
[{o:podloze_ziemia, x:272, y:320}],
[{o:wrog1, x:496, y:272}],
[{o:podloze_ziemia, x:0, y:416}],
[{o:podloze_ziemia, x:16, y:416}],
[{o:wrog1, x:640, y:384}],
[{o:wrog1, x:1616, y:416}],
[{o:podloze_ziemia, x:1648, y:448}],
[{o:wrog2, x:1600, y:120}],
[{o:bonus, x:780, y:20}],
[{o:bonus, x:1020, y:40}],
[{o:bonus, x:1240, y:120}],
[{o:podloze_ziemia, x:1184, y:256}],
[{o:podloze_ziemia, x:1200, y:256}],
[{o:podloze_ziemia, x:1216, y:256}],
[{o:podloze_ziemia, x:1232, y:256}],
[{o:podloze_ziemia, x:1200, y:208}],
[{o:klocek, x:688, y:256}],
[{o:klocek_ciemny, x:592, y:224}],
[{o:kladka, x:1488, y:208}],
[{o:kladka, x:1488, y:80}],
[{o:klocek_ciemny, x:1568, y:80}],
[{o:klocek, x:1616, y:48}],
[{o:bonus, x:1568, y:32}],
[{o:bonus, x:1616, y:0}]];
this.start = function() {
__room_start__(this, GaleriaHandlowa, 1660, 480, 30, 0, 0, 0, niebo_szare.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='pierścień';
};
}
var GaleriaHandlowa = new __GaleriaHandlowa();
tu_scenes.push(GaleriaHandlowa);
function __Buty() { 
this.tiles = [
[1000000,
[background_272,
[0,448,32,32,0,448],
[0,448,32,32,32,448],
[0,448,32,32,64,448],
[0,448,32,32,96,448],
[0,448,32,32,128,448],
[0,448,32,32,160,448],
[32,448,32,32,192,448],
[0,448,32,32,224,448],
[0,448,32,32,256,448],
[0,448,32,32,288,448],
[0,448,32,32,320,448],
[0,448,32,32,352,448],
[0,448,32,32,384,448],
[0,448,32,32,416,448],
[0,448,32,32,448,448],
[0,448,32,32,480,448],
[0,448,32,32,512,448],
[0,448,32,32,544,448],
[0,448,32,32,576,448],
[0,448,32,32,608,448],
[0,448,32,32,640,448],
[0,448,32,32,672,448],
[0,448,32,32,704,448],
[0,448,32,32,736,448],
[0,448,32,32,768,448],
[0,448,32,32,800,448],
[0,448,32,32,832,448],
[0,448,32,32,864,448],
[0,448,32,32,896,448],
[0,448,32,32,928,448],
[0,448,32,32,960,448],
[0,448,32,32,992,448],
[0,448,32,32,1024,448],
[0,448,32,32,1056,448],
[0,448,32,32,1120,448],
[0,448,32,32,1088,448],
[0,448,32,32,1152,448],
[0,448,32,32,1184,448],
[0,448,32,32,1216,448],
[0,448,32,32,1248,448],
[0,448,32,32,1280,448],
[0,448,32,32,1312,448],
[0,448,32,32,1344,448],
[0,448,32,32,1408,448],
[0,448,32,32,1376,448],
[0,448,32,32,1440,448],
[0,448,32,32,1472,448],
[0,448,32,32,1504,448],
[0,448,32,32,1536,448],
[0,448,32,32,1568,448],
[0,448,32,32,1600,448],
[0,448,32,32,1632,448],
[0,416,32,32,0,416],
[32,416,32,32,32,416],
[0,416,32,32,64,416],
[0,384,32,32,0,384],
[32,416,32,32,96,416],
[32,416,32,32,128,416],
[32,416,32,32,192,416],
[32,416,32,32,160,416],
[32,416,32,32,288,416],
[32,416,32,32,256,416],
[32,416,32,32,320,416],
[32,416,32,32,352,416],
[32,416,32,32,384,416],
[64,448,32,32,256,352],
[64,448,32,32,288,352],
[192,416,32,32,256,320],
[192,416,32,32,288,320],
[192,416,32,32,256,352],
[192,416,32,32,288,352],
[192,416,32,32,288,384],
[192,416,32,32,256,384],
[192,416,32,32,128,192],
[192,416,32,32,160,192],
[192,416,32,32,160,224],
[192,416,32,32,128,224],
[192,416,32,32,128,256],
[192,416,32,32,160,256],
[192,416,32,32,160,288],
[192,416,32,32,128,288],
[224,416,32,32,128,192],
[224,416,32,32,128,224],
[224,416,32,32,160,192],
[224,416,32,32,160,224],
[224,416,32,32,160,256],
[224,416,32,32,160,288],
[192,416,32,32,128,192],
[224,448,32,32,160,384],
[224,416,32,32,160,352],
[224,416,32,32,160,320],
[192,416,32,32,128,320],
[192,416,32,32,128,352],
[192,416,32,32,128,384],
[192,416,16,16,96,352],
[192,416,16,16,96,336],
[192,416,16,16,96,320],
[192,416,16,16,96,304],
[192,416,16,16,96,288],
[192,416,16,16,96,272],
[192,416,16,16,96,256],
[192,416,16,16,96,224],
[192,416,16,16,96,240],
[192,416,16,16,96,208],
[240,416,16,16,192,208],
[240,416,16,16,192,224],
[240,416,16,16,192,240],
[240,416,16,16,192,256],
[240,416,16,16,192,272],
[240,416,16,16,192,288],
[240,416,16,16,192,304],
[240,416,16,16,192,320],
[240,416,16,16,192,336],
[240,416,16,16,192,352],
[240,432,16,16,192,336],
[240,448,16,16,192,320],
[240,448,16,16,192,272],
[240,448,16,16,192,288],
[192,432,16,16,96,256],
[192,448,16,16,96,288]],
[background_3,
[160,16,16,16,96,400],
[176,16,16,16,16,400],
[128,32,16,16,32,368],
[144,32,16,16,48,368],
[160,32,16,16,64,368],
[176,32,16,16,80,368],
[176,32,16,16,128,432],
[128,16,16,16,224,432],
[128,32,16,16,192,368],
[144,0,16,16,208,368],
[192,400,16,16,176,192],
[208,416,16,16,112,192],
[208,416,16,16,112,208],
[208,416,16,16,112,224],
[208,416,16,16,112,240],
[208,416,16,16,112,256],
[208,416,16,16,112,272],
[208,416,16,16,112,288],
[208,416,16,16,112,304],
[208,416,16,16,112,320],
[208,416,16,16,112,352],
[208,416,16,16,112,336],
[208,416,16,16,112,368],
[208,416,16,16,112,384],
[208,416,16,16,112,400],
[208,320,16,16,112,192],
[192,320,16,16,128,192],
[128,320,16,16,144,192],
[48,320,16,16,144,192],
[0,320,16,16,160,192],
[0,320,16,16,304,336],
[16,320,16,16,256,336],
[16,352,16,16,272,336],
[32,352,16,16,288,336],
[176,64,16,16,16,384],
[128,32,16,16,16,368],
[176,32,16,16,96,368],
[128,48,16,16,96,384],
[64,320,16,16,96,192],
[16,416,16,16,96,192],
[48,320,16,16,96,192],
[32,320,16,16,192,192],
[176,16,16,16,496,432]]]];
this.objects = [
[{o:Walenty, x:128, y:96}],
[{o:podloze_ziemia, x:256, y:320}],
[{o:podloze_ziemia, x:288, y:320}],
[{o:podloze_trawa, x:32, y:384}],
[{o:podloze_trawa, x:64, y:384}],
[{o:podloze_trawa, x:192, y:384}],
[{o:podloze_trawa, x:0, y:416}],
[{o:podloze_trawa, x:32, y:416}],
[{o:podloze_trawa, x:64, y:416}],
[{o:podloze_trawa, x:96, y:416}],
[{o:podloze_trawa, x:128, y:448}],
[{o:podloze_trawa, x:96, y:448}],
[{o:podloze_trawa, x:64, y:448}],
[{o:podloze_trawa, x:32, y:448}],
[{o:podloze_trawa, x:0, y:448}],
[{o:podloze_trawa, x:160, y:448}],
[{o:podloze_trawa, x:192, y:448}],
[{o:podloze_trawa, x:224, y:448}],
[{o:podloze_trawa, x:256, y:448}],
[{o:podloze_trawa, x:288, y:448}],
[{o:podloze_trawa, x:320, y:448}],
[{o:podloze_trawa, x:352, y:448}],
[{o:podloze_trawa, x:384, y:448}],
[{o:podloze_trawa, x:416, y:432}],
[{o:podloze_trawa, x:416, y:464}],
[{o:podloze_trawa, x:448, y:448}],
[{o:podloze_trawa, x:480, y:448}],
[{o:podloze_trawa, x:512, y:464}],
[{o:podloze_trawa, x:512, y:432}],
[{o:podloze_trawa, x:544, y:464}],
[{o:podloze_trawa, x:544, y:432}],
[{o:podloze_trawa, x:576, y:416}],
[{o:podloze_trawa, x:576, y:448}],
[{o:podloze_trawa, x:608, y:448}],
[{o:podloze_trawa, x:608, y:416}],
[{o:podloze_trawa, x:640, y:448}],
[{o:podloze_trawa, x:640, y:416}],
[{o:podloze_trawa, x:672, y:464}],
[{o:podloze_trawa, x:672, y:432}],
[{o:podloze_trawa, x:672, y:400}],
[{o:podloze_trawa, x:704, y:464}],
[{o:podloze_trawa, x:704, y:432}],
[{o:podloze_trawa, x:704, y:400}],
[{o:podloze_trawa, x:736, y:464}],
[{o:podloze_trawa, x:736, y:432}],
[{o:podloze_trawa, x:736, y:400}],
[{o:podloze_trawa, x:768, y:448}],
[{o:podloze_trawa, x:768, y:416}],
[{o:podloze_trawa, x:768, y:384}],
[{o:podloze_trawa, x:800, y:384}],
[{o:podloze_trawa, x:800, y:416}],
[{o:podloze_trawa, x:800, y:448}],
[{o:podloze_trawa, x:832, y:448}],
[{o:podloze_trawa, x:832, y:416}],
[{o:podloze_trawa, x:832, y:384}],
[{o:podloze_trawa, x:864, y:448}],
[{o:podloze_trawa, x:864, y:416}],
[{o:podloze_trawa, x:864, y:384}],
[{o:podloze_trawa, x:896, y:432}],
[{o:podloze_trawa, x:896, y:400}],
[{o:podloze_trawa, x:896, y:368}],
[{o:podloze_trawa, x:896, y:464}],
[{o:podloze_trawa, x:928, y:464}],
[{o:podloze_trawa, x:928, y:432}],
[{o:podloze_trawa, x:928, y:400}],
[{o:podloze_trawa, x:928, y:368}],
[{o:podloze_trawa, x:960, y:368}],
[{o:bonus, x:368, y:256}],
[{o:bonus, x:592, y:320}],
[{o:podloze_ziemia, x:1072, y:352}],
[{o:podloze_ziemia, x:1104, y:352}],
[{o:podloze_ziemia, x:1136, y:352}],
[{o:podloze_ziemia, x:1232, y:352}],
[{o:podloze_ziemia, x:1264, y:352}],
[{o:podloze_ziemia, x:1296, y:352}],
[{o:podloze_ziemia, x:1392, y:352}],
[{o:podloze_ziemia, x:1424, y:352}],
[{o:podloze_ziemia, x:1456, y:352}],
[{o:podloze_ziemia, x:1584, y:352}],
[{o:podloze_ziemia, x:1552, y:352}],
[{o:podloze_ziemia, x:1616, y:352}],
[{o:podloze_ziemia, x:112, y:176}],
[{o:podloze_ziemia, x:128, y:176}],
[{o:podloze_ziemia, x:144, y:176}],
[{o:podloze_ziemia, x:160, y:176}],
[{o:podloze_ziemia, x:176, y:176}],
[{o:podloze_ziemia, x:272, y:320}],
[{o:podloze_ziemia, x:304, y:320}],
[{o:podloze_ziemia, x:1088, y:352}],
[{o:podloze_ziemia, x:1120, y:352}],
[{o:podloze_ziemia, x:1248, y:352}],
[{o:podloze_ziemia, x:1280, y:352}],
[{o:podloze_ziemia, x:1408, y:352}],
[{o:podloze_ziemia, x:1440, y:352}],
[{o:podloze_ziemia, x:1568, y:352}],
[{o:podloze_ziemia, x:1600, y:352}],
[{o:podloze_ziemia, x:1632, y:352}],
[{o:podloze_skos_lewy, x:96, y:176}],
[{o:podloze_skos_prawy, x:192, y:176}],
[{o:chmura, x:256, y:96}],
[{o:chmura, x:944, y:208}],
[{o:chmura, x:1488, y:128}],
[{o:chmura, x:768, y:16}],
[{o:pierscien_do_wziecia, x:528, y:384}],
[{o:wrog1, x:960, y:320}],
[{o:but_do_wziecia, x:680, y:260}],
[{o:podloze_ziemia, x:1648, y:352}],
[{o:podloze_ziemia, x:1568, y:288}],
[{o:podloze_ziemia, x:1584, y:288}],
[{o:podloze_ziemia, x:1632, y:224}],
[{o:podloze_ziemia, x:1648, y:224}],
[{o:podloze_ziemia, x:1568, y:176}],
[{o:podloze_ziemia, x:1552, y:176}],
[{o:podloze_ziemia, x:1632, y:112}],
[{o:podloze_ziemia, x:1648, y:112}],
[{o:podloze_ziemia, x:1568, y:48}],
[{o:podloze_ziemia, x:1552, y:48}],
[{o:podloze_ziemia, x:1584, y:48}],
[{o:podloze_ziemia, x:1488, y:16}],
[{o:podloze_ziemia, x:1504, y:16}],
[{o:podloze_ziemia, x:1424, y:64}],
[{o:podloze_ziemia, x:1408, y:64}],
[{o:podloze_ziemia, x:1328, y:64}],
[{o:podloze_ziemia, x:1312, y:64}],
[{o:podloze_ziemia, x:1232, y:64}],
[{o:podloze_ziemia, x:1216, y:64}],
[{o:podloze_ziemia, x:1136, y:64}],
[{o:podloze_ziemia, x:1120, y:64}],
[{o:podloze_ziemia, x:1040, y:64}],
[{o:podloze_ziemia, x:1024, y:64}],
[{o:podloze_ziemia, x:944, y:64}],
[{o:podloze_ziemia, x:928, y:64}],
[{o:podloze_ziemia, x:848, y:64}],
[{o:podloze_ziemia, x:832, y:64}],
[{o:podloze_ziemia, x:752, y:64}],
[{o:podloze_ziemia, x:736, y:64}],
[{o:podloze_ziemia, x:656, y:64}],
[{o:podloze_ziemia, x:640, y:64}],
[{o:podloze_ziemia, x:560, y:64}],
[{o:podloze_ziemia, x:544, y:64}],
[{o:podloze_ziemia, x:464, y:64}],
[{o:podloze_ziemia, x:448, y:64}],
[{o:podloze_ziemia, x:368, y:64}],
[{o:podloze_ziemia, x:352, y:64}],
[{o:bonus, x:352, y:16}],
[{o:bonus, x:448, y:16}],
[{o:bonus, x:640, y:16}],
[{o:bonus, x:832, y:16}],
[{o:bonus, x:928, y:16}],
[{o:bonus, x:1216, y:16}],
[{o:bonus, x:1024, y:16}],
[{o:bonus, x:1312, y:16}],
[{o:na_zakupach, x:272, y:240}],
[{o:podloze_ziemia, x:208, y:416}],
[{o:podloze_ziemia, x:208, y:432}],
[{o:wrog2, x:928, y:16}],
[{o:bonus, x:1104, y:288}],
[{o:bonus, x:1264, y:304}],
[{o:bonus, x:1408, y:288}],
[{o:bonus, x:1616, y:288}],
[{o:bonus, x:1568, y:240}],
[{o:bonus, x:1552, y:128}],
[{o:bonus, x:1552, y:0}],
[{o:bonus, x:1408, y:16}],
[{o:klocek, x:464, y:112}]];
this.start = function() {
__room_start__(this, Buty, 1660, 480, 30, 0, 0, 0, niebo_szare.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='but';
};
}
var Buty = new __Buty();
tu_scenes.push(Buty);
function __tlo_Africa_et3() { 
this.tiles = [
];
this.objects = [
[{o:girl_tile, x:600, y:420}],
[{o:girl_napis, x:420, y:180}],
[{o:girl_tile, x:560, y:420}],
[{o:girl_tile, x:520, y:420}],
[{o:girl_tile, x:480, y:420}]];
this.start = function() {
__room_start__(this, tlo_Africa_et3, 640, 480, 30, 0, 0, 0, poziom_tlo.image, 0, 0, 0, 640, 480, null, 50, 50);

poziomu_nazwa='African';
poziomu_nr=3;
};
}
var tlo_Africa_et3 = new __tlo_Africa_et3();
tu_scenes.push(tlo_Africa_et3);
function __Piramidy() { 
this.tiles = [
[1000000,
[background_272,
[64,96,16,16,16,208],
[64,96,16,16,32,208],
[64,96,16,16,48,208],
[64,96,16,16,64,208],
[64,96,16,16,80,208],
[64,96,16,16,112,208],
[64,96,16,16,96,208],
[64,96,16,16,144,208],
[64,96,16,16,128,208],
[96,96,16,16,64,208],
[96,32,16,16,256,320],
[112,32,16,16,272,320],
[80,32,16,16,304,320],
[64,32,16,16,288,320],
[96,32,16,16,320,320],
[80,32,16,16,336,320]],
[background_3,
[192,256,16,16,560,336],
[208,256,16,16,576,336],
[224,256,16,16,592,336],
[240,256,16,16,608,336],
[192,256,16,16,624,336],
[208,256,16,16,640,336],
[64,352,16,16,752,448],
[64,352,16,16,768,432],
[64,352,16,16,784,416],
[64,352,16,16,800,400],
[64,352,16,16,816,384],
[64,352,16,16,832,368],
[64,352,16,16,848,352],
[64,352,16,16,864,336],
[64,352,16,16,880,320],
[112,352,16,16,896,320],
[112,352,16,16,912,336],
[112,352,16,16,928,352],
[112,352,16,16,944,368],
[112,352,16,16,960,384],
[112,352,16,16,976,400],
[112,352,16,16,992,416],
[112,352,16,16,1008,432],
[112,352,16,16,1024,448],
[64,352,16,16,736,464],
[112,352,16,16,1040,464],
[64,368,16,16,752,464],
[112,368,16,16,1024,464],
[80,368,16,16,880,336],
[80,368,16,16,896,336],
[80,368,16,16,864,352],
[80,368,16,16,880,352],
[80,368,16,16,896,352],
[80,368,16,16,912,352],
[80,368,16,16,832,384],
[80,368,16,16,848,384],
[80,368,16,16,864,384],
[80,368,16,16,880,384],
[80,368,16,16,896,384],
[80,368,16,16,912,384],
[80,368,16,16,928,384],
[80,368,16,16,944,384],
[80,368,16,16,928,368],
[80,368,16,16,912,368],
[80,368,16,16,912,368],
[80,368,16,16,880,384],
[80,368,16,16,896,368],
[80,368,16,16,880,368],
[80,368,16,16,864,368],
[80,368,16,16,848,368],
[80,368,16,16,816,400],
[80,368,16,16,832,400],
[80,368,16,16,848,400],
[80,368,16,16,848,400],
[80,368,16,16,864,400],
[80,368,16,16,880,400],
[80,368,16,16,880,400],
[80,368,16,16,896,400],
[80,368,16,16,912,400],
[80,368,16,16,928,400],
[80,368,16,16,928,400],
[80,368,16,16,944,400],
[80,368,16,16,960,400],
[80,368,16,16,960,400],
[80,368,16,16,784,432],
[80,368,16,16,1008,448],
[80,368,16,16,1008,464],
[80,368,16,16,784,448],
[80,368,16,16,784,464],
[80,368,16,16,768,448],
[80,368,16,16,768,464],
[80,368,16,16,992,432],
[80,368,16,16,992,448],
[80,368,16,16,992,464],
[144,288,16,16,800,416],
[144,288,16,16,800,432],
[144,288,16,16,800,448],
[144,288,16,16,800,464],
[144,288,16,16,816,416],
[144,288,16,16,816,432],
[144,288,16,16,816,464],
[144,288,16,16,816,448],
[144,288,16,16,832,416],
[144,288,16,16,832,432],
[144,288,16,16,832,448],
[144,288,16,16,832,464],
[144,288,16,16,976,416],
[144,288,16,16,976,432],
[144,288,16,16,976,448],
[144,288,16,16,976,464],
[144,288,16,16,960,416],
[144,288,16,16,960,432],
[144,288,16,16,960,464],
[144,288,16,16,960,448],
[144,288,16,16,944,416],
[144,288,16,16,944,432],
[144,288,16,16,944,448],
[144,288,16,16,944,464],
[144,288,16,16,944,464],
[144,288,16,16,944,464],
[144,288,16,16,928,432],
[144,288,16,16,928,448],
[144,288,16,16,928,464],
[144,288,16,16,928,464],
[144,288,16,16,928,416],
[144,288,16,16,848,416],
[144,288,16,16,848,432],
[144,288,16,16,848,448],
[144,288,16,16,848,448],
[144,288,16,16,848,464],
[144,288,16,16,864,416],
[144,288,16,16,864,448],
[144,288,16,16,864,464],
[144,288,16,16,864,464],
[144,288,16,16,864,432],
[144,288,16,16,864,432],
[144,288,16,16,864,416],
[144,288,16,16,896,416],
[144,288,16,16,880,448],
[144,288,16,16,880,464],
[144,288,16,16,896,448],
[144,288,16,16,912,432],
[144,288,16,16,896,416],
[144,288,16,16,880,416],
[144,288,16,16,880,368],
[144,288,16,16,880,432],
[144,288,16,16,880,432],
[144,288,16,16,880,432],
[144,288,16,16,912,432],
[144,288,16,16,912,416],
[144,288,16,16,912,416],
[144,288,16,16,896,448],
[144,288,16,16,896,448],
[144,288,16,16,912,448],
[144,288,16,16,896,464],
[144,288,16,16,896,448],
[144,288,16,16,896,432],
[144,288,16,16,912,464],
[80,384,16,16,880,368],
[80,368,16,16,1152,368],
[80,368,16,16,1168,368],
[80,368,16,16,1136,384],
[80,368,16,16,1152,384],
[80,368,16,16,1168,384],
[80,368,16,16,1168,384],
[80,368,16,16,1184,384],
[80,368,16,16,1200,384],
[80,368,16,16,1200,400],
[80,368,16,16,1184,400],
[80,368,16,16,1152,400],
[80,368,16,16,1152,400],
[80,368,16,16,1136,384],
[80,368,16,16,1120,400],
[80,368,16,16,1120,400],
[80,368,16,16,1136,400],
[80,368,16,16,1136,400],
[80,368,16,16,1152,400],
[80,368,16,16,1168,400],
[80,368,16,16,1168,400],
[80,368,16,16,1184,400],
[80,368,16,16,1200,400],
[80,368,16,16,1200,416],
[80,368,16,16,1216,400],
[80,368,16,16,1216,416],
[80,368,16,16,1200,416],
[80,368,16,16,1168,416],
[80,368,16,16,1168,416],
[80,368,16,16,1120,416],
[80,368,16,16,1104,416],
[80,368,16,16,1088,416],
[80,368,16,16,1104,416],
[80,368,16,16,1136,416],
[80,368,16,16,1152,416],
[80,368,16,16,1168,416],
[80,368,16,16,1184,416],
[80,368,16,16,1184,416],
[80,368,16,16,1088,464],
[80,368,16,16,1088,464],
[80,368,16,16,1088,448],
[80,368,16,16,1088,432],
[80,368,16,16,1088,432],
[80,368,16,16,1072,448],
[80,368,16,16,1072,464],
[80,368,16,16,1056,464],
[80,368,16,16,1264,464],
[80,368,16,16,1248,448],
[80,368,16,16,1248,464],
[80,368,16,16,1232,432],
[80,368,16,16,1232,448],
[80,368,16,16,1232,464],
[144,272,16,16,1104,432],
[144,272,16,16,1104,464],
[144,272,16,16,1104,464],
[144,272,16,16,1104,448],
[144,272,16,16,1120,432],
[144,272,16,16,1120,448],
[144,272,16,16,1120,464],
[144,272,16,16,1152,464],
[144,272,16,16,1152,464],
[144,272,16,16,1136,464],
[144,272,16,16,1168,464],
[144,272,16,16,1184,464],
[144,272,16,16,1200,464],
[144,272,16,16,1216,464],
[144,272,16,16,1136,448],
[144,272,16,16,1152,448],
[144,272,16,16,1168,448],
[144,272,16,16,1184,448],
[144,272,16,16,1200,448],
[144,272,16,16,1216,448],
[144,272,16,16,1136,432],
[144,272,16,16,1152,432],
[144,272,16,16,1168,432],
[144,272,16,16,1184,432],
[144,272,16,16,1200,432],
[144,272,16,16,1216,432],
[80,368,16,16,1344,464],
[80,368,16,16,1360,448],
[80,368,16,16,1376,432],
[80,368,16,16,1392,416],
[80,368,16,16,1408,400],
[80,368,16,16,1424,384],
[80,368,16,16,1440,368],
[80,368,16,16,1456,352],
[80,368,16,16,1472,336],
[80,368,16,16,1488,320],
[80,368,16,16,1504,320],
[80,368,16,16,1520,336],
[80,368,16,16,1536,352],
[80,368,16,16,1552,368],
[80,368,16,16,1568,384],
[80,368,16,16,1584,400],
[80,368,16,16,1600,416],
[80,368,16,16,1616,432],
[80,368,16,16,1632,448],
[80,368,16,16,1648,464],
[80,368,16,16,1360,464],
[80,368,16,16,1376,448],
[80,368,16,16,1392,432],
[80,368,16,16,1408,416],
[80,368,16,16,1424,400],
[80,368,16,16,1440,384],
[80,368,16,16,1456,368],
[80,368,16,16,1472,352],
[80,368,16,16,1488,336],
[80,368,16,16,1504,336],
[80,368,16,16,1520,352],
[80,368,16,16,1536,368],
[80,368,16,16,1552,384],
[80,368,16,16,1568,400],
[80,368,16,16,1584,416],
[80,368,16,16,1600,432],
[80,368,16,16,1616,448],
[80,368,16,16,1632,464],
[80,368,16,16,1488,352],
[80,368,16,16,1504,352],
[80,368,16,16,1376,464],
[80,368,16,16,1392,464],
[80,368,16,16,1392,448],
[80,368,16,16,1600,464],
[80,368,16,16,1616,464],
[80,368,16,16,1600,448],
[80,368,16,16,1408,432],
[80,368,16,16,1408,448],
[80,368,16,16,1408,464],
[80,368,16,16,1584,432],
[80,368,16,16,1584,448],
[80,368,16,16,1584,464],
[80,368,16,16,1440,400],
[80,368,16,16,1456,400],
[80,368,16,16,1472,400],
[80,368,16,16,1488,400],
[80,368,16,16,1504,400],
[80,368,16,16,1520,400],
[80,368,16,16,1536,400],
[80,368,16,16,1552,400],
[80,368,16,16,1536,384],
[80,368,16,16,1456,384],
[144,288,16,16,1424,416],
[144,288,16,16,1424,432],
[144,288,16,16,1424,448],
[144,288,16,16,1424,464],
[144,288,16,16,1440,464],
[144,288,16,16,1440,448],
[144,288,16,16,1440,432],
[144,288,16,16,1440,416],
[144,288,16,16,1456,416],
[144,288,16,16,1456,432],
[144,288,16,16,1456,448],
[144,288,16,16,1456,464],
[144,288,16,16,1472,464],
[144,288,16,16,1472,448],
[144,288,16,16,1472,432],
[144,288,16,16,1472,416],
[144,288,16,16,1488,416],
[144,288,16,16,1488,432],
[144,288,16,16,1488,448],
[144,288,16,16,1488,464],
[144,288,16,16,1504,464],
[144,288,16,16,1504,448],
[144,288,16,16,1504,432],
[144,288,16,16,1504,416],
[144,288,16,16,1520,416],
[144,288,16,16,1520,432],
[144,288,16,16,1520,448],
[144,288,16,16,1520,464],
[144,288,16,16,1536,464],
[144,288,16,16,1536,448],
[144,288,16,16,1536,432],
[144,288,16,16,1536,416],
[144,288,16,16,1552,416],
[144,288,16,16,1552,432],
[144,288,16,16,1552,448],
[144,288,16,16,1552,464],
[144,288,16,16,1568,464],
[144,288,16,16,1568,448],
[144,288,16,16,1568,432],
[144,288,16,16,1568,416],
[144,288,16,16,1520,384],
[144,288,16,16,1520,368],
[144,288,16,16,1504,368],
[144,288,16,16,1504,384],
[144,288,16,16,1472,384],
[144,288,16,16,1488,368],
[144,288,16,16,1488,384],
[144,288,16,16,1472,368],
[192,256,16,16,464,336],
[208,256,16,16,480,336],
[224,256,16,16,496,336],
[240,256,16,16,512,336],
[256,304,16,16,528,336],
[272,304,16,16,544,336],
[288,304,16,16,480,320],
[288,304,16,16,496,320],
[288,304,16,16,512,320],
[288,304,16,16,528,320],
[288,304,16,16,544,320],
[288,304,16,16,560,320],
[288,304,16,16,576,320],
[288,304,16,16,592,320],
[288,304,16,16,608,320],
[288,304,16,16,624,320],
[304,304,16,16,496,304],
[304,304,16,16,512,304],
[304,304,16,16,528,304],
[304,304,16,16,544,304],
[304,304,16,16,560,304],
[304,304,16,16,576,304],
[304,304,16,16,608,304],
[304,304,16,16,592,304],
[320,304,16,16,512,288],
[320,304,16,16,528,288],
[320,304,16,16,544,288],
[320,304,16,16,560,288],
[320,304,16,16,576,288],
[320,304,16,16,592,288],
[256,304,16,16,528,272],
[256,304,16,16,544,272],
[256,304,16,16,560,272],
[256,304,16,16,576,272],
[256,304,16,16,544,256],
[256,304,16,16,560,256],
[400,304,16,16,288,336],
[400,304,16,16,304,336],
[400,288,16,16,288,352],
[400,288,16,16,288,368],
[400,288,16,16,288,384],
[416,288,16,16,304,352],
[416,288,16,16,304,368],
[416,288,16,16,304,384],
[416,288,16,16,288,400],
[416,288,16,16,288,416],
[416,288,16,16,288,432],
[416,288,16,16,304,448],
[416,288,16,16,288,464],
[400,272,16,16,304,400],
[416,272,16,16,304,416],
[400,272,16,16,304,432],
[400,272,16,16,288,448],
[400,272,16,16,304,464]],
[background_1190,
[288,288,32,32,272,320],
[256,288,32,32,304,320]]]];
this.objects = [
[{o:Walenty, x:80, y:112}],
[{o:podloze_ziemia, x:64, y:192}],
[{o:podloze_ziemia, x:96, y:192}],
[{o:podloze_ziemia, x:32, y:192}],
[{o:podloze_ziemia, x:128, y:192}],
[{o:podloze_ziemia, x:48, y:192}],
[{o:podloze_ziemia, x:80, y:192}],
[{o:podloze_ziemia, x:112, y:192}],
[{o:podloze_skos_lewy, x:16, y:192}],
[{o:podloze_skos_prawy, x:144, y:192}],
[{o:podloze_trawa, x:256, y:288}],
[{o:podloze_trawa, x:288, y:288}],
[{o:podloze_trawa, x:320, y:288}],
[{o:podloze_ziemia, x:224, y:144}],
[{o:podloze_ziemia, x:240, y:144}],
[{o:podloze_ziemia, x:304, y:96}],
[{o:podloze_ziemia, x:320, y:96}],
[{o:podloze_ziemia, x:416, y:64}],
[{o:podloze_ziemia, x:432, y:64}],
[{o:podloze_ziemia, x:496, y:96}],
[{o:podloze_ziemia, x:512, y:96}],
[{o:bonus, x:304, y:16}],
[{o:bonus, x:400, y:0}],
[{o:bonus, x:480, y:32}],
[{o:bonus, x:256, y:208}],
[{o:bonus, x:320, y:208}],
[{o:chmura, x:720, y:256}],
[{o:podloze_skos_prawy, x:560, y:240}],
[{o:podloze_skos_prawy, x:576, y:256}],
[{o:podloze_skos_prawy, x:592, y:272}],
[{o:podloze_skos_prawy, x:608, y:288}],
[{o:podloze_skos_prawy, x:624, y:304}],
[{o:podloze_skos_prawy, x:640, y:320}],
[{o:podloze_skos_lewy, x:800, y:368}],
[{o:podloze_skos_lewy, x:816, y:352}],
[{o:podloze_skos_lewy, x:832, y:336}],
[{o:podloze_skos_lewy, x:848, y:320}],
[{o:podloze_skos_lewy, x:864, y:304}],
[{o:podloze_skos_lewy, x:784, y:384}],
[{o:podloze_skos_lewy, x:768, y:400}],
[{o:podloze_skos_lewy, x:752, y:416}],
[{o:podloze_skos_lewy, x:736, y:448}],
[{o:podloze_skos_lewy, x:736, y:432}],
[{o:podloze_ziemia, x:736, y:448}],
[{o:podloze_ziemia, x:736, y:448}],
[{o:podloze_ziemia, x:752, y:432}],
[{o:podloze_ziemia, x:864, y:320}],
[{o:podloze_ziemia, x:848, y:336}],
[{o:podloze_ziemia, x:832, y:352}],
[{o:podloze_ziemia, x:816, y:368}],
[{o:podloze_ziemia, x:800, y:384}],
[{o:podloze_ziemia, x:784, y:400}],
[{o:podloze_ziemia, x:768, y:416}],
[{o:podloze_ziemia, x:880, y:304}],
[{o:podloze_ziemia, x:896, y:304}],
[{o:podloze_skos_prawy, x:912, y:304}],
[{o:podloze_skos_prawy, x:928, y:320}],
[{o:podloze_skos_prawy, x:944, y:336}],
[{o:podloze_skos_prawy, x:960, y:352}],
[{o:podloze_skos_prawy, x:976, y:368}],
[{o:podloze_skos_prawy, x:992, y:384}],
[{o:podloze_skos_prawy, x:1008, y:400}],
[{o:podloze_skos_prawy, x:1024, y:416}],
[{o:podloze_skos_prawy, x:1040, y:432}],
[{o:podloze_ziemia, x:1040, y:448}],
[{o:podloze_ziemia, x:912, y:320}],
[{o:podloze_ziemia, x:928, y:336}],
[{o:podloze_ziemia, x:944, y:352}],
[{o:podloze_ziemia, x:960, y:368}],
[{o:podloze_ziemia, x:976, y:384}],
[{o:podloze_ziemia, x:992, y:400}],
[{o:podloze_ziemia, x:1008, y:416}],
[{o:podloze_ziemia, x:1024, y:432}],
[{o:podloze_skos_lewy, x:1056, y:432}],
[{o:podloze_skos_lewy, x:1072, y:416}],
[{o:podloze_skos_lewy, x:1088, y:400}],
[{o:podloze_skos_lewy, x:1104, y:384}],
[{o:podloze_skos_lewy, x:1120, y:368}],
[{o:podloze_skos_lewy, x:1136, y:352}],
[{o:podloze_skos_lewy, x:1152, y:336}],
[{o:podloze_skos_prawy, x:1168, y:336}],
[{o:podloze_skos_prawy, x:1184, y:352}],
[{o:podloze_skos_prawy, x:1200, y:368}],
[{o:podloze_skos_prawy, x:1216, y:384}],
[{o:podloze_skos_prawy, x:1232, y:400}],
[{o:podloze_skos_prawy, x:1248, y:416}],
[{o:podloze_skos_prawy, x:1264, y:432}],
[{o:podloze_skos_prawy, x:1280, y:448}],
[{o:podloze_skos_prawy, x:1296, y:464}],
[{o:podloze_ziemia, x:1152, y:352}],
[{o:podloze_ziemia, x:1168, y:352}],
[{o:podloze_ziemia, x:1136, y:368}],
[{o:podloze_ziemia, x:1120, y:384}],
[{o:podloze_ziemia, x:1104, y:400}],
[{o:podloze_ziemia, x:1088, y:416}],
[{o:podloze_ziemia, x:1072, y:432}],
[{o:podloze_ziemia, x:1056, y:448}],
[{o:podloze_ziemia, x:1184, y:368}],
[{o:podloze_ziemia, x:1200, y:384}],
[{o:podloze_ziemia, x:1216, y:400}],
[{o:podloze_ziemia, x:1232, y:416}],
[{o:podloze_ziemia, x:1248, y:432}],
[{o:podloze_ziemia, x:1264, y:448}],
[{o:podloze_ziemia, x:1280, y:464}],
[{o:podloze_skos_lewy, x:1312, y:464}],
[{o:podloze_skos_lewy, x:1328, y:448}],
[{o:podloze_skos_lewy, x:1344, y:432}],
[{o:podloze_skos_lewy, x:1360, y:416}],
[{o:podloze_skos_lewy, x:1376, y:400}],
[{o:podloze_skos_lewy, x:1392, y:384}],
[{o:podloze_skos_lewy, x:1408, y:368}],
[{o:podloze_skos_lewy, x:1424, y:352}],
[{o:podloze_skos_lewy, x:1440, y:336}],
[{o:podloze_skos_lewy, x:1456, y:320}],
[{o:podloze_skos_lewy, x:1472, y:304}],
[{o:podloze_skos_lewy, x:1488, y:288}],
[{o:podloze_skos_prawy, x:1504, y:288}],
[{o:podloze_skos_prawy, x:1520, y:304}],
[{o:podloze_skos_prawy, x:1536, y:320}],
[{o:podloze_skos_prawy, x:1552, y:336}],
[{o:podloze_skos_prawy, x:1568, y:352}],
[{o:podloze_skos_prawy, x:1584, y:368}],
[{o:podloze_skos_prawy, x:1600, y:384}],
[{o:podloze_skos_prawy, x:1616, y:400}],
[{o:podloze_skos_prawy, x:1632, y:416}],
[{o:podloze_skos_prawy, x:1648, y:432}],
[{o:podloze_ziemia, x:1328, y:464}],
[{o:podloze_ziemia, x:1344, y:448}],
[{o:podloze_ziemia, x:1360, y:432}],
[{o:podloze_ziemia, x:1376, y:416}],
[{o:podloze_ziemia, x:1392, y:400}],
[{o:podloze_ziemia, x:1408, y:384}],
[{o:podloze_ziemia, x:1424, y:368}],
[{o:podloze_ziemia, x:1440, y:352}],
[{o:podloze_ziemia, x:1456, y:336}],
[{o:podloze_ziemia, x:1472, y:320}],
[{o:podloze_ziemia, x:1488, y:304}],
[{o:podloze_ziemia, x:1504, y:304}],
[{o:podloze_ziemia, x:1520, y:320}],
[{o:podloze_ziemia, x:1536, y:336}],
[{o:podloze_ziemia, x:1552, y:352}],
[{o:podloze_ziemia, x:1568, y:368}],
[{o:podloze_ziemia, x:1584, y:384}],
[{o:podloze_ziemia, x:1600, y:400}],
[{o:podloze_ziemia, x:1616, y:416}],
[{o:podloze_ziemia, x:1632, y:432}],
[{o:podloze_ziemia, x:1648, y:448}],
[{o:podloze_skos_lewy, x:544, y:240}],
[{o:podloze_skos_lewy, x:528, y:256}],
[{o:podloze_skos_lewy, x:512, y:272}],
[{o:podloze_skos_lewy, x:496, y:288}],
[{o:podloze_skos_lewy, x:480, y:304}],
[{o:podloze_skos_lewy, x:464, y:320}],
[{o:bonus, x:576, y:112}],
[{o:bonus, x:880, y:240}],
[{o:bonus, x:880, y:176}],
[{o:bonus, x:1152, y:256}],
[{o:bonus, x:1152, y:208}],
[{o:bonus, x:1488, y:224}],
[{o:bonus, x:1488, y:176}],
[{o:podloze_ziemia, x:480, y:320}],
[{o:podloze_ziemia, x:496, y:304}],
[{o:podloze_ziemia, x:512, y:288}],
[{o:podloze_ziemia, x:528, y:272}],
[{o:podloze_ziemia, x:560, y:256}],
[{o:podloze_ziemia, x:544, y:256}],
[{o:podloze_ziemia, x:576, y:272}],
[{o:podloze_ziemia, x:592, y:288}],
[{o:podloze_ziemia, x:608, y:304}],
[{o:podloze_ziemia, x:624, y:320}],
[{o:podloze_ziemia, x:640, y:336}],
[{o:podloze_ziemia, x:464, y:336}],
[{o:chmura, x:1280, y:336}],
[{o:chmura, x:1520, y:272}],
[{o:chmura, x:960, y:288}],
[{o:chmura, x:640, y:224}],
[{o:chmura, x:368, y:384}],
[{o:tasma_lewo, x:120, y:40}],
[{o:tasma_lewo, x:140, y:40}],
[{o:tasma_lewo, x:160, y:40}],
[{o:tasma_lewo, x:180, y:40}],
[{o:tasma_lewo, x:200, y:40}],
[{o:tasma_skraj, x:100, y:40}],
[{o:tasma_prawo, x:380, y:180}],
[{o:tasma_prawo, x:400, y:180}],
[{o:tasma_prawo, x:420, y:180}],
[{o:tasma_prawo, x:440, y:180}],
[{o:tasma_prawo, x:460, y:180}],
[{o:tasma_skraj, x:360, y:180}],
[{o:tasma_skraj_prawy, x:220, y:40}],
[{o:tasma_skraj_prawy, x:480, y:180}],
[{o:tasma_lewo, x:680, y:160}],
[{o:tasma_lewo, x:700, y:160}],
[{o:tasma_lewo, x:720, y:160}],
[{o:tasma_lewo, x:740, y:160}],
[{o:tasma_lewo, x:760, y:160}],
[{o:tasma_skraj, x:660, y:160}],
[{o:tasma_skraj_prawy, x:780, y:160}],
[{o:podloze_ziemia, x:620, y:120}],
[{o:podloze_ziemia, x:580, y:100}],
[{o:podloze_ziemia, x:860, y:200}],
[{o:podloze_ziemia, x:940, y:160}],
[{o:podloze_ziemia, x:800, y:240}],
[{o:kot_do_wziecia, x:1300, y:420}],
[{o:klocek, x:180, y:180}],
[{o:klocek, x:1020, y:120}],
[{o:klocek_ciemny, x:1120, y:80}],
[{o:bonus, x:1120, y:20}],
[{o:bonus, x:1020, y:60}],
[{o:klocek_ciemny, x:1220, y:60}],
[{o:klocek_ciemny, x:1380, y:60}],
[{o:bonus, x:1220, y:0}],
[{o:bonus, x:1300, y:0}],
[{o:bonus, x:1380, y:0}],
[{o:klocek, x:1300, y:60}],
[{o:podloze_ziemia, x:1328, y:320}],
[{o:podloze_ziemia, x:1312, y:320}],
[{o:podloze_ziemia, x:1296, y:320}],
[{o:podloze_ziemia, x:1344, y:320}],
[{o:podloze_ziemia, x:1264, y:320}],
[{o:podloze_ziemia, x:1280, y:320}],
[{o:podloze_ziemia, x:1264, y:304}],
[{o:wrog2, x:1312, y:224}],
[{o:kladka, x:384, y:400}],
[{o:kladka, x:1552, y:240}],
[{o:kladka, x:1552, y:128}],
[{o:klocek_ciemny, x:1488, y:144}],
[{o:klocek_ciemny, x:1456, y:32}],
[{o:podloze_ziemia, x:1344, y:304}],
[{o:podloze_ziemia, x:784, y:240}],
[{o:podloze_ziemia, x:768, y:240}],
[{o:chmura, x:40, y:300}],
[{o:filizanka_do_wziecia, x:1460, y:0}],
[{o:zlozona_dziewczyna, x:400, y:120}],
[{o:zlozona_dziewczyna, x:540, y:160}],
[{o:but_do_wziecia, x:624, y:400}],
[{o:klocek, x:608, y:448}],
[{o:klocek, x:640, y:448}],
[{o:zlozona_dziewczyna, x:500, y:20}]];
this.start = function() {
__room_start__(this, Piramidy, 1660, 480, 30, 0, 255, 255, null, 0, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane=['filizanka','kot','but'];
};
}
var Piramidy = new __Piramidy();
tu_scenes.push(Piramidy);
function __Sfinks() { 
this.tiles = [
[1000000,
[background_1190,
[0,32,32,32,2736,448],
[32,32,32,32,2688,448],
[0,64,32,32,2720,464],
[0,64,32,32,2752,464],
[0,64,32,32,2736,448],
[128,256,32,32,3200,416]],
[background_3,
[144,256,16,16,0,416],
[144,256,16,16,16,416],
[144,256,16,16,32,416],
[144,256,16,16,48,416],
[144,256,16,16,64,416],
[144,256,16,16,80,416],
[144,272,16,16,0,432],
[144,272,16,16,16,432],
[144,272,16,16,32,432],
[144,272,16,16,48,432],
[144,272,16,16,64,432],
[144,272,16,16,80,432],
[144,288,16,16,0,448],
[144,288,16,16,16,448],
[144,288,16,16,32,448],
[144,288,16,16,48,448],
[144,288,16,16,64,448],
[144,288,16,16,80,448],
[128,240,16,16,0,400],
[176,240,16,16,80,400],
[160,240,16,16,16,400],
[160,240,16,16,32,400],
[160,240,16,16,48,400],
[160,240,16,16,64,400],
[128,256,16,16,2352,400],
[128,272,16,16,2352,416],
[128,288,16,16,2352,432],
[144,256,16,16,2368,400],
[144,272,16,16,2368,416],
[144,288,16,16,2368,432],
[144,304,16,16,2368,448],
[160,256,16,16,2384,400],
[160,272,16,16,2384,416],
[160,288,16,16,2384,432],
[160,304,16,16,2384,448],
[176,304,16,16,2400,448],
[176,288,16,16,2400,432],
[176,272,16,16,2400,416],
[176,256,16,16,2400,400],
[176,256,16,16,2400,464],
[192,256,16,16,2416,400],
[208,256,16,16,2432,400],
[240,256,16,16,2448,400],
[192,272,16,16,2416,416],
[208,272,16,16,2432,416],
[240,272,16,16,2448,416],
[192,288,16,16,2416,432],
[208,288,16,16,2432,432],
[240,288,16,16,2448,432],
[192,304,16,16,2416,448],
[208,304,16,16,2432,448],
[240,304,16,16,2448,448],
[192,304,16,16,2768,448],
[192,288,16,16,2768,432],
[192,272,16,16,2768,416],
[208,256,16,16,2784,400],
[224,256,16,16,2800,400],
[240,256,16,16,2816,400],
[208,272,16,16,2784,416],
[224,272,16,16,2800,416],
[240,272,16,16,2816,416],
[208,288,16,16,2784,432],
[224,288,16,16,2800,432],
[240,288,16,16,2816,432],
[208,304,16,16,2784,448],
[224,304,16,16,2800,448],
[240,304,16,16,2816,448],
[192,304,16,16,2832,448],
[192,288,16,16,2832,432],
[192,272,16,16,2832,416],
[192,256,16,16,2832,400],
[208,256,16,16,2848,400],
[208,272,16,16,2848,416],
[208,288,16,16,2848,432],
[208,304,16,16,2848,448],
[224,304,16,16,2864,448],
[240,304,16,16,2880,448],
[240,288,16,16,2880,432],
[224,288,16,16,2864,432],
[224,272,16,16,2864,416],
[240,272,16,16,2880,416],
[240,256,16,16,2880,400],
[224,256,16,16,2864,400],
[192,256,16,16,2896,400],
[192,272,16,16,2896,416],
[192,288,16,16,2896,432],
[192,304,16,16,2896,448],
[208,304,16,16,2912,448],
[224,304,16,16,2928,448],
[240,304,16,16,2944,448],
[240,288,16,16,2944,432],
[224,288,16,16,2928,432],
[208,288,16,16,2912,432],
[208,272,16,16,2912,416],
[224,272,16,16,2928,416],
[240,272,16,16,2944,416],
[240,256,16,16,2944,400],
[224,256,16,16,2928,400],
[208,256,16,16,2912,400],
[192,256,16,16,2960,400],
[192,272,16,16,2960,416],
[192,288,16,16,2960,432],
[192,304,16,16,2960,448],
[208,288,16,16,2976,432],
[208,272,16,16,2976,416],
[208,256,16,16,2976,400],
[224,256,16,16,2992,400],
[240,256,16,16,3008,400],
[224,272,16,16,2992,416],
[448,80,16,16,2800,384],
[464,80,16,16,2816,384],
[480,80,16,16,2832,384],
[496,80,16,16,2848,384],
[496,64,16,16,2848,368],
[496,48,16,16,2848,352],
[496,32,16,16,2848,336],
[480,64,16,16,2832,368],
[464,64,16,16,2816,368],
[480,48,16,16,2832,352],
[448,32,16,16,2864,336],
[448,48,16,16,2864,352],
[448,64,16,16,2864,368],
[448,80,16,16,2864,384],
[464,80,16,16,2880,384],
[480,80,16,16,2896,384],
[496,80,16,16,2912,384],
[496,64,16,16,2912,368],
[496,48,16,16,2912,352],
[496,32,16,16,2912,336],
[480,32,16,16,2896,336],
[464,32,16,16,2880,336],
[464,48,16,16,2880,352],
[464,48,16,16,2880,368],
[464,48,16,16,2896,368],
[464,48,16,16,2896,352],
[448,32,16,16,2928,336],
[448,48,16,16,2928,352],
[448,64,16,16,2928,368],
[448,80,16,16,2928,384],
[464,80,16,16,2944,384],
[480,80,16,16,2960,384],
[496,80,16,16,2976,384],
[496,64,16,16,2976,368],
[496,48,16,16,2976,352],
[496,32,16,16,2976,336],
[480,32,16,16,2960,336],
[464,32,16,16,2944,336],
[464,48,16,16,2944,352],
[480,48,16,16,2960,352],
[464,64,16,16,2944,368],
[480,64,16,16,2960,368],
[448,32,16,16,2992,336],
[464,32,16,16,3008,336],
[480,32,16,16,3024,336],
[496,32,16,16,3040,336],
[496,48,16,16,3040,352],
[496,64,16,16,3040,368],
[480,80,16,16,3024,384],
[464,80,16,16,3008,384],
[448,80,16,16,2992,384],
[448,64,16,16,2992,368],
[448,48,16,16,2992,352],
[464,48,16,16,3008,352],
[480,48,16,16,3024,352],
[464,64,16,16,3008,368],
[480,64,16,16,3024,368],
[448,32,16,16,3056,336],
[464,32,16,16,3072,336],
[480,32,16,16,3088,336],
[496,32,16,16,3104,336],
[448,48,16,16,3056,352],
[448,64,16,16,3056,368],
[448,80,16,16,3056,384],
[464,80,16,16,3072,384],
[480,80,16,16,3088,384],
[496,80,16,16,3104,384],
[496,64,16,16,3104,368],
[496,48,16,16,3104,352],
[464,48,16,16,3072,352],
[480,48,16,16,3088,352],
[464,64,16,16,3072,368],
[480,64,16,16,3088,368],
[448,32,16,16,3120,336],
[448,48,16,16,3120,352],
[448,64,16,16,3120,368],
[448,80,16,16,3120,384],
[464,80,16,16,3136,384],
[480,80,16,16,3152,384],
[496,80,16,16,3168,384],
[496,64,16,16,3168,368],
[480,64,16,16,3152,352],
[480,64,16,16,3152,368],
[464,64,16,16,3136,368],
[464,48,16,16,3136,352],
[208,256,16,16,3072,400],
[224,256,16,16,3088,400],
[240,256,16,16,3104,400],
[240,272,16,16,3104,416],
[224,272,16,16,3088,416],
[192,256,16,16,3120,400],
[208,256,16,16,3136,400],
[224,256,16,16,3152,400],
[240,256,16,16,3168,400],
[448,0,16,16,3184,368],
[464,0,16,16,3200,368],
[448,16,16,16,3184,384],
[464,16,16,16,3200,384],
[192,256,16,16,3184,400],
[208,256,16,16,3200,400],
[208,272,16,16,3200,416],
[480,80,16,16,2864,320],
[496,80,16,16,2880,320],
[496,64,16,16,2880,304],
[448,80,16,16,2896,320],
[448,64,16,16,2896,304],
[448,48,16,16,2896,288],
[464,80,16,16,2912,320],
[464,64,16,16,2912,304],
[464,48,16,16,2912,288],
[464,32,16,16,2912,272],
[480,32,16,16,2928,272],
[496,32,16,16,2944,272],
[496,48,16,16,2944,288],
[496,64,16,16,2944,304],
[496,80,16,16,2944,320],
[480,80,16,16,2928,320],
[480,64,16,16,2928,304],
[480,48,16,16,2928,288],
[448,32,16,16,2960,272],
[448,48,16,16,2960,288],
[448,64,16,16,2960,304],
[448,80,16,16,2960,320],
[464,80,16,16,2976,320],
[480,80,16,16,2992,320],
[496,80,16,16,3008,320],
[496,64,16,16,3008,304],
[496,48,16,16,3008,288],
[496,32,16,16,3008,272],
[480,32,16,16,2992,272],
[464,32,16,16,2976,272],
[464,48,16,16,2976,288],
[480,48,16,16,2992,288],
[464,64,16,16,2976,304],
[480,64,16,16,2992,304],
[448,80,16,16,3024,320],
[448,64,16,16,3024,304],
[448,48,16,16,3024,288],
[448,32,16,16,3024,272],
[464,32,16,16,3040,272],
[480,32,16,16,3056,272],
[464,48,16,16,3040,288],
[480,48,16,16,3056,288],
[496,48,16,16,3072,288],
[464,64,16,16,3040,304],
[480,64,16,16,3056,304],
[496,64,16,16,3072,304],
[496,80,16,16,3072,320],
[480,80,16,16,3056,320],
[464,80,16,16,3040,320],
[448,80,16,16,3088,320],
[448,64,16,16,3088,304],
[464,80,16,16,3104,320],
[448,144,16,16,2928,256],
[464,144,16,16,2944,256],
[480,144,16,16,2960,256],
[496,144,16,16,2976,256],
[496,128,16,16,2976,240],
[496,112,16,16,2976,224],
[496,96,16,16,2976,208],
[480,112,16,16,2960,224],
[480,128,16,16,2960,240],
[464,128,16,16,2944,240],
[448,96,16,16,2992,208],
[448,112,16,16,2992,224],
[448,128,16,16,2992,240],
[448,144,16,16,2992,256],
[464,144,16,16,3008,256],
[480,144,16,16,3024,256],
[496,144,16,16,3040,256],
[480,128,16,16,3024,240],
[464,128,16,16,3008,240],
[464,112,16,16,3008,224],
[448,0,16,16,224,448],
[448,0,16,16,464,320],
[464,0,16,16,544,352],
[464,16,16,16,528,384],
[192,256,16,16,2768,400]]]];
this.objects = [
[{o:podloze_skos_lewy, x:432, y:352}],
[{o:podloze_skos_lewy, x:448, y:336}],
[{o:podloze_skos_lewy, x:464, y:320}],
[{o:podloze_ziemia, x:448, y:352}],
[{o:podloze_ziemia, x:464, y:352}],
[{o:podloze_ziemia, x:464, y:336}],
[{o:podloze_ziemia, x:480, y:336}],
[{o:podloze_ziemia, x:480, y:320}],
[{o:podloze_ziemia, x:480, y:352}],
[{o:podloze_ziemia, x:496, y:352}],
[{o:podloze_ziemia, x:512, y:352}],
[{o:podloze_ziemia, x:528, y:336}],
[{o:podloze_ziemia, x:512, y:320}],
[{o:podloze_ziemia, x:512, y:336}],
[{o:podloze_ziemia, x:496, y:336}],
[{o:podloze_ziemia, x:496, y:320}],
[{o:podloze_skos_prawy, x:528, y:320}],
[{o:podloze_ziemia, x:448, y:368}],
[{o:podloze_ziemia, x:464, y:368}],
[{o:podloze_ziemia, x:480, y:368}],
[{o:podloze_ziemia, x:496, y:368}],
[{o:podloze_ziemia, x:496, y:384}],
[{o:podloze_ziemia, x:480, y:384}],
[{o:podloze_ziemia, x:464, y:384}],
[{o:podloze_ziemia, x:448, y:384}],
[{o:podloze_ziemia, x:432, y:384}],
[{o:podloze_ziemia, x:432, y:368}],
[{o:podloze_ziemia, x:512, y:368}],
[{o:podloze_ziemia, x:528, y:368}],
[{o:podloze_ziemia, x:528, y:352}],
[{o:podloze_ziemia, x:496, y:400}],
[{o:podloze_ziemia, x:496, y:416}],
[{o:podloze_ziemia, x:512, y:416}],
[{o:podloze_ziemia, x:528, y:432}],
[{o:podloze_ziemia, x:544, y:432}],
[{o:podloze_ziemia, x:560, y:432}],
[{o:podloze_ziemia, x:560, y:448}],
[{o:podloze_ziemia, x:544, y:448}],
[{o:podloze_ziemia, x:528, y:448}],
[{o:podloze_ziemia, x:512, y:448}],
[{o:podloze_ziemia, x:512, y:432}],
[{o:podloze_ziemia, x:480, y:432}],
[{o:podloze_ziemia, x:496, y:448}],
[{o:podloze_ziemia, x:480, y:448}],
[{o:podloze_ziemia, x:496, y:432}],
[{o:podloze_ziemia, x:480, y:416}],
[{o:podloze_ziemia, x:480, y:400}],
[{o:podloze_ziemia, x:464, y:400}],
[{o:podloze_ziemia, x:432, y:400}],
[{o:podloze_ziemia, x:448, y:400}],
[{o:podloze_ziemia, x:432, y:416}],
[{o:podloze_ziemia, x:448, y:416}],
[{o:podloze_ziemia, x:464, y:416}],
[{o:podloze_ziemia, x:464, y:432}],
[{o:podloze_ziemia, x:464, y:448}],
[{o:podloze_ziemia, x:448, y:448}],
[{o:podloze_ziemia, x:448, y:432}],
[{o:podloze_ziemia, x:432, y:432}],
[{o:podloze_ziemia, x:432, y:448}],
[{o:podloze_ziemia, x:400, y:448}],
[{o:podloze_ziemia, x:416, y:432}],
[{o:podloze_ziemia, x:416, y:448}],
[{o:podloze_ziemia, x:416, y:416}],
[{o:podloze_ziemia, x:400, y:416}],
[{o:podloze_ziemia, x:400, y:432}],
[{o:podloze_ziemia, x:384, y:432}],
[{o:podloze_ziemia, x:384, y:448}],
[{o:podloze_ziemia, x:384, y:416}],
[{o:podloze_ziemia, x:368, y:432}],
[{o:podloze_ziemia, x:368, y:448}],
[{o:podloze_ziemia, x:352, y:448}],
[{o:podloze_ziemia, x:352, y:432}],
[{o:podloze_ziemia, x:336, y:432}],
[{o:podloze_ziemia, x:336, y:448}],
[{o:podloze_ziemia, x:320, y:448}],
[{o:podloze_ziemia, x:320, y:432}],
[{o:podloze_ziemia, x:304, y:432}],
[{o:podloze_ziemia, x:304, y:448}],
[{o:podloze_ziemia, x:272, y:448}],
[{o:podloze_ziemia, x:288, y:448}],
[{o:podloze_ziemia, x:288, y:432}],
[{o:podloze_ziemia, x:272, y:432}],
[{o:podloze_ziemia, x:256, y:448}],
[{o:podloze_ziemia, x:240, y:448}],
[{o:podloze_ziemia, x:240, y:464}],
[{o:podloze_ziemia, x:560, y:464}],
[{o:podloze_ziemia, x:544, y:464}],
[{o:podloze_ziemia, x:528, y:464}],
[{o:podloze_ziemia, x:512, y:464}],
[{o:podloze_ziemia, x:496, y:464}],
[{o:podloze_ziemia, x:480, y:464}],
[{o:podloze_ziemia, x:464, y:464}],
[{o:podloze_ziemia, x:448, y:464}],
[{o:podloze_ziemia, x:432, y:464}],
[{o:podloze_ziemia, x:416, y:464}],
[{o:podloze_ziemia, x:400, y:464}],
[{o:podloze_ziemia, x:384, y:464}],
[{o:podloze_ziemia, x:368, y:464}],
[{o:podloze_ziemia, x:352, y:464}],
[{o:podloze_ziemia, x:336, y:464}],
[{o:podloze_ziemia, x:320, y:464}],
[{o:podloze_ziemia, x:304, y:464}],
[{o:podloze_ziemia, x:288, y:464}],
[{o:podloze_ziemia, x:272, y:464}],
[{o:podloze_ziemia, x:256, y:464}],
[{o:podloze_ziemia, x:224, y:464}],
[{o:podloze_ziemia, x:208, y:464}],
[{o:podloze_ziemia, x:192, y:464}],
[{o:podloze_ziemia, x:176, y:464}],
[{o:podloze_ziemia, x:160, y:464}],
[{o:podloze_ziemia, x:128, y:464}],
[{o:podloze_ziemia, x:144, y:464}],
[{o:podloze_ziemia, x:112, y:464}],
[{o:podloze_ziemia, x:96, y:464}],
[{o:podloze_ziemia, x:80, y:464}],
[{o:podloze_ziemia, x:64, y:464}],
[{o:podloze_ziemia, x:48, y:464}],
[{o:podloze_ziemia, x:16, y:464}],
[{o:podloze_ziemia, x:32, y:464}],
[{o:podloze_ziemia, x:0, y:464}],
[{o:podloze_ziemia, x:576, y:464}],
[{o:podloze_ziemia, x:592, y:464}],
[{o:podloze_ziemia, x:608, y:464}],
[{o:podloze_ziemia, x:624, y:464}],
[{o:podloze_ziemia, x:128, y:400}],
[{o:podloze_ziemia, x:144, y:400}],
[{o:podloze_ziemia, x:0, y:368}],
[{o:podloze_ziemia, x:16, y:368}],
[{o:podloze_ziemia, x:32, y:368}],
[{o:podloze_ziemia, x:48, y:368}],
[{o:podloze_ziemia, x:64, y:368}],
[{o:podloze_ziemia, x:80, y:368}],
[{o:podloze_ziemia, x:80, y:384}],
[{o:podloze_ziemia, x:64, y:384}],
[{o:podloze_ziemia, x:48, y:384}],
[{o:podloze_ziemia, x:32, y:384}],
[{o:podloze_ziemia, x:16, y:384}],
[{o:podloze_ziemia, x:0, y:384}],
[{o:podloze_ziemia, x:3120, y:464}],
[{o:podloze_ziemia, x:3136, y:464}],
[{o:podloze_ziemia, x:3152, y:464}],
[{o:podloze_ziemia, x:3168, y:464}],
[{o:podloze_ziemia, x:3184, y:464}],
[{o:podloze_ziemia, x:3200, y:464}],
[{o:podloze_ziemia, x:3216, y:464}],
[{o:podloze_ziemia, x:3232, y:464}],
[{o:podloze_ziemia, x:3248, y:464}],
[{o:podloze_ziemia, x:3264, y:464}],
[{o:podloze_ziemia, x:3280, y:464}],
[{o:podloze_ziemia, x:3296, y:464}],
[{o:podloze_ziemia, x:3312, y:464}],
[{o:podloze_ziemia, x:3104, y:464}],
[{o:podloze_trawa, x:3120, y:432}],
[{o:podloze_trawa, x:3152, y:432}],
[{o:podloze_trawa, x:3184, y:432}],
[{o:podloze_trawa, x:3216, y:432}],
[{o:podloze_trawa, x:3248, y:432}],
[{o:podloze_trawa, x:3280, y:432}],
[{o:podloze_trawa, x:3312, y:432}],
[{o:podloze_ziemia, x:3088, y:464}],
[{o:podloze_ziemia, x:3104, y:448}],
[{o:podloze_ziemia, x:3072, y:464}],
[{o:podloze_ziemia, x:3088, y:448}],
[{o:podloze_ziemia, x:3104, y:432}],
[{o:podloze_ziemia, x:3120, y:416}],
[{o:podloze_ziemia, x:3136, y:416}],
[{o:klocek, x:3040, y:448}],
[{o:klocek, x:3008, y:448}],
[{o:podloze_ziemia, x:3072, y:448}],
[{o:podloze_ziemia, x:3152, y:416}],
[{o:podloze_ziemia, x:3056, y:432}],
[{o:podloze_ziemia, x:3040, y:432}],
[{o:podloze_ziemia, x:3024, y:432}],
[{o:podloze_ziemia, x:3008, y:432}],
[{o:podloze_ziemia, x:2992, y:448}],
[{o:podloze_ziemia, x:2992, y:464}],
[{o:podloze_ziemia, x:3072, y:432}],
[{o:podloze_ziemia, x:3088, y:432}],
[{o:podloze_ziemia, x:3072, y:416}],
[{o:podloze_ziemia, x:3056, y:416}],
[{o:podloze_ziemia, x:3040, y:416}],
[{o:podloze_ziemia, x:3024, y:416}],
[{o:podloze_ziemia, x:3008, y:416}],
[{o:podloze_ziemia, x:2992, y:432}],
[{o:podloze_ziemia, x:2976, y:448}],
[{o:podloze_ziemia, x:2976, y:464}],
[{o:podloze_ziemia, x:2960, y:464}],
[{o:podloze_ziemia, x:3024, y:400}],
[{o:podloze_ziemia, x:3040, y:400}],
[{o:podloze_ziemia, x:3056, y:400}],
[{o:podloze_ziemia, x:3040, y:384}],
[{o:podloze_ziemia, x:2944, y:464}],
[{o:podloze_ziemia, x:2928, y:464}],
[{o:podloze_ziemia, x:2912, y:464}],
[{o:podloze_ziemia, x:2896, y:464}],
[{o:podloze_ziemia, x:2880, y:464}],
[{o:podloze_ziemia, x:2864, y:464}],
[{o:podloze_ziemia, x:2848, y:464}],
[{o:podloze_ziemia, x:2832, y:464}],
[{o:podloze_ziemia, x:2816, y:464}],
[{o:podloze_ziemia, x:3168, y:416}],
[{o:podloze_ziemia, x:3184, y:416}],
[{o:podloze_ziemia, x:2800, y:464}],
[{o:podloze_ziemia, x:2752, y:432}],
[{o:podloze_ziemia, x:2704, y:448}],
[{o:podloze_ziemia, x:2688, y:448}],
[{o:podloze_ziemia, x:2672, y:448}],
[{o:podloze_ziemia, x:2624, y:464}],
[{o:podloze_ziemia, x:2608, y:464}],
[{o:podloze_ziemia, x:2592, y:464}],
[{o:podloze_ziemia, x:2560, y:448}],
[{o:podloze_ziemia, x:2528, y:448}],
[{o:podloze_ziemia, x:2480, y:464}],
[{o:podloze_ziemia, x:2448, y:464}],
[{o:tasma_lewo, x:2656, y:400}],
[{o:tasma_skraj, x:2640, y:400}],
[{o:tasma_lewo, x:2672, y:400}],
[{o:tasma_lewo, x:2688, y:400}],
[{o:tasma_lewo, x:2704, y:400}],
[{o:tasma_skraj_prawy, x:2720, y:400}],
[{o:tasma_skraj, x:2512, y:320}],
[{o:tasma_skraj_prawy, x:2592, y:320}],
[{o:tasma_prawo, x:2528, y:320}],
[{o:tasma_prawo, x:2544, y:320}],
[{o:tasma_prawo, x:2560, y:320}],
[{o:tasma_prawo, x:2576, y:320}],
[{o:podloze_ziemia, x:1648, y:464}],
[{o:podloze_ziemia, x:1680, y:464}],
[{o:podloze_ziemia, x:1744, y:464}],
[{o:podloze_trawa, x:1760, y:448}],
[{o:podloze_trawa, x:2416, y:464}],
[{o:podloze_trawa, x:2368, y:464}],
[{o:podloze_trawa, x:2336, y:448}],
[{o:podloze_ziemia, x:2320, y:464}],
[{o:podloze_ziemia, x:2272, y:464}],
[{o:podloze_ziemia, x:2256, y:464}],
[{o:podloze_ziemia, x:2240, y:464}],
[{o:podloze_ziemia, x:2256, y:448}],
[{o:podloze_ziemia, x:2224, y:448}],
[{o:podloze_ziemia, x:2240, y:448}],
[{o:podloze_ziemia, x:2224, y:464}],
[{o:podloze_ziemia, x:2240, y:432}],
[{o:podloze_ziemia, x:2208, y:464}],
[{o:podloze_ziemia, x:2208, y:416}],
[{o:podloze_trawa, x:2160, y:384}],
[{o:podloze_trawa, x:2128, y:448}],
[{o:bonus, x:2160, y:336}],
[{o:bonus, x:2128, y:368}],
[{o:podloze_trawa, x:2064, y:448}],
[{o:podloze_trawa, x:2032, y:448}],
[{o:podloze_trawa, x:2016, y:448}],
[{o:podloze_trawa, x:1984, y:448}],
[{o:podloze_trawa, x:1936, y:448}],
[{o:podloze_trawa, x:1952, y:448}],
[{o:klocek_ciemny, x:2064, y:352}],
[{o:klocek, x:2016, y:304}],
[{o:podloze_trawa, x:704, y:448}],
[{o:podloze_trawa, x:768, y:448}],
[{o:podloze_trawa, x:832, y:448}],
[{o:podloze_trawa, x:896, y:448}],
[{o:podloze_trawa, x:960, y:448}],
[{o:podloze_trawa, x:1024, y:448}],
[{o:podloze_trawa, x:1088, y:448}],
[{o:podloze_trawa, x:1152, y:448}],
[{o:podloze_trawa, x:1216, y:448}],
[{o:podloze_trawa, x:1280, y:448}],
[{o:podloze_trawa, x:1344, y:448}],
[{o:podloze_trawa, x:1408, y:448}],
[{o:podloze_trawa, x:1408, y:416}],
[{o:podloze_trawa, x:1440, y:384}],
[{o:podloze_trawa, x:1472, y:352}],
[{o:podloze_trawa, x:1504, y:384}],
[{o:podloze_trawa, x:1536, y:416}],
[{o:podloze_trawa, x:1568, y:464}],
[{o:podloze_ziemia, x:3168, y:352}],
[{o:podloze_ziemia, x:3152, y:352}],
[{o:podloze_ziemia, x:3152, y:336}],
[{o:podloze_ziemia, x:3136, y:336}],
[{o:podloze_ziemia, x:3136, y:320}],
[{o:podloze_ziemia, x:3120, y:320}],
[{o:podloze_ziemia, x:3120, y:304}],
[{o:podloze_ziemia, x:3104, y:304}],
[{o:podloze_ziemia, x:3104, y:288}],
[{o:podloze_ziemia, x:3088, y:288}],
[{o:podloze_ziemia, x:3088, y:272}],
[{o:podloze_ziemia, x:3072, y:272}],
[{o:podloze_ziemia, x:3072, y:256}],
[{o:podloze_ziemia, x:3056, y:256}],
[{o:podloze_ziemia, x:3056, y:240}],
[{o:podloze_ziemia, x:3040, y:240}],
[{o:podloze_ziemia, x:3040, y:224}],
[{o:podloze_ziemia, x:3024, y:224}],
[{o:podloze_ziemia, x:3008, y:208}],
[{o:podloze_ziemia, x:3008, y:208}],
[{o:podloze_ziemia, x:3024, y:208}],
[{o:podloze_ziemia, x:3008, y:192}],
[{o:podloze_ziemia, x:2992, y:192}],
[{o:podloze_ziemia, x:2976, y:176}],
[{o:podloze_ziemia, x:2992, y:176}],
[{o:podloze_ziemia, x:2976, y:192}],
[{o:podloze_ziemia, x:2960, y:192}],
[{o:podloze_ziemia, x:2960, y:208}],
[{o:podloze_ziemia, x:2944, y:208}],
[{o:podloze_ziemia, x:2944, y:224}],
[{o:podloze_ziemia, x:2928, y:224}],
[{o:podloze_ziemia, x:2928, y:240}],
[{o:podloze_ziemia, x:2912, y:240}],
[{o:podloze_ziemia, x:2912, y:256}],
[{o:podloze_ziemia, x:2896, y:256}],
[{o:podloze_ziemia, x:2896, y:272}],
[{o:podloze_ziemia, x:2880, y:272}],
[{o:podloze_ziemia, x:2880, y:288}],
[{o:podloze_ziemia, x:2864, y:288}],
[{o:podloze_ziemia, x:2864, y:304}],
[{o:podloze_ziemia, x:2848, y:304}],
[{o:podloze_ziemia, x:2848, y:320}],
[{o:podloze_ziemia, x:2832, y:320}],
[{o:podloze_ziemia, x:2832, y:336}],
[{o:podloze_ziemia, x:2816, y:336}],
[{o:podloze_ziemia, x:2816, y:352}],
[{o:podloze_ziemia, x:2800, y:352}],
[{o:podloze_ziemia, x:2800, y:368}],
[{o:podloze_ziemia, x:2784, y:368}],
[{o:podloze_ziemia, x:2784, y:384}],
[{o:podloze_ziemia, x:2768, y:384}],
[{o:podloze_ziemia, x:2752, y:400}],
[{o:podloze_ziemia, x:2752, y:416}],
[{o:podloze_ziemia, x:2736, y:416}],
[{o:podloze_ziemia, x:2736, y:432}],
[{o:podloze_ziemia, x:2720, y:432}],
[{o:podloze_ziemia, x:2720, y:448}],
[{o:podloze_ziemia, x:1920, y:432}],
[{o:podloze_ziemia, x:1920, y:448}],
[{o:podloze_ziemia, x:1920, y:464}],
[{o:podloze_ziemia, x:2096, y:432}],
[{o:podloze_ziemia, x:2096, y:448}],
[{o:podloze_ziemia, x:2096, y:464}],
[{o:wrog1, x:2016, y:400}],
[{o:podloze_ziemia, x:1808, y:256}],
[{o:podloze_ziemia, x:1824, y:256}],
[{o:podloze_ziemia, x:1840, y:256}],
[{o:podloze_ziemia, x:1856, y:256}],
[{o:podloze_ziemia, x:1872, y:256}],
[{o:podloze_ziemia, x:1888, y:256}],
[{o:podloze_ziemia, x:1792, y:256}],
[{o:podloze_ziemia, x:1792, y:240}],
[{o:podloze_ziemia, x:1792, y:224}],
[{o:podloze_ziemia, x:1792, y:192}],
[{o:podloze_ziemia, x:1792, y:208}],
[{o:podloze_ziemia, x:1792, y:176}],
[{o:podloze_ziemia, x:1792, y:160}],
[{o:podloze_ziemia, x:1904, y:256}],
[{o:podloze_ziemia, x:1920, y:256}],
[{o:podloze_ziemia, x:1936, y:256}],
[{o:podloze_ziemia, x:1936, y:240}],
[{o:podloze_ziemia, x:1936, y:224}],
[{o:podloze_ziemia, x:1936, y:208}],
[{o:podloze_ziemia, x:1936, y:192}],
[{o:podloze_ziemia, x:1936, y:176}],
[{o:podloze_ziemia, x:1936, y:160}],
[{o:podloze_ziemia, x:1920, y:160}],
[{o:podloze_ziemia, x:1904, y:160}],
[{o:podloze_ziemia, x:1888, y:160}],
[{o:podloze_ziemia, x:1872, y:160}],
[{o:podloze_ziemia, x:1856, y:160}],
[{o:podloze_ziemia, x:1840, y:160}],
[{o:podloze_ziemia, x:1824, y:160}],
[{o:podloze_ziemia, x:1808, y:160}],
[{o:podloze_ziemia, x:1392, y:304}],
[{o:podloze_ziemia, x:1376, y:304}],
[{o:podloze_ziemia, x:1376, y:288}],
[{o:podloze_ziemia, x:1392, y:288}],
[{o:podloze_ziemia, x:1360, y:272}],
[{o:podloze_ziemia, x:1328, y:256}],
[{o:podloze_ziemia, x:1312, y:256}],
[{o:podloze_trawa, x:1280, y:272}],
[{o:podloze_trawa, x:1248, y:256}],
[{o:podloze_ziemia, x:1232, y:240}],
[{o:podloze_ziemia, x:1200, y:256}],
[{o:podloze_ziemia, x:1184, y:256}],
[{o:podloze_ziemia, x:1168, y:256}],
[{o:podloze_ziemia, x:1152, y:256}],
[{o:podloze_ziemia, x:1136, y:256}],
[{o:podloze_ziemia, x:1120, y:256}],
[{o:podloze_ziemia, x:1104, y:256}],
[{o:podloze_ziemia, x:1088, y:256}],
[{o:podloze_ziemia, x:1072, y:272}],
[{o:podloze_ziemia, x:1056, y:272}],
[{o:podloze_ziemia, x:1040, y:272}],
[{o:podloze_ziemia, x:1024, y:272}],
[{o:podloze_ziemia, x:1072, y:272}],
[{o:podloze_ziemia, x:1088, y:272}],
[{o:podloze_ziemia, x:1008, y:272}],
[{o:podloze_ziemia, x:1008, y:256}],
[{o:podloze_ziemia, x:1200, y:240}],
[{o:podloze_ziemia, x:1216, y:224}],
[{o:podloze_ziemia, x:1200, y:208}],
[{o:podloze_trawa, x:1344, y:320}],
[{o:podloze_trawa, x:1312, y:304}],
[{o:podloze_ziemia, x:1296, y:256}],
[{o:podloze_ziemia, x:1280, y:256}],
[{o:podloze_ziemia, x:1344, y:256}],
[{o:podloze_ziemia, x:1328, y:288}],
[{o:podloze_ziemia, x:1312, y:288}],
[{o:podloze_ziemia, x:1344, y:304}],
[{o:podloze_ziemia, x:1360, y:304}],
[{o:podloze_ziemia, x:1344, y:288}],
[{o:podloze_ziemia, x:1360, y:288}],
[{o:podloze_ziemia, x:1344, y:272}],
[{o:podloze_ziemia, x:1328, y:272}],
[{o:podloze_ziemia, x:1312, y:256}],
[{o:podloze_ziemia, x:1360, y:256}],
[{o:podloze_ziemia, x:1312, y:272}],
[{o:wrog1, x:1168, y:208}],
[{o:podloze_trawa, x:1312, y:224}],
[{o:podloze_trawa, x:1248, y:160}],
[{o:podloze_trawa, x:1216, y:128}],
[{o:podloze_trawa, x:1200, y:160}],
[{o:wrog1, x:1312, y:176}],
[{o:podloze_skos_prawy, x:1376, y:272}],
[{o:podloze_ziemia, x:1344, y:192}],
[{o:podloze_ziemia, x:1344, y:208}],
[{o:podloze_ziemia, x:1344, y:224}],
[{o:podloze_ziemia, x:1360, y:240}],
[{o:podloze_ziemia, x:1360, y:224}],
[{o:podloze_ziemia, x:1360, y:208}],
[{o:podloze_ziemia, x:1376, y:224}],
[{o:podloze_ziemia, x:1424, y:256}],
[{o:podloze_ziemia, x:1408, y:240}],
[{o:podloze_ziemia, x:1392, y:240}],
[{o:podloze_ziemia, x:1072, y:224}],
[{o:podloze_ziemia, x:1248, y:112}],
[{o:podloze_ziemia, x:1264, y:112}],
[{o:podloze_ziemia, x:1280, y:112}],
[{o:podloze_ziemia, x:1280, y:112}],
[{o:podloze_ziemia, x:1296, y:112}],
[{o:podloze_ziemia, x:1312, y:128}],
[{o:podloze_ziemia, x:1312, y:112}],
[{o:podloze_ziemia, x:1264, y:96}],
[{o:podloze_ziemia, x:1280, y:80}],
[{o:podloze_ziemia, x:1296, y:64}],
[{o:podloze_ziemia, x:1312, y:48}],
[{o:podloze_ziemia, x:1328, y:64}],
[{o:podloze_ziemia, x:1328, y:112}],
[{o:podloze_ziemia, x:1344, y:112}],
[{o:podloze_ziemia, x:1344, y:80}],
[{o:podloze_ziemia, x:1360, y:96}],
[{o:podloze_ziemia, x:1360, y:112}],
[{o:podloze_ziemia, x:1376, y:112}],
[{o:podloze_ziemia, x:1392, y:128}],
[{o:podloze_ziemia, x:1408, y:144}],
[{o:podloze_ziemia, x:1424, y:160}],
[{o:podloze_ziemia, x:1440, y:176}],
[{o:podloze_ziemia, x:1440, y:160}],
[{o:podloze_ziemia, x:1456, y:144}],
[{o:podloze_ziemia, x:1472, y:128}],
[{o:podloze_ziemia, x:1488, y:144}],
[{o:podloze_ziemia, x:1504, y:160}],
[{o:podloze_ziemia, x:1520, y:176}],
[{o:podloze_ziemia, x:1504, y:192}],
[{o:podloze_ziemia, x:1488, y:208}],
[{o:podloze_ziemia, x:1472, y:224}],
[{o:podloze_ziemia, x:1440, y:144}],
[{o:podloze_ziemia, x:1424, y:144}],
[{o:podloze_ziemia, x:1440, y:128}],
[{o:podloze_ziemia, x:1424, y:128}],
[{o:podloze_trawa, x:1424, y:112}],
[{o:podloze_trawa, x:1312, y:80}],
[{o:podloze_trawa, x:1280, y:80}],
[{o:podloze_trawa, x:1344, y:80}],
[{o:podloze_trawa, x:1264, y:80}],
[{o:podloze_trawa, x:1136, y:144}],
[{o:podloze_ziemia, x:1072, y:240}],
[{o:podloze_ziemia, x:1088, y:240}],
[{o:podloze_ziemia, x:1072, y:256}],
[{o:podloze_ziemia, x:992, y:272}],
[{o:podloze_ziemia, x:976, y:272}],
[{o:podloze_ziemia, x:960, y:272}],
[{o:podloze_ziemia, x:944, y:272}],
[{o:podloze_ziemia, x:928, y:272}],
[{o:podloze_ziemia, x:928, y:256}],
[{o:podloze_ziemia, x:1024, y:176}],
[{o:podloze_ziemia, x:1008, y:176}],
[{o:podloze_ziemia, x:992, y:176}],
[{o:wrog2, x:992, y:128}],
[{o:podloze_ziemia, x:1216, y:240}],
[{o:tasma_skraj, x:1568, y:304}],
[{o:tasma_skraj_prawy, x:1760, y:304}],
[{o:tasma_prawo, x:1584, y:304}],
[{o:tasma_prawo, x:1600, y:304}],
[{o:tasma_prawo, x:1616, y:304}],
[{o:tasma_prawo, x:1632, y:304}],
[{o:tasma_prawo, x:1648, y:304}],
[{o:tasma_prawo, x:1664, y:304}],
[{o:tasma_prawo, x:1680, y:304}],
[{o:tasma_prawo, x:1696, y:304}],
[{o:tasma_prawo, x:1712, y:304}],
[{o:tasma_prawo, x:1728, y:304}],
[{o:tasma_prawo, x:1744, y:304}],
[{o:kladka, x:1616, y:240}],
[{o:podloze_ziemia, x:832, y:224}],
[{o:podloze_ziemia, x:848, y:224}],
[{o:podloze_ziemia, x:864, y:224}],
[{o:podloze_ziemia, x:880, y:224}],
[{o:podloze_ziemia, x:896, y:224}],
[{o:podloze_ziemia, x:896, y:208}],
[{o:podloze_ziemia, x:800, y:208}],
[{o:podloze_ziemia, x:800, y:224}],
[{o:podloze_ziemia, x:816, y:224}],
[{o:egipska_krolewna, x:848, y:160}],
[{o:Walenty, x:220, y:380}],
[{o:klocek, x:160, y:48}],
[{o:klocek, x:192, y:48}],
[{o:klocek, x:224, y:48}],
[{o:bonus, x:160, y:0}],
[{o:bonus, x:208, y:0}],
[{o:pierscien_do_wziecia, x:2800, y:416}],
[{o:klocek, x:1104, y:176}],
[{o:klocek, x:1136, y:176}],
[{o:klocek, x:1168, y:176}],
[{o:klocek, x:1072, y:176}],
[{o:klocek, x:944, y:64}],
[{o:klocek, x:992, y:64}],
[{o:klocek, x:1040, y:64}],
[{o:bonus, x:2976, y:384}],
[{o:bonus, x:2960, y:352}],
[{o:bonus, x:2944, y:320}],
[{o:bonus, x:2928, y:288}],
[{o:podloze_ziemia, x:2784, y:464}],
[{o:podloze_ziemia, x:2672, y:464}],
[{o:podloze_skos_prawy, x:3168, y:336}],
[{o:podloze_skos_prawy, x:3152, y:320}],
[{o:podloze_skos_prawy, x:3136, y:304}],
[{o:podloze_skos_prawy, x:3120, y:288}],
[{o:podloze_skos_prawy, x:3104, y:272}],
[{o:podloze_skos_prawy, x:3088, y:256}],
[{o:podloze_skos_prawy, x:3072, y:240}],
[{o:podloze_skos_prawy, x:3056, y:224}],
[{o:podloze_skos_prawy, x:3040, y:208}],
[{o:podloze_skos_prawy, x:3024, y:192}],
[{o:podloze_skos_prawy, x:3008, y:176}],
[{o:podloze_skos_prawy, x:2992, y:160}],
[{o:podloze_skos_lewy, x:2976, y:160}],
[{o:podloze_skos_lewy, x:2960, y:176}],
[{o:podloze_skos_lewy, x:2944, y:192}],
[{o:podloze_skos_lewy, x:2928, y:208}],
[{o:podloze_skos_lewy, x:2912, y:224}],
[{o:podloze_skos_lewy, x:2896, y:240}],
[{o:podloze_skos_lewy, x:2880, y:256}],
[{o:podloze_skos_lewy, x:2864, y:272}],
[{o:podloze_skos_lewy, x:2848, y:288}],
[{o:podloze_skos_lewy, x:2832, y:304}],
[{o:podloze_skos_lewy, x:2816, y:320}],
[{o:podloze_skos_lewy, x:2800, y:336}],
[{o:podloze_skos_lewy, x:2784, y:352}],
[{o:podloze_skos_lewy, x:2768, y:368}],
[{o:podloze_skos_lewy, x:2752, y:384}],
[{o:podloze_skos_lewy, x:2736, y:400}],
[{o:podloze_skos_lewy, x:2720, y:416}],
[{o:podloze_skos_lewy, x:2704, y:432}],
[{o:podloze_skos_lewy, x:2192, y:464}],
[{o:podloze_skos_lewy, x:2208, y:448}],
[{o:podloze_skos_lewy, x:2224, y:432}],
[{o:podloze_skos_prawy, x:2256, y:432}],
[{o:podloze_skos_prawy, x:2272, y:448}],
[{o:podloze_skos_prawy, x:2288, y:464}],
[{o:podloze_skos_lewy, x:224, y:448}],
[{o:podloze_skos_lewy, x:256, y:432}],
[{o:podloze_skos_lewy, x:368, y:416}],
[{o:podloze_skos_prawy, x:528, y:416}],
[{o:podloze_skos_prawy, x:576, y:448}],
[{o:podloze_skos_prawy, x:640, y:464}],
[{o:podloze_skos_prawy, x:544, y:352}],
[{o:klocek, x:64, y:288}],
[{o:klocek_ciemny, x:0, y:208}],
[{o:klocek, x:944, y:16}],
[{o:klocek, x:992, y:16}],
[{o:klocek, x:1040, y:16}],
[{o:podloze_trawa, x:2368, y:368}],
[{o:podloze_trawa, x:2416, y:368}],
[{o:podloze_trawa, x:2400, y:368}],
[{o:podloze_ziemia, x:2352, y:368}],
[{o:podloze_ziemia, x:2352, y:384}],
[{o:podloze_ziemia, x:2448, y:384}],
[{o:podloze_ziemia, x:2448, y:368}],
[{o:podloze_ziemia, x:2448, y:352}],
[{o:podloze_skos_lewy, x:2960, y:448}],
[{o:podloze_skos_lewy, x:2976, y:432}],
[{o:podloze_skos_lewy, x:2992, y:416}],
[{o:podloze_skos_lewy, x:3008, y:400}],
[{o:podloze_skos_lewy, x:3024, y:384}],
[{o:podloze_skos_prawy, x:3056, y:384}],
[{o:podloze_skos_prawy, x:3072, y:400}],
[{o:podloze_skos_prawy, x:3088, y:416}],
[{o:klocek, x:2928, y:432}],
[{o:klocek, x:2896, y:432}],
[{o:klocek, x:2864, y:432}],
[{o:klocek, x:2832, y:432}],
[{o:klocek, x:2848, y:400}],
[{o:klocek, x:2880, y:400}],
[{o:klocek, x:2912, y:400}],
[{o:klocek, x:2864, y:368}],
[{o:klocek, x:2896, y:368}],
[{o:klocek, x:2880, y:336}],
[{o:klocek, x:3040, y:352}],
[{o:klocek, x:3024, y:320}],
[{o:klocek, x:3040, y:288}],
[{o:klocek, x:3184, y:352}],
[{o:wrogAniol, x:1824, y:176}],
[{o:klocek_ciemny, x:96, y:128}],
[{o:kongbigobj, x:2064, y:80}],
[{o:klocek, x:2064, y:80}],
[{o:klocek, x:2096, y:80}],
[{o:klocek, x:2128, y:80}],
[{o:klocek, x:2160, y:80}],
[{o:klocek, x:2064, y:112}],
[{o:klocek, x:2096, y:112}],
[{o:klocek, x:2128, y:112}],
[{o:klocek, x:2160, y:112}],
[{o:klocek, x:2064, y:144}],
[{o:klocek, x:2096, y:144}],
[{o:klocek, x:2128, y:144}],
[{o:klocek, x:2160, y:144}],
[{o:klocek, x:2064, y:176}],
[{o:klocek, x:2096, y:176}],
[{o:klocek, x:2128, y:176}],
[{o:klocek, x:2160, y:176}],
[{o:klocek, x:2064, y:208}],
[{o:klocek, x:2096, y:208}],
[{o:klocek, x:2128, y:208}],
[{o:klocek, x:2160, y:208}],
[{o:konggobj, x:2352, y:336}],
[{o:klocek, x:2352, y:336}],
[{o:klocek, x:2384, y:336}],
[{o:klocek, x:2416, y:336}],
[{o:klocek_ciemny, x:2976, y:272}],
[{o:bonus, x:2976, y:224}],
[{o:podloze_ziemia, x:2752, y:448}],
[{o:podloze_ziemia, x:2752, y:464}],
[{o:podloze_ziemia, x:2768, y:464}]];
this.start = function() {
__room_start__(this, Sfinks, 3320, 480, 30, 0, 0, 0, niebo_ciemne.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='pierścień';
};
}
var Sfinks = new __Sfinks();
tu_scenes.push(Sfinks);
function __skrzynki() { 
this.tiles = [
[1000000,
[background_3,
[448,464,16,16,160,400],
[448,448,16,16,160,384],
[448,432,16,16,160,368],
[448,416,16,16,160,352],
[464,416,16,16,176,352],
[480,416,16,16,192,352],
[496,416,16,16,208,352],
[464,432,16,16,176,368],
[480,432,16,16,192,368],
[496,432,16,16,208,368],
[464,448,16,16,176,384],
[480,448,16,16,192,384],
[496,448,16,16,208,384],
[464,464,16,16,176,400],
[480,464,16,16,192,400],
[496,464,16,16,208,400],
[384,464,16,16,480,304],
[400,464,16,16,496,304],
[416,464,16,16,512,304],
[432,464,16,16,528,304],
[384,448,16,16,480,288],
[400,448,16,16,496,288],
[416,448,16,16,512,288],
[432,448,16,16,528,288],
[384,416,16,16,480,272],
[400,416,16,16,496,272],
[416,416,16,16,512,272],
[432,416,16,16,528,272],
[384,400,16,16,480,256],
[400,400,16,16,496,256],
[416,400,16,16,512,256],
[432,400,16,16,528,256],
[128,144,16,16,272,400],
[128,128,16,16,272,384],
[128,112,16,16,272,368],
[128,96,16,16,272,352],
[144,96,16,16,288,352],
[144,112,16,16,288,368],
[144,128,16,16,288,384],
[144,144,16,16,288,400],
[160,96,16,16,304,352],
[160,112,16,16,304,368],
[160,128,16,16,304,384],
[160,144,16,16,304,400],
[144,96,16,16,320,352],
[144,112,16,16,320,368],
[144,128,16,16,320,384],
[144,144,16,16,320,400],
[144,96,16,16,336,352],
[144,112,16,16,336,368],
[144,128,16,16,336,384],
[144,144,16,16,336,400],
[160,96,16,16,352,352],
[160,112,16,16,352,368],
[160,128,16,16,352,384],
[160,144,16,16,352,400],
[176,96,16,16,368,352],
[176,112,16,16,368,368],
[176,128,16,16,368,384],
[176,144,16,16,368,400],
[112,80,16,16,256,400],
[64,80,16,16,384,400],
[128,80,16,16,272,336],
[176,80,16,16,384,336],
[160,80,16,16,368,336],
[160,80,16,16,352,336],
[160,80,16,16,336,336],
[144,80,16,16,288,336],
[144,80,16,16,304,336],
[144,80,16,16,320,336],
[128,32,16,16,272,320],
[144,32,16,16,288,320],
[144,32,16,16,304,320],
[144,32,16,16,320,320],
[144,32,16,16,336,320],
[160,32,16,16,352,320],
[176,32,16,16,384,320],
[160,32,16,16,368,320],
[112,80,16,16,384,384],
[112,64,16,16,384,368],
[112,48,16,16,384,352]]]];
this.objects = [
[{o:podloze_trawa, x:240, y:416}],
[{o:podloze_trawa, x:272, y:416}],
[{o:podloze_trawa, x:304, y:416}],
[{o:podloze_trawa, x:336, y:416}],
[{o:podloze_trawa, x:368, y:416}],
[{o:podloze_trawa, x:384, y:384}],
[{o:podloze_trawa, x:384, y:352}],
[{o:podloze_trawa, x:400, y:416}],
[{o:podloze_trawa, x:208, y:416}],
[{o:podloze_trawa, x:432, y:416}],
[{o:podloze_ziemia, x:192, y:416}],
[{o:podloze_ziemia, x:176, y:416}],
[{o:podloze_ziemia, x:160, y:416}],
[{o:podloze_ziemia, x:144, y:416}],
[{o:podloze_ziemia, x:128, y:416}],
[{o:podloze_ziemia, x:112, y:416}],
[{o:podloze_ziemia, x:96, y:416}],
[{o:podloze_ziemia, x:64, y:416}],
[{o:podloze_ziemia, x:80, y:416}],
[{o:podloze_ziemia, x:48, y:416}],
[{o:podloze_ziemia, x:32, y:416}],
[{o:podloze_ziemia, x:16, y:416}],
[{o:podloze_ziemia, x:0, y:416}],
[{o:podloze_ziemia, x:464, y:416}],
[{o:podloze_ziemia, x:480, y:416}],
[{o:podloze_ziemia, x:496, y:416}],
[{o:podloze_ziemia, x:512, y:416}],
[{o:podloze_ziemia, x:528, y:416}],
[{o:podloze_ziemia, x:528, y:416}],
[{o:podloze_ziemia, x:544, y:416}],
[{o:podloze_ziemia, x:544, y:416}],
[{o:podloze_ziemia, x:544, y:416}],
[{o:podloze_ziemia, x:560, y:416}],
[{o:podloze_ziemia, x:576, y:416}],
[{o:podloze_ziemia, x:576, y:416}],
[{o:podloze_ziemia, x:576, y:416}],
[{o:podloze_ziemia, x:592, y:416}],
[{o:podloze_ziemia, x:608, y:416}],
[{o:podloze_ziemia, x:608, y:416}],
[{o:podloze_ziemia, x:608, y:416}],
[{o:podloze_ziemia, x:624, y:416}],
[{o:podloze_ziemia, x:656, y:416}],
[{o:podloze_ziemia, x:656, y:416}],
[{o:podloze_ziemia, x:672, y:416}],
[{o:podloze_ziemia, x:688, y:416}],
[{o:podloze_ziemia, x:688, y:416}],
[{o:podloze_ziemia, x:720, y:416}],
[{o:podloze_ziemia, x:736, y:416}],
[{o:podloze_ziemia, x:736, y:416}],
[{o:podloze_ziemia, x:752, y:416}],
[{o:podloze_ziemia, x:768, y:416}],
[{o:podloze_ziemia, x:768, y:416}],
[{o:podloze_ziemia, x:784, y:416}],
[{o:podloze_ziemia, x:784, y:416}],
[{o:podloze_ziemia, x:784, y:416}],
[{o:podloze_ziemia, x:800, y:416}],
[{o:podloze_ziemia, x:800, y:416}],
[{o:podloze_ziemia, x:704, y:416}],
[{o:podloze_ziemia, x:640, y:416}],
[{o:podloze_ziemia, x:816, y:416}],
[{o:podloze_ziemia, x:816, y:416}],
[{o:podloze_ziemia, x:832, y:416}],
[{o:podloze_ziemia, x:848, y:416}],
[{o:podloze_ziemia, x:848, y:416}],
[{o:podloze_ziemia, x:848, y:416}],
[{o:podloze_ziemia, x:848, y:416}],
[{o:podloze_ziemia, x:864, y:416}],
[{o:podloze_ziemia, x:880, y:416}],
[{o:podloze_ziemia, x:896, y:416}],
[{o:podloze_ziemia, x:912, y:416}],
[{o:podloze_ziemia, x:928, y:416}],
[{o:podloze_ziemia, x:944, y:416}],
[{o:podloze_ziemia, x:960, y:416}],
[{o:podloze_ziemia, x:976, y:416}],
[{o:podloze_ziemia, x:976, y:416}],
[{o:podloze_ziemia, x:992, y:416}],
[{o:podloze_ziemia, x:1008, y:416}],
[{o:podloze_ziemia, x:1024, y:416}],
[{o:podloze_ziemia, x:1040, y:416}],
[{o:podloze_ziemia, x:1056, y:416}],
[{o:podloze_ziemia, x:1072, y:416}],
[{o:podloze_ziemia, x:1088, y:416}],
[{o:podloze_ziemia, x:1104, y:416}],
[{o:podloze_ziemia, x:1120, y:416}],
[{o:podloze_ziemia, x:1136, y:416}],
[{o:podloze_ziemia, x:1152, y:416}],
[{o:podloze_ziemia, x:1168, y:416}],
[{o:podloze_ziemia, x:1184, y:416}],
[{o:podloze_ziemia, x:1200, y:416}],
[{o:podloze_ziemia, x:1264, y:416}],
[{o:podloze_ziemia, x:1248, y:416}],
[{o:podloze_ziemia, x:1232, y:416}],
[{o:podloze_ziemia, x:1216, y:416}],
[{o:klocek, x:512, y:112}],
[{o:klocek, x:512, y:208}],
[{o:klocek, x:512, y:224}],
[{o:klocek, x:512, y:176}],
[{o:klocek, x:544, y:192}],
[{o:klocek, x:576, y:64}],
[{o:klocek, x:544, y:64}],
[{o:klocek, x:512, y:64}],
[{o:klocek, x:480, y:48}],
[{o:klocek, x:480, y:48}],
[{o:klocek, x:480, y:80}],
[{o:klocek, x:496, y:96}],
[{o:klocek, x:496, y:96}],
[{o:klocek, x:480, y:112}],
[{o:klocek, x:496, y:128}],
[{o:klocek, x:480, y:144}],
[{o:klocek, x:480, y:176}],
[{o:klocek, x:480, y:192}],
[{o:klocek, x:480, y:192}],
[{o:klocek, x:480, y:208}],
[{o:klocek, x:496, y:240}],
[{o:klocek, x:496, y:224}],
[{o:klocek, x:480, y:224}],
[{o:klocek, x:128, y:48}],
[{o:klocek, x:128, y:48}],
[{o:klocek, x:128, y:64}],
[{o:klocek, x:128, y:96}],
[{o:klocek, x:128, y:128}],
[{o:klocek, x:128, y:160}],
[{o:klocek, x:128, y:192}],
[{o:klocek, x:128, y:224}],
[{o:klocek, x:128, y:256}],
[{o:klocek, x:96, y:256}],
[{o:klocek, x:96, y:224}],
[{o:klocek, x:96, y:192}],
[{o:klocek, x:96, y:160}],
[{o:klocek, x:96, y:128}],
[{o:klocek, x:96, y:96}],
[{o:klocek, x:96, y:64}],
[{o:klocek, x:112, y:0}],
[{o:klocek, x:480, y:0}],
[{o:klocek, x:480, y:16}],
[{o:klocek, x:128, y:16}],
[{o:klocek, x:128, y:0}],
[{o:klocek, x:112, y:48}],
[{o:klocek, x:112, y:32}],
[{o:klocek, x:80, y:64}],
[{o:klocek, x:96, y:112}],
[{o:klocek, x:80, y:128}],
[{o:klocek, x:64, y:192}],
[{o:klocek, x:48, y:192}],
[{o:klocek, x:80, y:224}],
[{o:klocek, x:80, y:256}],
[{o:klocek, x:128, y:352}],
[{o:klocek, x:128, y:384}],
[{o:klocek, x:112, y:336}],
[{o:klocek, x:96, y:320}],
[{o:klocek, x:96, y:288}],
[{o:klocek, x:48, y:288}],
[{o:klocek, x:80, y:288}],
[{o:klocek, x:80, y:320}],
[{o:klocek, x:112, y:352}],
[{o:klocek, x:112, y:384}],
[{o:klocek, x:80, y:160}],
[{o:klocek, x:80, y:112}],
[{o:klocek, x:480, y:336}],
[{o:klocek, x:480, y:384}],
[{o:klocek, x:480, y:368}],
[{o:klocek, x:768, y:32}],
[{o:klocek, x:752, y:32}],
[{o:klocek, x:768, y:0}],
[{o:klocek, x:752, y:0}],
[{o:klocek, x:752, y:0}],
[{o:klocek, x:768, y:48}],
[{o:klocek, x:768, y:48}],
[{o:klocek, x:768, y:80}],
[{o:klocek, x:768, y:80}],
[{o:klocek, x:768, y:96}],
[{o:klocek, x:768, y:112}],
[{o:klocek, x:768, y:128}],
[{o:klocek, x:768, y:144}],
[{o:klocek, x:768, y:160}],
[{o:klocek, x:768, y:192}],
[{o:klocek, x:768, y:192}],
[{o:klocek, x:768, y:224}],
[{o:klocek, x:768, y:240}],
[{o:klocek, x:768, y:288}],
[{o:klocek, x:768, y:320}],
[{o:klocek, x:768, y:256}],
[{o:klocek, x:768, y:352}],
[{o:klocek, x:768, y:384}],
[{o:klocek, x:752, y:384}],
[{o:klocek, x:752, y:352}],
[{o:klocek, x:768, y:336}],
[{o:klocek, x:752, y:336}],
[{o:klocek, x:752, y:304}],
[{o:klocek, x:752, y:288}],
[{o:klocek, x:752, y:272}],
[{o:klocek, x:752, y:256}],
[{o:klocek, x:752, y:240}],
[{o:klocek, x:752, y:240}],
[{o:klocek, x:768, y:224}],
[{o:klocek, x:768, y:224}],
[{o:klocek, x:768, y:208}],
[{o:klocek, x:752, y:208}],
[{o:klocek, x:752, y:208}],
[{o:klocek, x:752, y:176}],
[{o:klocek, x:752, y:176}],
[{o:klocek, x:752, y:160}],
[{o:klocek, x:752, y:144}],
[{o:klocek, x:752, y:128}],
[{o:klocek, x:752, y:112}],
[{o:klocek, x:752, y:96}],
[{o:klocek, x:752, y:80}],
[{o:klocek, x:752, y:64}],
[{o:klocek, x:752, y:48}],
[{o:klocek, x:1120, y:0}],
[{o:klocek, x:1120, y:16}],
[{o:klocek, x:1120, y:32}],
[{o:klocek, x:1120, y:48}],
[{o:klocek, x:1120, y:48}],
[{o:klocek, x:1120, y:80}],
[{o:klocek, x:1120, y:96}],
[{o:klocek, x:1120, y:96}],
[{o:klocek, x:1120, y:112}],
[{o:klocek, x:1120, y:128}],
[{o:klocek, x:1120, y:176}],
[{o:klocek, x:1136, y:224}],
[{o:klocek, x:1136, y:272}],
[{o:klocek, x:1120, y:160}],
[{o:klocek, x:1120, y:208}],
[{o:klocek, x:1120, y:224}],
[{o:klocek, x:1120, y:240}],
[{o:klocek, x:1120, y:256}],
[{o:klocek, x:1120, y:272}],
[{o:klocek, x:1136, y:320}],
[{o:klocek, x:1136, y:336}],
[{o:klocek, x:1136, y:304}],
[{o:klocek, x:1120, y:304}],
[{o:klocek, x:1120, y:320}],
[{o:klocek, x:1120, y:336}],
[{o:klocek, x:1120, y:368}],
[{o:klocek, x:1120, y:384}],
[{o:klocek, x:1120, y:400}],
[{o:klocek, x:768, y:400}],
[{o:klocek, x:1184, y:192}],
[{o:klocek, x:1136, y:80}],
[{o:klocek, x:1152, y:80}],
[{o:klocek, x:1168, y:96}],
[{o:klocek, x:1168, y:112}],
[{o:klocek, x:1168, y:144}],
[{o:klocek, x:1168, y:176}],
[{o:klocek, x:1168, y:192}],
[{o:klocek, x:1168, y:224}],
[{o:klocek, x:1168, y:288}],
[{o:klocek, x:1168, y:256}],
[{o:klocek, x:1152, y:256}],
[{o:klocek, x:1152, y:208}],
[{o:klocek, x:1152, y:176}],
[{o:klocek, x:1152, y:176}],
[{o:klocek, x:1152, y:144}],
[{o:klocek, x:1152, y:128}],
[{o:klocek, x:1152, y:112}],
[{o:klocek, x:1152, y:112}],
[{o:klocek, x:1168, y:64}],
[{o:klocek, x:1184, y:64}],
[{o:klocek, x:1184, y:64}],
[{o:klocek, x:1200, y:64}],
[{o:klocek, x:1216, y:64}],
[{o:klocek, x:1216, y:64}],
[{o:klocek, x:736, y:80}],
[{o:klocek, x:736, y:64}],
[{o:klocek, x:720, y:64}],
[{o:klocek, x:736, y:112}],
[{o:klocek, x:736, y:176}],
[{o:klocek, x:736, y:192}],
[{o:klocek, x:736, y:208}],
[{o:klocek, x:736, y:208}],
[{o:klocek, x:704, y:192}],
[{o:klocek, x:736, y:272}],
[{o:klocek, x:720, y:304}],
[{o:klocek, x:720, y:304}],
[{o:klocek, x:736, y:320}],
[{o:klocek, x:704, y:288}],
[{o:klocek, x:1152, y:64}],
[{o:klocek, x:752, y:400}],
[{o:podloze_trawa, x:272, y:288}],
[{o:podloze_trawa, x:304, y:288}],
[{o:podloze_trawa, x:336, y:288}],
[{o:podloze_trawa, x:368, y:288}],
[{o:podloze_trawa, x:0, y:432}],
[{o:podloze_trawa, x:32, y:432}],
[{o:podloze_trawa, x:64, y:432}],
[{o:podloze_trawa, x:96, y:432}],
[{o:podloze_trawa, x:128, y:432}],
[{o:podloze_trawa, x:160, y:432}],
[{o:podloze_trawa, x:192, y:432}],
[{o:podloze_trawa, x:448, y:432}],
[{o:podloze_trawa, x:480, y:432}],
[{o:podloze_trawa, x:512, y:432}],
[{o:podloze_trawa, x:544, y:432}],
[{o:podloze_trawa, x:576, y:432}],
[{o:podloze_trawa, x:624, y:432}],
[{o:podloze_trawa, x:608, y:432}],
[{o:podloze_trawa, x:656, y:432}],
[{o:podloze_trawa, x:656, y:464}],
[{o:podloze_trawa, x:624, y:464}],
[{o:podloze_trawa, x:592, y:464}],
[{o:podloze_trawa, x:560, y:464}],
[{o:podloze_trawa, x:528, y:464}],
[{o:podloze_trawa, x:496, y:464}],
[{o:podloze_trawa, x:464, y:464}],
[{o:podloze_trawa, x:432, y:464}],
[{o:podloze_trawa, x:416, y:448}],
[{o:podloze_trawa, x:384, y:448}],
[{o:podloze_trawa, x:352, y:448}],
[{o:podloze_trawa, x:320, y:448}],
[{o:podloze_trawa, x:288, y:448}],
[{o:podloze_trawa, x:256, y:448}],
[{o:podloze_trawa, x:224, y:448}],
[{o:podloze_trawa, x:192, y:464}],
[{o:podloze_trawa, x:160, y:464}],
[{o:podloze_trawa, x:128, y:464}],
[{o:podloze_trawa, x:96, y:464}],
[{o:podloze_trawa, x:64, y:464}],
[{o:podloze_trawa, x:32, y:464}],
[{o:podloze_trawa, x:16, y:464}],
[{o:Walenty, x:336, y:240}],
[{o:kenijka, x:544, y:16}],
[{o:jablko_do_wziecia, x:1216, y:16}],
[{o:podloze_ziemia, x:880, y:336}],
[{o:podloze_ziemia, x:896, y:336}],
[{o:podloze_ziemia, x:912, y:336}],
[{o:podloze_ziemia, x:928, y:336}],
[{o:wrog1, x:896, y:272}],
[{o:podloze_ziemia, x:976, y:272}],
[{o:podloze_ziemia, x:992, y:272}],
[{o:podloze_ziemia, x:1008, y:272}],
[{o:wrog2, x:976, y:208}],
[{o:wrog1, x:1056, y:368}],
[{o:wrog1, x:1168, y:16}],
[{o:podloze_ziemia, x:1248, y:48}],
[{o:podloze_ziemia, x:1248, y:32}],
[{o:podloze_ziemia, x:1248, y:64}],
[{o:podloze_ziemia, x:1248, y:16}]];
this.start = function() {
__room_start__(this, skrzynki, 1280, 480, 30, 0, 0, 0, poziom_tlo.image, 1, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane='jablko';
};
}
var skrzynki = new __skrzynki();
tu_scenes.push(skrzynki);
function __tlo_Azja_et4() { 
this.tiles = [
];
this.objects = [
[{o:girl_napis, x:336, y:144}]];
this.start = function() {
__room_start__(this, tlo_Azja_et4, 640, 480, 30, 0, 0, 0, poziom_tlo.image, 0, 0, 0, 640, 480, null, 50, 50);

poziomu_nazwa='Asian';
poziomu_nr=4;
};
}
var tlo_Azja_et4 = new __tlo_Azja_et4();
tu_scenes.push(tlo_Azja_et4);
function __Japonskie_Jablka() { 
this.tiles = [
[1000000,
[background_3,
[320,304,16,16,80,432],
[336,304,16,16,96,432],
[352,304,16,16,112,432],
[368,304,16,16,128,432],
[320,288,16,16,80,416],
[336,288,16,16,96,416],
[320,304,16,16,80,464],
[336,304,16,16,96,464],
[352,304,16,16,112,464],
[368,304,16,16,128,464],
[352,288,16,16,112,416],
[368,288,16,16,128,416],
[320,272,16,16,80,400],
[336,272,16,16,96,400],
[352,272,16,16,112,400],
[368,272,16,16,128,400],
[320,256,16,16,80,384],
[336,256,16,16,96,384],
[352,256,16,16,112,384],
[368,256,16,16,128,384],
[320,304,16,16,256,464],
[336,304,16,16,272,464],
[352,304,16,16,288,464],
[368,304,16,16,304,464],
[320,304,16,16,80,368],
[336,304,16,16,96,368],
[352,304,16,16,112,368],
[368,304,16,16,128,368],
[320,288,16,16,80,352],
[336,288,16,16,96,352],
[352,288,16,16,112,352],
[368,288,16,16,128,352],
[320,256,16,16,80,336],
[336,256,16,16,96,336],
[352,256,16,16,112,336],
[368,256,16,16,128,336]],
[background_4177,
[160,928,32,32,256,336],
[192,928,32,32,288,336],
[160,960,32,32,256,368],
[192,960,32,32,288,368],
[160,992,32,32,256,400],
[192,992,32,32,288,400],
[160,1024,32,32,256,432],
[192,1024,32,32,288,432],
[0,1216,32,32,64,48],
[32,1216,32,32,96,48],
[64,1216,32,32,128,48],
[96,1216,32,32,160,48],
[32,1248,32,32,96,80],
[64,1248,32,32,128,80],
[0,1280,32,32,64,112],
[32,1280,32,32,96,112],
[64,1280,32,32,128,112],
[96,1280,32,32,160,112],
[128,288,32,32,1536,336],
[160,288,32,32,1568,336],
[192,288,32,32,1600,336],
[224,288,32,32,1632,336],
[128,320,32,32,1536,368],
[160,320,32,32,1568,368],
[192,320,32,32,1600,368],
[224,320,32,32,1632,368],
[128,352,32,32,1536,400],
[160,352,32,32,1568,400],
[192,352,32,32,1600,400],
[224,352,32,32,1632,400],
[128,384,32,32,1536,432],
[160,384,32,32,1568,432],
[192,384,32,32,1600,432],
[224,384,32,32,1632,432],
[192,256,32,32,80,288],
[160,256,32,32,256,288],
[96,224,32,32,304,288],
[32,288,32,32,416,288],
[32,256,32,32,416,256],
[32,64,32,32,448,288],
[192,0,32,32,416,384],
[192,32,32,32,416,416],
[224,32,32,32,384,176],
[224,0,32,32,384,144]]]];
this.objects = [
[{o:Walenty, x:112, y:240}],
[{o:podloze_ziemia, x:80, y:320}],
[{o:podloze_ziemia, x:96, y:320}],
[{o:podloze_ziemia, x:112, y:320}],
[{o:podloze_ziemia, x:128, y:320}],
[{o:podloze_ziemia, x:272, y:320}],
[{o:podloze_ziemia, x:288, y:320}],
[{o:podloze_ziemia, x:304, y:320}],
[{o:podloze_ziemia, x:256, y:320}],
[{o:podloze_ziemia, x:416, y:320}],
[{o:podloze_ziemia, x:432, y:320}],
[{o:podloze_ziemia, x:448, y:320}],
[{o:podloze_ziemia, x:464, y:320}],
[{o:jablko_do_wziecia, x:432, y:224}],
[{o:japonka, x:280, y:220}],
[{o:ryuk, x:540, y:240}],
[{o:podloze_ziemia, x:400, y:240}],
[{o:podloze_ziemia, x:400, y:224}],
[{o:podloze_ziemia, x:400, y:208}],
[{o:podloze_ziemia, x:80, y:448}],
[{o:podloze_ziemia, x:96, y:448}],
[{o:podloze_ziemia, x:112, y:448}],
[{o:podloze_ziemia, x:128, y:448}],
[{o:podloze_ziemia, x:256, y:448}],
[{o:podloze_ziemia, x:272, y:448}],
[{o:podloze_ziemia, x:288, y:448}],
[{o:podloze_ziemia, x:304, y:448}],
[{o:podloze_ziemia, x:416, y:448}],
[{o:podloze_ziemia, x:432, y:448}],
[{o:podloze_ziemia, x:448, y:448}],
[{o:podloze_ziemia, x:464, y:448}],
[{o:jablko_do_wziecia, x:704, y:224}],
[{o:jablko_do_wziecia, x:752, y:224}],
[{o:jablko_do_wziecia, x:800, y:224}],
[{o:klocek, x:528, y:432}],
[{o:klocek, x:592, y:400}],
[{o:klocek, x:656, y:368}],
[{o:klocek, x:720, y:336}],
[{o:klocek, x:784, y:304}],
[{o:klocek_ciemny, x:880, y:336}],
[{o:klocek, x:944, y:304}],
[{o:klocek, x:1008, y:304}],
[{o:klocek, x:1072, y:304}],
[{o:klocek, x:1136, y:304}],
[{o:klocek, x:1200, y:304}],
[{o:klocek, x:1264, y:304}],
[{o:klocek_ciemny, x:1328, y:336}],
[{o:kladka, x:1392, y:368}],
[{o:klocek, x:1504, y:336}],
[{o:klocek, x:1568, y:304}],
[{o:klocek, x:1632, y:272}],
[{o:bonus, x:1632, y:224}],
[{o:bonus, x:1568, y:256}],
[{o:bonus, x:1504, y:288}],
[{o:jablko_do_wziecia, x:944, y:224}],
[{o:jablko_do_wziecia, x:1008, y:224}],
[{o:jablko_do_wziecia, x:1072, y:240}],
[{o:jablko_do_wziecia, x:1136, y:208}],
[{o:jablko_do_wziecia, x:1200, y:224}],
[{o:jablko_do_wziecia, x:1504, y:224}],
[{o:klocek, x:0, y:368}],
[{o:podloze_ziemia, x:80, y:144}],
[{o:podloze_ziemia, x:96, y:144}],
[{o:podloze_ziemia, x:112, y:144}],
[{o:podloze_ziemia, x:128, y:144}],
[{o:podloze_ziemia, x:144, y:144}],
[{o:podloze_ziemia, x:160, y:144}],
[{o:bonus, x:112, y:80}],
[{o:podloze_trawa, x:1552, y:448}],
[{o:podloze_trawa, x:1584, y:448}],
[{o:podloze_trawa, x:1600, y:448}],
[{o:podloze_trawa, x:1632, y:448}],
[{o:podloze_trawa, x:1536, y:448}],
[{o:podloze_trawa, x:1520, y:464}],
[{o:bonus, x:1616, y:144}],
[{o:klocek, x:1344, y:128}],
[{o:klocek, x:1376, y:128}],
[{o:klocek, x:1408, y:128}],
[{o:klocek, x:1440, y:128}],
[{o:klocek, x:1344, y:96}],
[{o:klocek, x:1376, y:96}],
[{o:klocek, x:1408, y:96}],
[{o:klocek, x:1440, y:96}],
[{o:klocek, x:1344, y:64}],
[{o:klocek, x:1376, y:64}],
[{o:klocek, x:1408, y:64}],
[{o:klocek, x:1440, y:64}],
[{o:klocek, x:1344, y:32}],
[{o:klocek, x:1344, y:0}],
[{o:klocek, x:1376, y:0}],
[{o:klocek, x:1376, y:32}],
[{o:klocek, x:1408, y:32}],
[{o:klocek, x:1408, y:0}],
[{o:klocek, x:1440, y:32}],
[{o:klocek, x:1440, y:0}],
[{o:podloze_ziemia, x:384, y:208}],
[{o:podloze_ziemia, x:384, y:224}],
[{o:podloze_ziemia, x:384, y:240}],
[{o:chmura, x:80, y:144}],
[{o:chmura, x:368, y:96}],
[{o:chmura, x:560, y:128}],
[{o:chmura, x:832, y:240}],
[{o:chmura, x:1104, y:128}],
[{o:chmura, x:880, y:80}],
[{o:chmura, x:1456, y:160}]];
this.start = function() {
__room_start__(this, Japonskie_Jablka, 1660, 480, 30, 0, 0, 0, niebo_szare.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='jablko';
//co_wymagane='pierścień';
};
}
var Japonskie_Jablka = new __Japonskie_Jablka();
tu_scenes.push(Japonskie_Jablka);
function __chiny() { 
this.tiles = [
[1000000,
[background_3,
[192,256,16,16,0,460],
[208,256,16,16,16,464],
[208,256,16,16,32,464],
[208,256,16,16,48,464],
[208,256,16,16,64,464],
[208,256,16,16,80,464],
[208,256,16,16,96,464],
[208,256,16,16,112,464],
[208,256,16,16,128,464]],
[background_1190,
[256,192,32,32,224,392],
[256,160,32,32,224,360],
[384,64,32,32,248,400],
[384,128,32,32,248,384],
[384,128,32,32,248,368],
[384,0,32,32,248,352],
[32,288,32,32,128,448],
[32,288,32,32,160,448],
[32,288,32,32,192,448],
[32,320,32,32,224,448],
[32,320,32,32,256,448],
[32,288,32,32,224,416],
[32,288,32,32,256,416],
[32,288,32,32,192,416],
[32,288,32,32,288,432],
[32,288,32,32,176,432],
[32,320,32,32,288,448],
[32,320,32,32,320,448],
[32,320,32,32,352,472]],
[background_4177,
[96,448,32,32,512,384],
[96,416,32,32,512,352],
[160,416,32,32,576,352],
[160,448,32,32,576,384],
[0,1216,32,32,224,352],
[96,1216,32,32,256,352],
[64,320,32,32,224,384],
[64,320,32,32,256,384],
[0,1216,32,32,496,352],
[0,1216,32,32,512,336],
[0,1216,32,32,528,320],
[0,1216,32,32,544,304],
[0,1216,32,32,560,288],
[96,1216,32,32,592,288],
[96,1216,32,32,608,304],
[96,1216,32,32,624,320],
[96,1216,32,32,640,336],
[96,1216,32,32,656,352],
[96,1216,32,32,672,368],
[0,1216,32,32,496,416],
[0,1216,32,32,496,400],
[32,1248,32,32,656,368],
[32,1248,32,32,640,368],
[32,1248,32,32,624,368],
[32,1248,32,32,624,336],
[32,1248,32,32,640,352],
[32,1248,32,32,608,384],
[32,1248,32,32,608,352],
[32,1248,32,32,608,336],
[32,1248,32,32,592,320],
[32,1248,32,32,592,304],
[32,1248,32,32,592,384],
[32,1248,32,32,592,400],
[32,1248,32,32,560,400],
[32,1248,32,32,560,368],
[32,1248,32,32,560,336],
[32,1248,32,32,560,320],
[32,1248,32,32,544,400],
[32,1248,32,32,544,368],
[32,1248,32,32,544,352],
[32,1248,32,32,544,336],
[32,1248,32,32,512,368],
[32,1248,32,32,512,352],
[0,1216,32,32,464,336],
[96,1216,32,32,688,336],
[0,1216,32,32,512,288],
[96,1216,32,32,640,288],
[192,128,32,32,704,352],
[192,128,32,32,960,416],
[192,128,32,32,992,416],
[192,128,32,32,1072,416],
[192,128,32,32,1104,416],
[192,128,32,32,1120,416],
[32,224,32,32,848,416],
[32,224,32,32,880,416],
[32,32,32,32,1216,416],
[160,256,32,32,1200,416],
[0,64,32,32,960,448],
[0,64,32,32,992,448],
[0,64,32,32,1024,448],
[0,64,32,32,1056,448],
[0,64,32,32,1088,448],
[0,64,32,32,1120,448],
[0,64,32,32,1152,448],
[0,64,32,32,1184,448],
[0,64,32,32,1216,448],
[0,64,32,32,1248,448],
[0,64,32,32,1168,416],
[0,64,32,32,1168,384],
[0,64,32,32,1136,352],
[0,64,32,32,1200,352],
[96,384,32,32,928,416],
[160,448,32,32,992,416],
[160,416,32,32,992,384],
[128,448,32,32,1168,352]]]];
this.objects = [
[{o:podloze_ziemia, x:0, y:448}],
[{o:podloze_ziemia, x:16, y:448}],
[{o:podloze_ziemia, x:32, y:448}],
[{o:podloze_ziemia, x:48, y:448}],
[{o:podloze_ziemia, x:64, y:448}],
[{o:podloze_ziemia, x:80, y:448}],
[{o:podloze_ziemia, x:96, y:448}],
[{o:podloze_ziemia, x:112, y:448}],
[{o:podloze_ziemia, x:128, y:448}],
[{o:podloze_ziemia, x:144, y:440}],
[{o:podloze_ziemia, x:160, y:432}],
[{o:podloze_ziemia, x:176, y:424}],
[{o:podloze_ziemia, x:192, y:416}],
[{o:podloze_ziemia, x:208, y:408}],
[{o:podloze_ziemia, x:224, y:408}],
[{o:podloze_ziemia, x:240, y:408}],
[{o:podloze_ziemia, x:256, y:408}],
[{o:podloze_ziemia, x:272, y:416}],
[{o:podloze_ziemia, x:288, y:424}],
[{o:podloze_ziemia, x:304, y:432}],
[{o:podloze_ziemia, x:320, y:440}],
[{o:podloze_ziemia, x:336, y:448}],
[{o:podloze_ziemia, x:352, y:456}],
[{o:podloze_ziemia, x:368, y:464}],
[{o:podloze_ziemia, x:384, y:464}],
[{o:podloze_skos_lewy, x:128, y:432}],
[{o:podloze_skos_lewy, x:144, y:424}],
[{o:podloze_skos_lewy, x:160, y:416}],
[{o:podloze_skos_lewy, x:176, y:408}],
[{o:podloze_skos_lewy, x:192, y:400}],
[{o:podloze_skos_prawy, x:288, y:408}],
[{o:podloze_skos_prawy, x:304, y:416}],
[{o:podloze_skos_prawy, x:320, y:424}],
[{o:podloze_skos_prawy, x:336, y:432}],
[{o:podloze_skos_prawy, x:352, y:440}],
[{o:podloze_skos_prawy, x:368, y:448}],
[{o:podloze_trawa, x:400, y:456}],
[{o:podloze_trawa, x:440, y:456}],
[{o:podloze_trawa, x:472, y:448}],
[{o:podloze_trawa, x:504, y:440}],
[{o:podloze_trawa, x:536, y:432}],
[{o:podloze_trawa, x:568, y:424}],
[{o:podloze_trawa, x:600, y:416}],
[{o:podloze_trawa, x:632, y:408}],
[{o:podloze_trawa, x:664, y:400}],
[{o:podloze_trawa, x:416, y:448}],
[{o:podloze_trawa, x:672, y:384}],
[{o:podloze_trawa, x:704, y:384}],
[{o:podloze_trawa, x:832, y:448}],
[{o:podloze_trawa, x:864, y:448}],
[{o:podloze_trawa, x:896, y:448}],
[{o:podloze_trawa, x:928, y:448}],
[{o:podloze_trawa, x:704, y:448}],
[{o:podloze_trawa, x:704, y:416}],
[{o:podloze_trawa, x:672, y:416}],
[{o:podloze_trawa, x:672, y:448}],
[{o:podloze_trawa, x:640, y:416}],
[{o:podloze_trawa, x:640, y:448}],
[{o:podloze_trawa, x:608, y:448}],
[{o:podloze_trawa, x:608, y:416}],
[{o:podloze_trawa, x:576, y:448}],
[{o:podloze_trawa, x:544, y:448}],
[{o:podloze_trawa, x:512, y:448}],
[{o:podloze_trawa, x:480, y:448}],
[{o:klocek, x:160, y:320}],
[{o:klocek, x:128, y:256}],
[{o:klocek, x:192, y:224}],
[{o:klocek, x:256, y:192}],
[{o:klocek, x:320, y:160}],
[{o:klocek, x:384, y:128}],
[{o:klocek, x:448, y:128}],
[{o:chinka, x:448, y:384}],
[{o:podloze_ziemia, x:240, y:336}],
[{o:podloze_ziemia, x:256, y:336}],
[{o:Walenty, x:64, y:400}],
[{o:podloze_ziemia, x:0, y:432}],
[{o:podloze_ziemia, x:512, y:336}],
[{o:podloze_ziemia, x:528, y:320}],
[{o:podloze_ziemia, x:544, y:304}],
[{o:podloze_ziemia, x:560, y:288}],
[{o:podloze_ziemia, x:576, y:272}],
[{o:podloze_ziemia, x:592, y:272}],
[{o:podloze_ziemia, x:608, y:288}],
[{o:podloze_ziemia, x:624, y:304}],
[{o:podloze_ziemia, x:640, y:320}],
[{o:podloze_ziemia, x:656, y:336}],
[{o:podloze_ziemia, x:496, y:336}],
[{o:podloze_ziemia, x:672, y:336}],
[{o:podloze_ziemia, x:544, y:288}],
[{o:podloze_ziemia, x:528, y:288}],
[{o:podloze_ziemia, x:624, y:288}],
[{o:podloze_ziemia, x:640, y:288}],
[{o:podloze_ziemia, x:480, y:336}],
[{o:podloze_ziemia, x:688, y:336}],
[{o:bonus, x:544, y:336}],
[{o:bonus, x:608, y:336}],
[{o:bonus, x:128, y:176}],
[{o:bonus, x:192, y:144}],
[{o:bonus, x:256, y:128}],
[{o:bonus, x:320, y:80}],
[{o:bonus, x:384, y:48}],
[{o:bonus, x:448, y:32}],
[{o:bonus, x:768, y:352}],
[{o:wrog1, x:576, y:208}],
[{o:tasma_lewo, x:752, y:272}],
[{o:tasma_lewo, x:784, y:272}],
[{o:tasma_lewo, x:768, y:272}],
[{o:tasma_lewo, x:800, y:272}],
[{o:tasma_lewo, x:816, y:272}],
[{o:tasma_skraj, x:736, y:272}],
[{o:tasma_skraj_prawy, x:832, y:272}],
[{o:tasma_prawo, x:880, y:320}],
[{o:tasma_prawo, x:896, y:320}],
[{o:tasma_prawo, x:912, y:320}],
[{o:tasma_prawo, x:928, y:320}],
[{o:tasma_prawo, x:944, y:320}],
[{o:tasma_prawo, x:960, y:320}],
[{o:tasma_prawo, x:976, y:320}],
[{o:tasma_prawo, x:992, y:320}],
[{o:tasma_skraj_prawy, x:1008, y:320}],
[{o:tasma_skraj, x:864, y:320}],
[{o:wrog1, x:1040, y:384}],
[{o:klocek, x:1024, y:256}],
[{o:klocek_ciemny, x:1088, y:256}],
[{o:konggobj, x:1136, y:256}],
[{o:kongbigobj, x:736, y:112}],
[{o:burger_do_wziecia, x:832, y:368}],
[{o:jablko_do_wziecia, x:880, y:352}],
[{o:kladka, x:960, y:272}],
[{o:bonus, x:528, y:32}],
[{o:bonus, x:608, y:32}],
[{o:bonus, x:736, y:64}],
[{o:bonus, x:816, y:64}],
[{o:bonus, x:784, y:32}],
[{o:bonus, x:1008, y:80}],
[{o:bonus, x:1072, y:80}],
[{o:bonus, x:1136, y:80}],
[{o:kot_do_wziecia, x:1168, y:48}],
[{o:podloze_ziemia, x:1168, y:96}],
[{o:podloze_ziemia, x:1184, y:96}],
[{o:podloze_ziemia, x:1200, y:96}],
[{o:podloze_ziemia, x:1152, y:80}],
[{o:podloze_ziemia, x:1216, y:80}],
[{o:podloze_ziemia, x:1120, y:128}],
[{o:podloze_ziemia, x:1152, y:128}],
[{o:podloze_ziemia, x:1184, y:128}],
[{o:podloze_ziemia, x:1216, y:128}],
[{o:podloze_ziemia, x:1248, y:128}],
[{o:podloze_ziemia, x:1144, y:136}],
[{o:podloze_ziemia, x:1136, y:136}],
[{o:podloze_ziemia, x:1168, y:136}],
[{o:podloze_ziemia, x:1200, y:136}],
[{o:podloze_ziemia, x:1232, y:136}],
[{o:podloze_ziemia, x:1224, y:136}],
[{o:wrog1, x:240, y:264}],
[{o:wrog1, x:1088, y:384}],
[{o:wrog1, x:1136, y:384}],
[{o:podloze_ziemia, x:960, y:464}],
[{o:podloze_ziemia, x:976, y:464}],
[{o:podloze_ziemia, x:992, y:464}],
[{o:podloze_ziemia, x:1008, y:464}],
[{o:podloze_ziemia, x:1024, y:464}],
[{o:podloze_ziemia, x:1040, y:464}],
[{o:podloze_ziemia, x:1056, y:464}],
[{o:podloze_ziemia, x:1072, y:464}],
[{o:podloze_ziemia, x:1088, y:464}],
[{o:podloze_ziemia, x:1104, y:464}],
[{o:podloze_ziemia, x:1120, y:464}],
[{o:podloze_ziemia, x:1136, y:464}],
[{o:podloze_ziemia, x:1152, y:464}],
[{o:podloze_ziemia, x:1168, y:464}],
[{o:podloze_ziemia, x:1184, y:448}],
[{o:podloze_ziemia, x:1184, y:464}],
[{o:podloze_ziemia, x:1200, y:464}],
[{o:podloze_ziemia, x:1216, y:464}],
[{o:podloze_ziemia, x:1232, y:464}],
[{o:podloze_ziemia, x:1248, y:464}],
[{o:podloze_ziemia, x:1264, y:464}],
[{o:podloze_ziemia, x:1264, y:448}],
[{o:podloze_ziemia, x:1264, y:432}],
[{o:bonus, x:160, y:64}],
[{o:bonus, x:48, y:16}],
[{o:klocek, x:48, y:64}]];
this.start = function() {
__room_start__(this, chiny, 1280, 480, 30, 255, 128, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane='kot';
};
}
var chiny = new __chiny();
tu_scenes.push(chiny);
function __Indie() { 
this.tiles = [
[1000000,
[background_272,
[320,464,16,16,96,464],
[336,464,16,16,112,464],
[352,464,16,16,128,464],
[368,464,16,16,144,464],
[320,448,16,16,96,448],
[336,448,16,16,112,448],
[352,448,16,16,128,448],
[368,448,16,16,144,448],
[320,432,16,16,96,432],
[336,432,16,16,112,432],
[352,432,16,16,128,432],
[368,432,16,16,144,432],
[320,416,16,16,96,416],
[336,416,16,16,112,416],
[352,416,16,16,128,416],
[368,416,16,16,144,416],
[304,464,16,16,448,448],
[304,464,16,16,464,448],
[304,464,16,16,448,464],
[304,464,16,16,464,464],
[304,464,16,16,512,448],
[304,464,16,16,528,448],
[304,464,16,16,528,464],
[304,464,16,16,512,464],
[304,464,16,16,576,448],
[304,464,16,16,576,464],
[304,464,16,16,592,464],
[304,464,16,16,592,448],
[304,464,16,16,640,448],
[304,464,16,16,640,464],
[304,464,16,16,656,464],
[304,464,16,16,656,448],
[320,464,16,16,928,464],
[336,464,16,16,944,464],
[352,464,16,16,960,464],
[368,464,16,16,976,464],
[320,448,16,16,928,448],
[320,432,16,16,928,432],
[336,448,16,16,944,448],
[336,432,16,16,944,432],
[352,448,16,16,960,448],
[352,432,16,16,960,432],
[368,448,16,16,976,448],
[368,432,16,16,976,432],
[320,464,16,16,1072,464],
[336,464,16,16,1088,464],
[352,464,16,16,1104,464],
[368,464,16,16,1120,464],
[320,448,16,16,1072,448],
[336,448,16,16,1088,448],
[352,448,16,16,1104,448],
[368,448,16,16,1120,448],
[320,432,16,16,1072,432],
[320,432,16,16,1088,432],
[320,432,16,16,1104,432],
[320,432,16,16,1120,432],
[320,432,16,16,992,432],
[320,432,16,16,1024,432],
[320,432,16,16,1008,432],
[320,432,16,16,1040,432],
[320,432,16,16,1056,432],
[320,448,16,16,992,448],
[320,448,16,16,1008,448],
[320,448,16,16,1024,448],
[320,448,16,16,1040,448],
[320,448,16,16,1056,448],
[320,464,16,16,992,464],
[320,464,16,16,1008,464],
[320,464,16,16,1024,464],
[320,464,16,16,1056,464],
[320,464,16,16,1040,464]],
[background_1190,
[448,192,32,32,96,400],
[352,384,32,32,224,448],
[320,384,32,32,256,448],
[352,384,32,32,352,448],
[320,384,32,32,384,448],
[480,416,32,32,256,400],
[384,160,32,32,944,256]],
[background_3,
[320,416,16,16,928,288],
[320,416,16,16,944,288],
[320,416,16,16,960,288],
[320,416,16,16,976,288],
[320,416,16,16,992,288],
[320,416,16,16,1008,288],
[320,416,16,16,1024,288],
[320,416,16,16,1040,288],
[320,416,16,16,1056,288],
[320,416,16,16,1072,288],
[320,416,16,16,1088,288],
[320,416,16,16,1104,288],
[320,416,16,16,1120,288]]]];
this.objects = [
[{o:podloze_trawa, x:96, y:384}],
[{o:podloze_trawa, x:128, y:384}],
[{o:podloze_ziemia, x:224, y:432}],
[{o:podloze_ziemia, x:240, y:432}],
[{o:podloze_ziemia, x:256, y:432}],
[{o:podloze_ziemia, x:272, y:432}],
[{o:podloze_ziemia, x:352, y:432}],
[{o:podloze_ziemia, x:368, y:432}],
[{o:podloze_ziemia, x:384, y:432}],
[{o:podloze_ziemia, x:400, y:432}],
[{o:klocek_ciemny, x:448, y:416}],
[{o:klocek_ciemny, x:512, y:416}],
[{o:klocek_ciemny, x:576, y:416}],
[{o:klocek_ciemny, x:640, y:416}],
[{o:kongbigobj, x:448, y:256}],
[{o:klocek, x:544, y:256}],
[{o:klocek, x:512, y:288}],
[{o:klocek, x:480, y:256}],
[{o:klocek, x:448, y:288}],
[{o:klocek, x:480, y:320}],
[{o:klocek, x:544, y:320}],
[{o:klocek, x:512, y:352}],
[{o:klocek, x:448, y:352}],
[{o:klocek, x:480, y:384}],
[{o:klocek, x:544, y:384}],
[{o:klocek, x:448, y:224}],
[{o:klocek, x:512, y:224}],
[{o:klocek, x:480, y:192}],
[{o:klocek, x:544, y:192}],
[{o:klocek, x:448, y:160}],
[{o:klocek, x:512, y:160}],
[{o:kladka, x:464, y:112}],
[{o:podloze_ziemia, x:432, y:32}],
[{o:podloze_ziemia, x:352, y:32}],
[{o:jablko_do_wziecia, x:384, y:368}],
[{o:bonus, x:224, y:336}],
[{o:bonus, x:288, y:336}],
[{o:bonus, x:352, y:336}],
[{o:bonus, x:256, y:272}],
[{o:bonus, x:320, y:272}],
[{o:bonus, x:288, y:224}],
[{o:bonus, x:160, y:16}],
[{o:bonus, x:112, y:48}],
[{o:bonus, x:80, y:96}],
[{o:bonus, x:208, y:48}],
[{o:bonus, x:256, y:96}],
[{o:podloze_skos_prawy, x:176, y:128}],
[{o:podloze_skos_lewy, x:160, y:128}],
[{o:podloze_trawa, x:160, y:144}],
[{o:podloze_ziemia, x:608, y:144}],
[{o:podloze_ziemia, x:624, y:144}],
[{o:podloze_ziemia, x:640, y:144}],
[{o:podloze_ziemia, x:1200, y:448}],
[{o:podloze_ziemia, x:1216, y:448}],
[{o:podloze_ziemia, x:1232, y:448}],
[{o:podloze_ziemia, x:1248, y:448}],
[{o:podloze_ziemia, x:992, y:416}],
[{o:podloze_ziemia, x:1008, y:416}],
[{o:podloze_ziemia, x:1040, y:416}],
[{o:podloze_ziemia, x:1024, y:416}],
[{o:podloze_ziemia, x:1056, y:416}],
[{o:podloze_ziemia, x:1072, y:416}],
[{o:podloze_ziemia, x:1088, y:416}],
[{o:podloze_ziemia, x:1104, y:416}],
[{o:podloze_ziemia, x:1120, y:416}],
[{o:podloze_ziemia, x:1120, y:400}],
[{o:podloze_ziemia, x:976, y:416}],
[{o:podloze_ziemia, x:960, y:416}],
[{o:podloze_ziemia, x:944, y:416}],
[{o:podloze_ziemia, x:928, y:416}],
[{o:podloze_ziemia, x:928, y:400}],
[{o:wrog1, x:1072, y:368}],
[{o:wrog1, x:960, y:368}],
[{o:kladka, x:1200, y:304}],
[{o:kladka, x:1200, y:224}],
[{o:kladka, x:1200, y:160}],
[{o:podloze_ziemia, x:1184, y:16}],
[{o:podloze_ziemia, x:1168, y:16}],
[{o:podloze_ziemia, x:1152, y:16}],
[{o:bonus, x:1136, y:80}],
[{o:bonus, x:1072, y:80}],
[{o:bonus, x:992, y:80}],
[{o:bonus, x:928, y:80}],
[{o:bonus, x:1104, y:48}],
[{o:bonus, x:960, y:48}],
[{o:podloze_ziemia, x:928, y:272}],
[{o:podloze_ziemia, x:928, y:256}],
[{o:podloze_ziemia, x:944, y:272}],
[{o:podloze_ziemia, x:960, y:272}],
[{o:podloze_ziemia, x:976, y:272}],
[{o:podloze_ziemia, x:992, y:272}],
[{o:podloze_ziemia, x:1008, y:272}],
[{o:podloze_ziemia, x:1024, y:272}],
[{o:podloze_ziemia, x:1040, y:272}],
[{o:podloze_ziemia, x:1056, y:272}],
[{o:podloze_ziemia, x:1072, y:272}],
[{o:podloze_ziemia, x:1088, y:272}],
[{o:podloze_ziemia, x:1104, y:272}],
[{o:podloze_ziemia, x:1120, y:272}],
[{o:podloze_ziemia, x:1120, y:256}],
[{o:wrog1, x:960, y:224}],
[{o:wrog1, x:1072, y:224}],
[{o:klocek, x:1024, y:16}],
[{o:klocek, x:752, y:112}],
[{o:klocek, x:752, y:320}],
[{o:bonus, x:832, y:304}],
[{o:bonus, x:832, y:96}],
[{o:bonus, x:752, y:32}],
[{o:bonus, x:752, y:224}],
[{o:bonus, x:688, y:304}],
[{o:bonus, x:688, y:96}],
[{o:Walenty, x:128, y:336}],
[{o:podloze_ziemia, x:368, y:128}],
[{o:podloze_ziemia, x:384, y:128}],
[{o:podloze_ziemia, x:400, y:128}],
[{o:podloze_ziemia, x:416, y:128}],
[{o:podloze_ziemia, x:432, y:128}],
[{o:podloze_ziemia, x:432, y:112}],
[{o:podloze_ziemia, x:352, y:112}],
[{o:podloze_ziemia, x:352, y:128}],
[{o:hinduska, x:384, y:80}],
[{o:slon_do_wziecia_dup, x:1200, y:384}],
[{o:klocek, x:1200, y:416}],
[{o:klocek, x:1232, y:416}],
[{o:klocek, x:1184, y:384}],
[{o:klocek, x:1248, y:384}],
[{o:klocek, x:1216, y:368}]];
this.start = function() {
__room_start__(this, Indie, 1280, 480, 30, 255, 255, 255, niebo_szare.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='slon';
};
}
var Indie = new __Indie();
tu_scenes.push(Indie);
function __Indie2() { 
this.tiles = [
[1000000,
[background_3,
[192,96,16,16,272,144],
[208,96,16,16,288,144],
[192,112,16,16,272,176],
[208,112,16,16,288,176],
[208,112,16,16,176,176],
[208,112,16,16,192,176],
[208,112,16,16,176,192],
[208,112,16,16,192,192],
[192,128,16,16,176,208],
[192,128,16,16,192,208],
[192,128,16,16,176,224],
[192,128,16,16,192,224],
[192,128,16,16,80,176],
[192,128,16,16,96,176],
[192,128,16,16,96,192],
[192,128,16,16,80,192],
[192,128,16,16,80,208],
[192,128,16,16,96,208],
[192,128,16,16,96,224],
[192,128,16,16,80,224],
[192,128,16,16,160,384],
[192,128,16,16,176,400],
[192,128,16,16,368,272],
[192,128,16,16,384,272],
[192,128,16,16,400,272],
[192,128,16,16,416,256],
[192,128,16,16,416,240],
[192,128,16,16,416,224],
[192,128,16,16,416,208],
[192,128,16,16,400,192],
[192,128,16,16,384,176],
[192,128,16,16,368,176],
[192,128,16,16,352,192],
[192,128,16,16,336,208],
[192,128,16,16,336,224],
[192,128,16,16,336,240],
[192,128,16,16,352,256],
[192,128,16,16,384,240],
[192,128,16,16,384,256],
[192,128,16,16,400,240],
[192,128,16,16,208,320],
[192,128,16,16,208,336],
[192,128,16,16,224,352],
[192,128,16,16,256,368],
[192,128,16,16,288,368],
[192,128,16,16,272,368],
[192,128,16,16,240,368],
[192,128,16,16,288,384],
[192,128,16,16,320,384],
[192,128,16,16,304,384],
[192,128,16,16,336,272],
[192,128,16,16,320,288],
[192,128,16,16,304,304],
[192,128,16,16,288,288],
[192,128,16,16,272,272],
[192,128,16,16,256,272],
[192,128,16,16,240,272],
[192,128,16,16,224,288],
[192,128,16,16,208,304],
[192,128,16,16,432,176],
[192,128,16,16,464,192],
[192,128,16,16,448,176],
[192,128,16,16,480,208],
[192,128,16,16,496,208],
[192,128,16,16,512,224],
[192,128,16,16,512,240],
[192,128,16,16,528,240],
[192,128,16,16,544,256],
[192,128,16,16,560,272],
[192,128,16,16,560,288],
[192,128,16,16,560,304],
[192,128,16,16,224,432],
[192,128,16,16,208,432],
[192,128,16,16,192,432],
[192,128,16,16,208,448],
[192,128,16,16,240,416],
[192,128,16,16,240,400],
[192,128,16,16,304,448],
[192,128,16,16,320,448],
[192,128,16,16,336,432],
[192,128,16,16,416,336],
[192,128,16,16,400,368],
[192,128,16,16,400,352],
[192,128,16,16,400,384],
[192,128,16,16,416,400],
[192,128,16,16,416,416],
[192,128,16,16,432,416],
[192,128,16,16,432,432],
[192,128,16,16,432,448]]]];
this.objects = [
[{o:podloze_ziemia, x:16, y:448}],
[{o:podloze_ziemia, x:32, y:448}],
[{o:podloze_ziemia, x:48, y:448}],
[{o:podloze_ziemia, x:64, y:448}],
[{o:podloze_ziemia, x:16, y:48}],
[{o:podloze_ziemia, x:32, y:48}],
[{o:podloze_ziemia, x:48, y:48}],
[{o:podloze_ziemia, x:64, y:48}],
[{o:Walenty, x:48, y:16}],
[{o:klocek, x:80, y:80}],
[{o:klocek, x:112, y:80}],
[{o:klocek, x:144, y:80}],
[{o:klocek, x:176, y:80}],
[{o:klocek, x:272, y:80}],
[{o:klocek, x:272, y:48}],
[{o:klocek, x:272, y:16}],
[{o:klocek, x:272, y:112}],
[{o:podloze_ziemia, x:80, y:160}],
[{o:podloze_ziemia, x:96, y:160}],
[{o:podloze_ziemia, x:176, y:160}],
[{o:podloze_ziemia, x:192, y:160}],
[{o:podloze_ziemia, x:272, y:160}],
[{o:podloze_ziemia, x:288, y:160}],
[{o:podloze_ziemia, x:288, y:272}],
[{o:podloze_ziemia, x:304, y:288}],
[{o:podloze_ziemia, x:320, y:272}],
[{o:podloze_ziemia, x:336, y:288}],
[{o:podloze_ziemia, x:304, y:272}],
[{o:podloze_ziemia, x:352, y:272}],
[{o:podloze_ziemia, x:352, y:288}],
[{o:podloze_ziemia, x:416, y:272}],
[{o:podloze_ziemia, x:432, y:272}],
[{o:podloze_ziemia, x:448, y:256}],
[{o:podloze_ziemia, x:448, y:272}],
[{o:bonus, x:80, y:384}],
[{o:bonus, x:80, y:336}],
[{o:bonus, x:80, y:272}],
[{o:bonus, x:160, y:336}],
[{o:bonus, x:160, y:272}],
[{o:bonus, x:352, y:112}],
[{o:bonus, x:352, y:64}],
[{o:bonus, x:416, y:64}],
[{o:bonus, x:416, y:112}],
[{o:podloze_skos_lewy, x:448, y:240}],
[{o:podloze_ziemia, x:512, y:368}],
[{o:podloze_ziemia, x:528, y:368}],
[{o:podloze_ziemia, x:528, y:384}],
[{o:podloze_ziemia, x:544, y:384}],
[{o:podloze_ziemia, x:544, y:400}],
[{o:podloze_ziemia, x:560, y:400}],
[{o:podloze_ziemia, x:624, y:448}],
[{o:podloze_ziemia, x:640, y:448}],
[{o:podloze_ziemia, x:656, y:448}],
[{o:podloze_ziemia, x:672, y:448}],
[{o:podloze_ziemia, x:736, y:400}],
[{o:podloze_ziemia, x:720, y:400}],
[{o:podloze_ziemia, x:752, y:400}],
[{o:podloze_ziemia, x:768, y:400}],
[{o:podloze_ziemia, x:816, y:352}],
[{o:podloze_ziemia, x:832, y:352}],
[{o:podloze_ziemia, x:848, y:352}],
[{o:podloze_ziemia, x:864, y:352}],
[{o:podloze_ziemia, x:928, y:400}],
[{o:podloze_ziemia, x:944, y:400}],
[{o:podloze_ziemia, x:960, y:400}],
[{o:podloze_ziemia, x:976, y:400}],
[{o:podloze_ziemia, x:784, y:288}],
[{o:podloze_ziemia, x:768, y:288}],
[{o:podloze_ziemia, x:752, y:288}],
[{o:podloze_ziemia, x:1040, y:448}],
[{o:podloze_ziemia, x:1056, y:448}],
[{o:podloze_ziemia, x:1072, y:448}],
[{o:podloze_ziemia, x:1088, y:448}],
[{o:podloze_ziemia, x:1136, y:400}],
[{o:podloze_ziemia, x:1152, y:400}],
[{o:podloze_ziemia, x:1168, y:400}],
[{o:podloze_ziemia, x:1184, y:400}],
[{o:klocek_ciemny, x:1216, y:336}],
[{o:klocek_ciemny, x:1040, y:288}],
[{o:klocek_ciemny, x:896, y:208}],
[{o:klocek, x:896, y:272}],
[{o:klocek, x:1216, y:272}],
[{o:klocek, x:1040, y:224}],
[{o:klocek, x:1136, y:304}],
[{o:klocek_ciemny, x:1136, y:240}],
[{o:podloze_ziemia, x:720, y:224}],
[{o:podloze_ziemia, x:704, y:224}],
[{o:podloze_ziemia, x:688, y:224}],
[{o:podloze_ziemia, x:688, y:80}],
[{o:podloze_ziemia, x:704, y:80}],
[{o:podloze_ziemia, x:720, y:80}],
[{o:podloze_ziemia, x:752, y:80}],
[{o:podloze_ziemia, x:736, y:80}],
[{o:podloze_ziemia, x:672, y:80}],
[{o:slon_do_wziecia_dup, x:592, y:224}],
[{o:podloze_ziemia, x:592, y:288}],
[{o:podloze_ziemia, x:608, y:288}],
[{o:podloze_ziemia, x:624, y:288}],
[{o:podloze_ziemia, x:640, y:288}],
[{o:podloze_trawa, x:592, y:304}],
[{o:podloze_trawa, x:624, y:304}],
[{o:podloze_ziemia, x:416, y:288}],
[{o:podloze_ziemia, x:400, y:288}],
[{o:podloze_ziemia, x:384, y:288}],
[{o:podloze_ziemia, x:368, y:288}],
[{o:podloze_ziemia, x:464, y:240}],
[{o:podloze_ziemia, x:464, y:224}],
[{o:podloze_ziemia, x:480, y:224}],
[{o:podloze_ziemia, x:496, y:224}],
[{o:podloze_ziemia, x:512, y:208}],
[{o:podloze_ziemia, x:496, y:192}],
[{o:podloze_ziemia, x:480, y:192}],
[{o:podloze_ziemia, x:464, y:208}],
[{o:podloze_ziemia, x:512, y:176}],
[{o:podloze_ziemia, x:528, y:176}],
[{o:podloze_ziemia, x:544, y:192}],
[{o:podloze_ziemia, x:528, y:208}],
[{o:podloze_ziemia, x:544, y:160}],
[{o:podloze_ziemia, x:560, y:160}],
[{o:podloze_ziemia, x:576, y:160}],
[{o:podloze_ziemia, x:560, y:144}],
[{o:podloze_ziemia, x:576, y:144}],
[{o:podloze_ziemia, x:592, y:144}],
[{o:podloze_ziemia, x:592, y:128}],
[{o:podloze_ziemia, x:608, y:128}],
[{o:podloze_ziemia, x:624, y:128}],
[{o:podloze_ziemia, x:624, y:112}],
[{o:podloze_ziemia, x:640, y:112}],
[{o:podloze_ziemia, x:656, y:112}],
[{o:podloze_ziemia, x:656, y:96}],
[{o:podloze_ziemia, x:672, y:96}],
[{o:podloze_ziemia, x:768, y:80}],
[{o:podloze_ziemia, x:784, y:80}],
[{o:podloze_ziemia, x:800, y:80}],
[{o:podloze_ziemia, x:816, y:80}],
[{o:podloze_ziemia, x:848, y:80}],
[{o:podloze_ziemia, x:832, y:80}],
[{o:podloze_ziemia, x:864, y:80}],
[{o:podloze_skos_lewy, x:656, y:80}],
[{o:podloze_skos_lewy, x:640, y:96}],
[{o:podloze_skos_lewy, x:608, y:112}],
[{o:podloze_skos_lewy, x:576, y:128}],
[{o:podloze_skos_lewy, x:544, y:144}],
[{o:podloze_skos_lewy, x:528, y:160}],
[{o:podloze_skos_lewy, x:496, y:176}],
[{o:podloze_skos_lewy, x:432, y:256}],
[{o:podloze_ziemia, x:880, y:80}],
[{o:podloze_ziemia, x:896, y:80}],
[{o:podloze_ziemia, x:912, y:80}],
[{o:podloze_ziemia, x:928, y:80}],
[{o:podloze_ziemia, x:944, y:80}],
[{o:podloze_ziemia, x:960, y:80}],
[{o:podloze_ziemia, x:960, y:64}],
[{o:podloze_ziemia, x:1072, y:48}],
[{o:podloze_ziemia, x:1072, y:64}],
[{o:podloze_ziemia, x:1088, y:64}],
[{o:podloze_ziemia, x:1104, y:64}],
[{o:podloze_ziemia, x:1120, y:64}],
[{o:podloze_ziemia, x:1136, y:64}],
[{o:podloze_ziemia, x:1152, y:64}],
[{o:podloze_ziemia, x:1168, y:64}],
[{o:podloze_ziemia, x:1168, y:48}],
[{o:wrog2, x:1136, y:16}],
[{o:wrog1, x:880, y:16}],
[{o:hinduska, x:32, y:400}]];
this.start = function() {
__room_start__(this, Indie2, 1280, 480, 30, 255, 255, 255, niebo_szare.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='slon';
};
}
var Indie2 = new __Indie2();
tu_scenes.push(Indie2);
function __American_girl() { 
this.tiles = [
];
this.objects = [
[{o:girl_napis, x:368, y:208}]];
this.start = function() {
__room_start__(this, American_girl, 640, 480, 30, 0, 0, 0, poziom_tlo.image, 0, 0, 0, 640, 480, null, 50, 50);

poziomu_nazwa='AMERICAN';
poziomu_nr=5;
};
}
var American_girl = new __American_girl();
tu_scenes.push(American_girl);
function __AmerykanskiDream() { 
this.tiles = [
[1000000,
[background_3,
[384,416,16,16,240,240],
[384,416,16,16,272,240],
[384,416,16,16,304,240],
[384,320,16,16,224,240],
[384,320,16,16,256,240],
[400,320,16,16,288,240],
[400,320,16,16,320,240],
[448,96,16,16,224,256],
[448,96,16,16,224,272],
[448,96,16,16,224,288],
[448,96,16,16,224,304],
[448,96,16,16,224,320],
[448,96,16,16,224,336],
[448,96,16,16,224,352],
[448,96,16,16,224,368],
[496,96,16,16,320,256],
[496,96,16,16,320,272],
[496,96,16,16,320,288],
[496,96,16,16,320,304],
[496,96,16,16,320,320],
[496,96,16,16,320,336],
[496,96,16,16,320,352],
[496,96,16,16,320,368],
[480,96,16,16,256,288],
[480,96,16,16,256,304],
[480,96,16,16,256,320],
[480,96,16,16,256,336],
[480,96,16,16,256,352],
[480,96,16,16,256,368],
[480,96,16,16,288,368],
[480,96,16,16,288,352],
[480,96,16,16,288,336],
[480,96,16,16,288,320],
[480,96,16,16,288,304],
[480,96,16,16,288,288],
[480,96,16,16,240,320],
[480,96,16,16,272,320],
[480,96,16,16,304,320],
[384,400,16,16,224,320],
[384,400,16,16,240,320],
[384,400,16,16,256,320],
[384,400,16,16,272,320],
[384,400,16,16,288,320],
[384,400,16,16,304,320],
[384,400,16,16,320,320],
[448,144,16,16,240,368],
[448,144,16,16,224,368],
[464,144,16,16,240,368],
[464,144,16,16,272,368],
[464,144,16,16,304,368],
[464,128,16,16,240,352],
[464,128,16,16,240,336],
[464,128,16,16,272,336],
[464,128,16,16,272,352],
[464,128,16,16,304,352],
[464,128,16,16,304,336],
[144,32,16,16,220,380],
[144,32,16,16,240,380],
[144,32,16,16,260,380],
[144,32,16,16,280,380],
[144,32,16,16,300,380],
[144,32,16,16,320,380],
[80,432,16,16,0,448],
[80,432,16,16,32,448],
[80,432,16,16,16,448],
[80,432,16,16,48,448],
[80,432,16,16,64,448],
[80,432,16,16,80,448],
[80,432,16,16,96,464],
[80,432,16,16,80,464],
[80,432,16,16,64,464],
[80,432,16,16,48,464],
[80,432,16,16,32,464],
[80,432,16,16,16,464],
[80,432,16,16,0,464],
[80,432,16,16,448,464],
[80,432,16,16,480,464],
[80,432,16,16,496,464],
[80,432,16,16,528,464],
[80,432,16,16,512,464],
[80,432,16,16,528,448],
[80,432,16,16,512,448],
[80,432,16,16,496,448],
[80,432,16,16,480,448],
[80,432,16,16,464,448],
[80,432,16,16,464,464]],
[background_1190,
[160,256,32,32,160,432],
[160,256,32,32,128,432],
[160,256,32,32,96,432],
[160,256,32,32,368,432],
[160,256,32,32,400,432],
[160,256,32,32,432,432],
[160,256,32,32,192,448],
[160,256,32,32,224,448],
[160,256,32,32,256,448],
[160,256,32,32,288,448],
[160,256,32,32,336,448],
[160,256,32,32,320,448],
[160,256,32,32,112,448],
[160,256,32,32,144,448],
[160,256,32,32,176,448],
[160,256,32,32,368,448],
[160,256,32,32,416,448],
[160,256,32,32,400,448],
[160,288,32,32,96,448],
[160,288,32,32,432,448],
[160,288,32,32,544,432],
[160,288,32,32,544,464],
[160,288,32,32,576,432],
[160,288,32,32,608,432],
[160,288,32,32,640,432],
[160,288,32,32,672,432],
[160,288,32,32,576,464],
[160,288,32,32,608,464],
[160,288,32,32,640,464],
[160,288,32,32,672,464],
[160,288,32,32,704,432],
[160,288,32,32,704,464],
[160,288,32,32,736,448],
[160,288,32,32,736,432],
[160,288,32,32,768,432],
[160,288,32,32,800,432],
[160,288,32,32,832,432],
[160,288,32,32,864,432],
[160,288,32,32,768,464],
[160,288,32,32,800,464],
[160,288,32,32,832,464],
[160,288,32,32,864,464],
[0,320,32,32,896,448],
[0,320,32,32,928,448],
[0,320,32,32,960,448],
[0,320,32,32,992,464],
[0,320,32,32,1024,464],
[0,320,32,32,1056,464],
[0,320,32,32,1088,464],
[0,320,32,32,1120,448],
[0,320,32,32,1152,448],
[0,320,32,32,1184,448]]]];
this.objects = [
[{o:Walenty, x:80, y:60}],
[{o:podloze_ziemia, x:112, y:160}],
[{o:podloze_ziemia, x:208, y:192}],
[{o:podloze_ziemia, x:224, y:192}],
[{o:podloze_ziemia, x:240, y:192}],
[{o:podloze_ziemia, x:256, y:192}],
[{o:podloze_ziemia, x:272, y:192}],
[{o:podloze_ziemia, x:288, y:192}],
[{o:podloze_ziemia, x:304, y:192}],
[{o:podloze_ziemia, x:320, y:192}],
[{o:podloze_ziemia, x:336, y:192}],
[{o:podloze_ziemia, x:352, y:192}],
[{o:podloze_ziemia, x:432, y:160}],
[{o:podloze_ziemia, x:448, y:160}],
[{o:podloze_ziemia, x:464, y:160}],
[{o:girl_american, x:240, y:112}],
[{o:podloze_trawa, x:256, y:208}],
[{o:podloze_trawa, x:288, y:208}],
[{o:podloze_trawa, x:320, y:208}],
[{o:podloze_trawa, x:224, y:208}],
[{o:podloze_trawa, x:208, y:208}],
[{o:podloze_ziemia, x:192, y:192}],
[{o:podloze_trawa, x:224, y:400}],
[{o:podloze_trawa, x:256, y:400}],
[{o:podloze_trawa, x:288, y:400}],
[{o:podloze_trawa, x:304, y:400}],
[{o:burger_do_wziecia, x:576, y:64}],
[{o:klocek_ciemny, x:656, y:96}],
[{o:klocek_ciemny, x:720, y:80}],
[{o:klocek_ciemny, x:784, y:64}],
[{o:klocek_ciemny, x:848, y:80}],
[{o:klocek_ciemny, x:912, y:96}],
[{o:klocek_ciemny, x:976, y:112}],
[{o:klocek_ciemny, x:1040, y:128}],
[{o:klocek_ciemny, x:1104, y:144}],
[{o:podloze_ziemia, x:192, y:432}],
[{o:podloze_ziemia, x:208, y:432}],
[{o:podloze_ziemia, x:224, y:432}],
[{o:podloze_ziemia, x:240, y:432}],
[{o:podloze_ziemia, x:256, y:432}],
[{o:podloze_ziemia, x:272, y:432}],
[{o:podloze_ziemia, x:288, y:432}],
[{o:podloze_ziemia, x:304, y:432}],
[{o:podloze_ziemia, x:320, y:432}],
[{o:podloze_ziemia, x:336, y:432}],
[{o:podloze_ziemia, x:352, y:432}],
[{o:podloze_ziemia, x:80, y:432}],
[{o:podloze_ziemia, x:64, y:432}],
[{o:podloze_ziemia, x:48, y:432}],
[{o:podloze_ziemia, x:32, y:432}],
[{o:podloze_ziemia, x:16, y:432}],
[{o:podloze_ziemia, x:0, y:432}],
[{o:podloze_ziemia, x:464, y:432}],
[{o:podloze_ziemia, x:480, y:432}],
[{o:podloze_ziemia, x:496, y:432}],
[{o:podloze_ziemia, x:512, y:432}],
[{o:podloze_ziemia, x:528, y:432}],
[{o:podloze_ziemia, x:32, y:416}],
[{o:podloze_ziemia, x:16, y:416}],
[{o:podloze_ziemia, x:0, y:416}],
[{o:podloze_ziemia, x:16, y:400}],
[{o:podloze_ziemia, x:0, y:400}],
[{o:podloze_ziemia, x:0, y:384}],
[{o:podloze_ziemia, x:64, y:336}],
[{o:podloze_ziemia, x:80, y:336}],
[{o:podloze_ziemia, x:16, y:272}],
[{o:podloze_ziemia, x:0, y:272}],
[{o:podloze_ziemia, x:80, y:224}],
[{o:podloze_ziemia, x:0, y:192}],
[{o:podloze_ziemia, x:64, y:128}],
[{o:podloze_ziemia, x:80, y:128}],
[{o:podloze_ziemia, x:96, y:144}],
[{o:podloze_ziemia, x:112, y:144}],
[{o:podloze_ziemia, x:128, y:160}],
[{o:podloze_ziemia, x:96, y:128}],
[{o:podloze_ziemia, x:64, y:224}],
[{o:klocek, x:640, y:176}],
[{o:podloze_ziemia, x:896, y:432}],
[{o:podloze_ziemia, x:912, y:432}],
[{o:podloze_ziemia, x:928, y:432}],
[{o:podloze_ziemia, x:944, y:432}],
[{o:podloze_ziemia, x:960, y:432}],
[{o:podloze_ziemia, x:976, y:432}],
[{o:podloze_trawa, x:992, y:432}],
[{o:podloze_trawa, x:1024, y:432}],
[{o:podloze_trawa, x:1056, y:432}],
[{o:podloze_trawa, x:1088, y:432}],
[{o:podloze_ziemia, x:1120, y:432}],
[{o:podloze_ziemia, x:1136, y:432}],
[{o:podloze_ziemia, x:1152, y:432}],
[{o:podloze_ziemia, x:1168, y:432}],
[{o:podloze_ziemia, x:1184, y:432}],
[{o:podloze_ziemia, x:1200, y:432}],
[{o:klocek, x:1216, y:432}],
[{o:klocek, x:1248, y:432}],
[{o:klocek, x:1280, y:432}],
[{o:klocek, x:1312, y:432}],
[{o:klocek, x:1344, y:432}],
[{o:podloze_ziemia, x:1376, y:432}],
[{o:podloze_ziemia, x:1392, y:432}],
[{o:podloze_ziemia, x:1408, y:432}],
[{o:podloze_ziemia, x:1424, y:432}],
[{o:podloze_ziemia, x:1440, y:432}],
[{o:podloze_ziemia, x:1456, y:432}],
[{o:podloze_trawa, x:1472, y:432}],
[{o:podloze_trawa, x:1504, y:432}],
[{o:podloze_trawa, x:1552, y:432}],
[{o:podloze_trawa, x:1584, y:432}],
[{o:podloze_trawa, x:1616, y:432}],
[{o:podloze_ziemia, x:1536, y:432}],
[{o:podloze_ziemia, x:1648, y:432}],
[{o:bonus, x:1104, y:80}],
[{o:bonus, x:1184, y:368}],
[{o:bonus, x:1376, y:368}],
[{o:bonus, x:1424, y:368}],
[{o:klocek, x:1168, y:160}],
[{o:klocek, x:1232, y:176}],
[{o:klocek, x:1296, y:192}],
[{o:klocek, x:1360, y:208}],
[{o:klocek, x:1424, y:224}],
[{o:klocek, x:1488, y:240}],
[{o:kladka, x:1552, y:384}],
[{o:kladka, x:1600, y:384}],
[{o:bonus, x:1136, y:368}],
[{o:bonus, x:1248, y:368}],
[{o:bonus, x:1312, y:368}],
[{o:bonus, x:1248, y:336}],
[{o:bonus, x:1312, y:336}],
[{o:bonus, x:1488, y:368}],
[{o:bonus, x:1072, y:368}],
[{o:bonus, x:1072, y:320}],
[{o:bonus, x:1024, y:368}],
[{o:bonus, x:1024, y:320}],
[{o:bonus, x:976, y:368}],
[{o:bonus, x:976, y:320}],
[{o:bonus, x:928, y:368}],
[{o:bonus, x:896, y:368}],
[{o:chmura, x:1296, y:32}],
[{o:chmura, x:864, y:160}],
[{o:konggobj, x:240, y:256}],
[{o:klocek, x:224, y:256}],
[{o:klocek, x:256, y:256}],
[{o:klocek, x:288, y:256}],
[{o:klocek, x:304, y:256}],
[{o:klocek, x:288, y:240}],
[{o:klocek, x:256, y:240}],
[{o:klocek, x:240, y:240}]];
this.start = function() {
__room_start__(this, AmerykanskiDream, 1660, 480, 30, 0, 0, 0, niebo_ciemne.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='burg';
};
}
var AmerykanskiDream = new __AmerykanskiDream();
tu_scenes.push(AmerykanskiDream);
function __tlo_Europe_et6() { 
this.tiles = [
];
this.objects = [
[{o:girl_napis, x:360, y:180}]];
this.start = function() {
__room_start__(this, tlo_Europe_et6, 640, 480, 30, 0, 0, 0, poziom_tlo.image, 0, 0, 0, 640, 480, null, 50, 50);

poziomu_nazwa='European';
poziomu_nr=6;
};
}
var tlo_Europe_et6 = new __tlo_Europe_et6();
tu_scenes.push(tlo_Europe_et6);
function __europe_europe() { 
this.tiles = [
[1000000,
[background_1190,
[320,64,32,32,0,432],
[320,32,32,32,0,400],
[320,32,32,32,0,384],
[320,0,32,32,0,352],
[320,64,32,32,64,448],
[320,32,32,32,64,416],
[320,0,32,32,64,384],
[320,64,32,32,64,432],
[288,96,32,32,256,416],
[256,192,32,32,288,416],
[256,160,32,32,288,400],
[256,192,32,32,352,416],
[256,160,32,32,352,384],
[384,160,32,32,320,416],
[256,192,32,32,560,416],
[256,192,32,32,560,400],
[256,160,32,32,560,384],
[256,160,32,32,560,368],
[352,448,32,32,384,416],
[256,448,32,32,384,400],
[416,160,32,32,416,416],
[384,160,32,32,448,416],
[480,128,32,32,592,464],
[480,96,32,32,592,432],
[320,160,32,32,592,448],
[64,160,32,32,624,464],
[64,160,32,32,656,464],
[64,160,32,32,688,464],
[64,160,32,32,720,464],
[64,160,32,32,752,464],
[64,160,32,32,784,464],
[96,160,32,32,880,464],
[96,160,32,32,912,464],
[96,160,32,32,944,464],
[96,160,32,32,976,464],
[96,160,32,32,1040,464],
[96,160,32,32,1072,464],
[96,160,32,32,1104,464],
[96,160,32,32,1136,464],
[96,160,32,32,1168,464],
[96,160,32,32,1200,464],
[96,160,32,32,1232,464],
[96,160,32,32,1264,464],
[384,224,32,32,704,160],
[384,224,32,32,768,160],
[416,96,32,32,720,160],
[416,96,32,32,736,160],
[128,320,32,32,704,192],
[128,320,32,32,736,192],
[128,320,32,32,768,192],
[320,256,32,32,496,128],
[288,256,32,32,464,128],
[256,256,32,32,432,128],
[416,160,32,32,432,112],
[448,192,32,32,496,112],
[480,160,32,32,416,112],
[448,64,32,32,384,144],
[448,32,32,32,384,112],
[448,0,32,32,384,80],
[448,64,32,32,528,144],
[448,32,32,32,528,112],
[448,0,32,32,528,80],
[416,96,32,32,240,80],
[416,96,32,32,288,80],
[416,96,32,32,592,80],
[416,96,32,32,640,80],
[384,224,32,32,128,160],
[384,224,32,32,176,160],
[416,96,32,32,144,160]],
[background_272,
[272,96,16,16,320,432],
[272,96,16,16,336,432],
[272,96,16,16,336,416],
[272,80,16,16,320,416],
[272,80,16,16,336,416],
[384,96,16,16,384,432],
[400,96,16,16,400,432],
[416,96,16,16,416,432],
[432,96,16,16,432,432],
[384,80,16,16,384,416],
[400,80,16,16,400,416],
[416,80,16,16,416,416],
[432,80,16,16,432,416],
[448,96,16,16,448,432],
[464,96,16,16,464,432],
[480,96,16,16,480,432],
[496,96,16,16,496,432],
[448,80,16,16,448,416],
[464,80,16,16,464,416],
[480,80,16,16,480,416],
[496,80,16,16,496,416],
[384,96,16,16,512,432],
[400,96,16,16,528,432],
[416,96,16,16,544,432],
[432,96,16,16,560,432],
[432,80,16,16,560,416],
[416,80,16,16,544,416],
[400,80,16,16,528,416],
[384,80,16,16,512,416]]]];
this.objects = [
[{o:podloze_trawa, x:0, y:448}],
[{o:podloze_trawa, x:32, y:448}],
[{o:podloze_trawa, x:64, y:448}],
[{o:podloze_trawa, x:96, y:448}],
[{o:podloze_ziemia, x:0, y:336}],
[{o:podloze_ziemia, x:16, y:336}],
[{o:podloze_ziemia, x:64, y:368}],
[{o:podloze_ziemia, x:80, y:368}],
[{o:podloze_trawa, x:256, y:448}],
[{o:podloze_trawa, x:288, y:448}],
[{o:podloze_trawa, x:320, y:448}],
[{o:podloze_trawa, x:352, y:448}],
[{o:podloze_trawa, x:400, y:448}],
[{o:podloze_trawa, x:384, y:448}],
[{o:podloze_trawa, x:432, y:448}],
[{o:podloze_trawa, x:464, y:448}],
[{o:podloze_trawa, x:496, y:448}],
[{o:podloze_ziemia, x:528, y:464}],
[{o:podloze_ziemia, x:512, y:464}],
[{o:podloze_ziemia, x:528, y:448}],
[{o:podloze_ziemia, x:544, y:448}],
[{o:podloze_ziemia, x:544, y:464}],
[{o:podloze_ziemia, x:560, y:464}],
[{o:podloze_ziemia, x:576, y:464}],
[{o:podloze_ziemia, x:576, y:448}],
[{o:podloze_ziemia, x:560, y:448}],
[{o:podloze_ziemia, x:592, y:464}],
[{o:podloze_skos_lewy, x:496, y:464}],
[{o:podloze_skos_lewy, x:512, y:448}],
[{o:podloze_skos_prawy, x:592, y:448}],
[{o:podloze_skos_prawy, x:608, y:464}],
[{o:podloze_ziemia, x:816, y:464}],
[{o:podloze_ziemia, x:832, y:464}],
[{o:podloze_ziemia, x:848, y:464}],
[{o:podloze_ziemia, x:864, y:464}],
[{o:podloze_ziemia, x:576, y:432}],
[{o:podloze_ziemia, x:1008, y:464}],
[{o:podloze_ziemia, x:1024, y:464}],
[{o:Walenty, x:144, y:336}],
[{o:wrog1, x:480, y:400}],
[{o:wrog1, x:528, y:400}],
[{o:klocek, x:640, y:368}],
[{o:klocek, x:672, y:368}],
[{o:klocek, x:736, y:304}],
[{o:klocek, x:768, y:304}],
[{o:kladka, x:832, y:224}],
[{o:podloze_ziemia, x:784, y:192}],
[{o:podloze_ziemia, x:784, y:176}],
[{o:podloze_ziemia, x:768, y:192}],
[{o:podloze_ziemia, x:752, y:192}],
[{o:podloze_ziemia, x:736, y:192}],
[{o:podloze_ziemia, x:720, y:192}],
[{o:podloze_ziemia, x:704, y:192}],
[{o:podloze_ziemia, x:704, y:176}],
[{o:wrog1, x:736, y:144}],
[{o:podloze_ziemia, x:656, y:112}],
[{o:podloze_ziemia, x:640, y:112}],
[{o:podloze_ziemia, x:624, y:112}],
[{o:podloze_ziemia, x:608, y:112}],
[{o:podloze_ziemia, x:592, y:112}],
[{o:wrog2, x:608, y:64}],
[{o:wrogAniol, x:880, y:144}],
[{o:podloze_ziemia, x:512, y:144}],
[{o:podloze_ziemia, x:512, y:128}],
[{o:podloze_ziemia, x:496, y:144}],
[{o:podloze_ziemia, x:480, y:144}],
[{o:podloze_ziemia, x:464, y:144}],
[{o:podloze_ziemia, x:448, y:144}],
[{o:podloze_ziemia, x:432, y:144}],
[{o:podloze_ziemia, x:416, y:144}],
[{o:podloze_ziemia, x:416, y:128}],
[{o:podloze_ziemia, x:384, y:160}],
[{o:podloze_ziemia, x:400, y:160}],
[{o:podloze_ziemia, x:528, y:160}],
[{o:podloze_ziemia, x:544, y:160}],
[{o:podloze_ziemia, x:512, y:160}],
[{o:podloze_ziemia, x:496, y:160}],
[{o:podloze_ziemia, x:480, y:160}],
[{o:podloze_ziemia, x:464, y:160}],
[{o:podloze_ziemia, x:448, y:160}],
[{o:podloze_ziemia, x:432, y:160}],
[{o:podloze_ziemia, x:416, y:160}],
[{o:podloze_ziemia, x:384, y:64}],
[{o:podloze_ziemia, x:400, y:64}],
[{o:podloze_ziemia, x:528, y:64}],
[{o:podloze_ziemia, x:544, y:64}],
[{o:podloze_ziemia, x:304, y:112}],
[{o:podloze_ziemia, x:288, y:112}],
[{o:podloze_ziemia, x:272, y:112}],
[{o:podloze_ziemia, x:256, y:112}],
[{o:podloze_ziemia, x:240, y:112}],
[{o:wrog2, x:256, y:64}],
[{o:klocek_ciemny, x:1232, y:96}],
[{o:podloze_ziemia, x:192, y:176}],
[{o:podloze_ziemia, x:192, y:192}],
[{o:podloze_ziemia, x:176, y:192}],
[{o:podloze_ziemia, x:160, y:192}],
[{o:podloze_ziemia, x:144, y:192}],
[{o:podloze_ziemia, x:128, y:192}],
[{o:podloze_ziemia, x:128, y:176}],
[{o:wrog1, x:144, y:144}],
[{o:podloze_ziemia, x:320, y:112}],
[{o:podloze_ziemia, x:336, y:112}],
[{o:podloze_ziemia, x:592, y:96}],
[{o:podloze_ziemia, x:336, y:96}],
[{o:podloze_ziemia, x:672, y:112}],
[{o:podloze_ziemia, x:688, y:112}],
[{o:podloze_ziemia, x:688, y:96}],
[{o:podloze_ziemia, x:224, y:112}],
[{o:podloze_ziemia, x:224, y:112}],
[{o:podloze_ziemia, x:208, y:112}],
[{o:podloze_ziemia, x:208, y:96}],
[{o:bialorusinka2, x:448, y:80}],
[{o:podloze_trawa, x:224, y:448}],
[{o:podloze_trawa, x:192, y:448}],
[{o:podloze_trawa, x:160, y:448}],
[{o:podloze_trawa, x:128, y:448}],
[{o:klocek, x:976, y:256}],
[{o:klocek, x:1088, y:160}],
[{o:kwiatek_do_wziecia, x:1232, y:16}],
[{o:klocek, x:256, y:0}],
[{o:klocek, x:608, y:0}]];
this.start = function() {
__room_start__(this, europe_europe, 1280, 480, 30, 0, 0, 0, niebo_ciemne.image, 0, 0, 1, 640, 480, Walenty, 200, 200);

co_wymagane='kwiat';// kwiatek_pomyslany
};
}
var europe_europe = new __europe_europe();
tu_scenes.push(europe_europe);
function __ekran_koncowy() { 
this.tiles = [
];
this.objects = [
];
this.start = function() {
__room_start__(this, ekran_koncowy, 640, 480, 30, 0, 0, 0, poziom_tlo.image, 0, 0, 0, 640, 480, null, 50, 50);

end_text="Now, after pick up all the girls...";
end_text2="try the same in the real world";


var t_game = document.getElementById('tululoogame');

var end_game1 = document.getElementById('end_game1');

var end_game2 = document.getElementById('end_game2');
// jeśli obiekt punkty nie istnieje:

if (end_game1===null)
{
	var end_game1_div = document.createElement('div');
	divIdName = 'end_game1';

	end_game1_div.setAttribute('id',divIdName);
	end_game1_div.setAttribute('name',divIdName);
	end_game1_div.setAttribute('style','position: absolute; top: 30px; left: 20px; background-color: red; padding: 5px; font-size: 25px; color: pink; text-align: center;');

	end_game1_div.innerHTML = end_text;

	t_game.appendChild(end_game1_div);
	
	
	var end_game2_div = document.createElement('div');
	divIdName = 'end_game2';

	end_game2_div.setAttribute('id',divIdName);
	end_game2_div.setAttribute('name',divIdName);
	end_game2_div.setAttribute('style','position: absolute; top: 130px; left: 20px; background-color: red; padding: 5px; font-size: 25px; color: pink; text-align: center;');

	end_game2_div.innerHTML = end_text2;

	t_game.appendChild(end_game2_div);
	
	end_game1_div.addEventListener("click",room_goto_first,false);
	end_game2_div.addEventListener("click",room_goto_first,false);
	
 
	
}

};
}
var ekran_koncowy = new __ekran_koncowy();
tu_scenes.push(ekran_koncowy);
tu_room_to_go = EkranStartowy;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/
dzwieki_on_bool=true;
muzyka_on_bool=true;

dzwieki_tylko_etapu=true;

moze_latac=false;

global.game_paused=false; 
global.friendzoned=false;

zycia=5;
best_punkty=0;
punkty=0;
x_gracza=0;
y_gracza=0;
bity=0;
ile_chmurek=0;
chmurki=[];
zawartosc_chmurek=[];
poziomu_nazwa='';
poziomu_nr=0;
odliczanie=0;

co_moze_miec={
'kot':[kot_pomyslany,kot_do_wziecia,sprite_2078],
'pierścień': [pierscien_pomyslany,pierscien_do_wziecia,sprite_1196], 
'but':[but_pomyslany,but_do_wziecia,sprite_1216],
'filizanka':[filizanka_pomyslana,filizanka_do_wziecia,sprite_2214],
'kwiat':[kwiatek_pomyslany,kwiatek_do_wziecia,kwiatek],
'burg':[burger_pomyslany,burger_do_wziecia,burger],
'jablko':[jablko_pomyslane,jablko_do_wziecia,sprite_jablko],
'slon':[slon_pomyslany,slon_do_wziecia_dup,sprite_slon_pomyslany]
};
co_wymagane=[];


liczba_spelnionych=0;

/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function loadHighscore() {
    var highscore = getCookie("highscore");
    if (highscore != "") {
        best_punkty=highscore;
    }
}


function saveHighscore() {
	setCookie("highscore", best_punkty, 365);
	
	if (typeof kongregate != 'undefined')
	{
		kongregate.stats.submit("HighScore",best_punkty);
	}
}
function doliczPunkty(ile) { 
punkty+=ile*poziomu_nr;
/*
var pkt_game = document.getElementById('pkt');
// jeśli obiekt pkt istnieje:

if (pkt_game!==null)
{	
	pkt_game.innerHTML = punkty;	
}
*/
}
function dodajZycie(ile) { 
zycia+=ile;


if (zycia>0)
{
	/*
	var zyc_game = document.getElementById('zyc');
	// jeśli obiekt pkt istnieje:

	if (zyc_game!==null)
	{	
		zyc_game.innerHTML = zycia;	
	}
	
	*/
	if (ile<0)
	{
		moze_latac=false;
		room_restart();
	}
}
else
{
	
	room_goto_first();
}
}


tu_gameloop = tu_loop;
tu_loop();
