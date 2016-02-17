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
__sprite_init__(this, sprite_162, 32, 48, 16, 24, 'Box', 16, 0, 32, 0, 48, ['img/sprite_162_4.png','img/sprite_162_5.png','img/sprite_162_6.png','img/sprite_162_7.png','img/sprite_162_8.png','img/sprite_162_9.png','img/sprite_162_10.png','img/sprite_162_11.png']);
}; var sprite_162 = new __sprite_162();

function __sprite_342() { 
__sprite_init__(this, sprite_342, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_342_0.png']);
}; var sprite_342 = new __sprite_342();

function __sprite_384() { 
__sprite_init__(this, sprite_384, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_384_0.png']);
}; var sprite_384 = new __sprite_384();

function __drzwi() { 
__sprite_init__(this, drzwi, 96, 96, 48, 48, 'Box', 48, 0, 96, 0, 96, ['img/drzwi_0.png','img/drzwi_1.png','img/drzwi_2.png','img/drzwi_3.png']);
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

function __chmurkaS() { 
__sprite_init__(this, chmurkaS, 72, 62, 0, 0, 'Box', 36, 0, 72, 0, 62, ['img/chmurkaS_0.png']);
}; var chmurkaS = new __chmurkaS();

function __sprite_1196() { 
__sprite_init__(this, sprite_1196, 26, 24, 0, 0, 'Box', 13, 0, 26, 0, 24, ['img/sprite_1196_0.png']);
}; var sprite_1196 = new __sprite_1196();

function __sprite_1216() { 
__sprite_init__(this, sprite_1216, 29, 33, 0, 0, 'Box', 14, 0, 29, 0, 33, ['img/sprite_1216_0.png']);
}; var sprite_1216 = new __sprite_1216();

function __sprite_1224() { 
__sprite_init__(this, sprite_1224, 64, 23, 0, 0, 'Box', 32, 0, 64, 0, 23, ['img/sprite_1224_0.png']);
}; var sprite_1224 = new __sprite_1224();

function __sprite_1228() { 
__sprite_init__(this, sprite_1228, 80, 80, 0, 0, 'Box', 40, 0, 80, 0, 80, ['img/sprite_1228_0.png','img/sprite_1228_1.png','img/sprite_1228_2.png','img/sprite_1228_3.png','img/sprite_1228_4.png','img/sprite_1228_5.png','img/sprite_1228_6.png','img/sprite_1228_7.png']);
}; var sprite_1228 = new __sprite_1228();

function __sprite_1229() { 
__sprite_init__(this, sprite_1229, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_1229_12.png','img/sprite_1229_13.png','img/sprite_1229_14.png','img/sprite_1229_24.png','img/sprite_1229_25.png','img/sprite_1229_26.png']);
}; var sprite_1229 = new __sprite_1229();

function __sprite_1240() { 
__sprite_init__(this, sprite_1240, 64, 40, 0, 0, 'Box', 37, 0, 75, 0, 70, ['img/sprite_1240_0.png','img/sprite_1240_1.png','img/sprite_1240_2.png','img/sprite_1240_3.png','img/sprite_1240_7.png','img/sprite_1240_9.png','img/sprite_1240_10.png','img/sprite_1240_11.png','img/sprite_1240_12.png']);
}; var sprite_1240 = new __sprite_1240();

function __sprite_1322() { 
__sprite_init__(this, sprite_1322, 8, 8, 0, 0, 'Box', 4, 0, 8, 0, 8, ['img/sprite_1322_0.png']);
}; var sprite_1322 = new __sprite_1322();

function __sprite_1400() { 
__sprite_init__(this, sprite_1400, 59, 52, 0, 0, 'Box', 32, 0, 64, 0, 64, ['img/sprite_1400_0.png','img/sprite_1400_1.png','img/sprite_1400_2.png','img/sprite_1400_3.png','img/sprite_1400_4.png','img/sprite_1400_5.png']);
}; var sprite_1400 = new __sprite_1400();

function __sprite_2025() { 
__sprite_init__(this, sprite_2025, 20, 21, 0, 0, 'Box', 10, 0, 20, 0, 21, ['img/sprite_2025_0.png','img/sprite_2025_1.png','img/sprite_2025_2.png','img/sprite_2025_3.png','img/sprite_2025_4.png']);
}; var sprite_2025 = new __sprite_2025();

function __sprite_2067() { 
__sprite_init__(this, sprite_2067, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_2067_4.png','img/sprite_2067_5.png','img/sprite_2067_6.png','img/sprite_2067_7.png','img/sprite_2067_8.png','img/sprite_2067_9.png','img/sprite_2067_10.png','img/sprite_2067_11.png']);
}; var sprite_2067 = new __sprite_2067();

function __sprite_2078() { 
__sprite_init__(this, sprite_2078, 32, 32, 0, 0, 'Box', 16, 0, 32, 0, 32, ['img/sprite_2078_21.png','img/sprite_2078_22.png','img/sprite_2078_23.png','img/sprite_2078_33.png','img/sprite_2078_34.png','img/sprite_2078_35.png']);
}; var sprite_2078 = new __sprite_2078();

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
__sprite_init__(this, kladka_sprite, 54, 9, 0, 0, 'Box', 27, 0, 54, 0, 9, ['img/kladka_sprite_0.png']);
}; var kladka_sprite = new __kladka_sprite();

function __sprite_2181() { 
__sprite_init__(this, sprite_2181, 80, 64, 0, 0, 'Box', 40, 0, 80, 0, 64, ['img/sprite_2181_4.png','img/sprite_2181_5.png','img/sprite_2181_6.png','img/sprite_2181_7.png','img/sprite_2181_8.png','img/sprite_2181_9.png','img/sprite_2181_10.png','img/sprite_2181_11.png']);
}; var sprite_2181 = new __sprite_2181();

function __sprite_etipoka() { 
__sprite_init__(this, sprite_etipoka, 32, 48, 0, 0, 'Box', 16, 0, 32, 0, 48, ['img/sprite_etipoka_0.png','img/sprite_etipoka_1.png','img/sprite_etipoka_2.png','img/sprite_etipoka_3.png','img/sprite_etipoka_4.png','img/sprite_etipoka_5.png','img/sprite_etipoka_6.png','img/sprite_etipoka_7.png']);
}; var sprite_etipoka = new __sprite_etipoka();

function __sprite_2214() { 
__sprite_init__(this, sprite_2214, 24, 34, 0, 0, 'Box', 12, 0, 24, 0, 34, ['img/sprite_2214_0.png']);
}; var sprite_2214 = new __sprite_2214();

function __grastra_logo() { 
__sprite_init__(this, grastra_logo, 110, 88, 0, 0, 'Box', 55, 0, 110, 0, 88, ['img/grastra_logo_0.png']);
}; var grastra_logo = new __grastra_logo();

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
__sprite_init__(this, burger, 44, 37, 0, 0, 'Box', 22, 0, 44, 0, 37, ['img/burger_0.png']);
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
__sprite_init__(this, sprite_slon_pomyslany, 22, 26, 0, 0, 'Box', 11, 0, 22, 0, 26, ['img/sprite_slon_pomyslany_0.png']);
}; var sprite_slon_pomyslany = new __sprite_slon_pomyslany();

function __sprite_slon() { 
__sprite_init__(this, sprite_slon, 22, 26, 0, 0, 'Box', 11, 0, 22, 0, 26, ['img/sprite_slon_0.png']);
}; var sprite_slon = new __sprite_slon();

function __pistoletSprite() { 
__sprite_init__(this, pistoletSprite, 22, 23, 0, 0, 'Box', 11, 0, 22, 0, 23, ['img/pistoletSprite_0.png']);
}; var pistoletSprite = new __pistoletSprite();

function __pociskPistoletuSprite() { 
__sprite_init__(this, pociskPistoletuSprite, 24, 20, 0, 0, 'Box', 12, 0, 24, 0, 20, ['img/pociskPistoletuSprite_0.png','img/pociskPistoletuSprite_1.png']);
}; var pociskPistoletuSprite = new __pociskPistoletuSprite();

function __pociskRozwalaczaS() { 
__sprite_init__(this, pociskRozwalaczaS, 18, 26, 0, 0, 'Box', 9, 0, 18, 0, 26, ['img/pociskRozwalaczaS_0.png','img/pociskRozwalaczaS_1.png']);
}; var pociskRozwalaczaS = new __pociskRozwalaczaS();

function __pistoletHUD() { 
__sprite_init__(this, pistoletHUD, 62, 57, 0, 0, 'Box', 31, 0, 62, 0, 57, ['img/pistoletHUD_0.png']);
}; var pistoletHUD = new __pistoletHUD();

function __tloHUDA() { 
__sprite_init__(this, tloHUDA, 736, 133, 0, 0, 'Box', 368, 0, 736, 0, 133, ['img/tloHUDA_0.png']);
}; var tloHUDA = new __tloHUDA();

function __granatnikS() { 
__sprite_init__(this, granatnikS, 80, 31, 0, 0, 'Box', 40, 0, 80, 0, 31, ['img/granatnikS_0.png']);
}; var granatnikS = new __granatnikS();

function __rozwalaczS() { 
__sprite_init__(this, rozwalaczS, 57, 22, 0, 0, 'Box', 28, 0, 57, 0, 22, ['img/rozwalaczS_0.png']);
}; var rozwalaczS = new __rozwalaczS();

function __kalaszS() { 
__sprite_init__(this, kalaszS, 61, 23, 0, 0, 'Box', 30, 0, 61, 0, 23, ['img/kalaszS_0.png']);
}; var kalaszS = new __kalaszS();

function __granatS() { 
__sprite_init__(this, granatS, 23, 20, 0, 0, 'Box', 11, 0, 23, 0, 20, ['img/granatS_0.png']);
}; var granatS = new __granatS();

function __plomienS() { 
__sprite_init__(this, plomienS, 33, 63, 0, 0, 'Box', 21, 0, 43, 0, 82, ['img/plomienS_0.png','img/plomienS_3.png','img/plomienS_4.png','img/plomienS_5.png','img/plomienS_6.png','img/plomienS_10.png','img/plomienS_11.png','img/plomienS_12.png','img/plomienS_13.png']);
}; var plomienS = new __plomienS();

function __lawa() { 
__sprite_init__(this, lawa, 130, 125, 0, 0, 'Box', 65, 0, 130, 0, 125, ['img/lawa_0.png','img/lawa_1.png','img/lawa_2.png','img/lawa_3.png','img/lawa_4.png','img/lawa_5.png','img/lawa_6.png']);
}; var lawa = new __lawa();

function __pociskGranatnikaS() { 
__sprite_init__(this, pociskGranatnikaS, 24, 20, 0, 0, 'Box', 12, 0, 24, 0, 20, ['img/pociskGranatnikaS_0.png','img/pociskGranatnikaS_1.png']);
}; var pociskGranatnikaS = new __pociskGranatnikaS();

function __glownyBossS() { 
__sprite_init__(this, glownyBossS, 134, 95, 0, 0, 'Box', 67, 0, 134, 0, 95, ['img/glownyBossS_0.png']);
}; var glownyBossS = new __glownyBossS();

function __greenBossS() { 
__sprite_init__(this, greenBossS, 80, 80, 0, 0, 'Box', 40, 0, 80, 0, 80, ['img/greenBossS_0.png','img/greenBossS_1.png','img/greenBossS_2.png']);
}; var greenBossS = new __greenBossS();

function __redBossS() { 
__sprite_init__(this, redBossS, 80, 80, 0, 0, 'Box', 40, 0, 80, 0, 80, ['img/redBossS_0.png','img/redBossS_1.png','img/redBossS_2.png']);
}; var redBossS = new __redBossS();

function __blueBossS() { 
__sprite_init__(this, blueBossS, 80, 80, 0, 0, 'Box', 40, 0, 80, 0, 80, ['img/blueBossS_0.png','img/blueBossS_1.png','img/blueBossS_2.png']);
}; var blueBossS = new __blueBossS();

function __miniLifeBarS() { 
__sprite_init__(this, miniLifeBarS, 32, 8, 0, 0, 'Box', 16, 0, 32, 0, 8, ['img/miniLifeBarS_0.png']);
}; var miniLifeBarS = new __miniLifeBarS();

function __pentagramS() { 
__sprite_init__(this, pentagramS, 128, 124, 0, 0, 'Box', 64, 0, 128, 0, 124, ['img/pentagramS_0.png']);
}; var pentagramS = new __pentagramS();

function __chmura() { 
__sprite_init__(this, chmura, 525, 313, 0, 0, 'Box', 262, 0, 525, 0, 313, ['img/chmura_0.png']);
}; var chmura = new __chmura();

function __elewatorS() { 
__sprite_init__(this, elewatorS, 53, 9, 0, 0, 'Box', 26, 0, 53, 0, 9, ['img/elewatorS_0.png']);
}; var elewatorS = new __elewatorS();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __snd_jump() { 
__audio_init__(this, snd_jump, 'aud/coin06.wav', '', '');
}; var snd_jump = new __snd_jump();

function __snd_glock() { 
__audio_init__(this, snd_glock, '', 'aud/Glock.mp3', '');
}; var snd_glock = new __snd_glock();

function __snd_ak47() { 
__audio_init__(this, snd_ak47, '', 'aud/Ak47.mp3', '');
}; var snd_ak47 = new __snd_ak47();

function __snd_granat() { 
__audio_init__(this, snd_granat, '', 'aud/Granat.mp3', '');
}; var snd_granat = new __snd_granat();

function __snd_rozwalacz() { 
__audio_init__(this, snd_rozwalacz, '', 'aud/Rozwalacz.mp3', '');
}; var snd_rozwalacz = new __snd_rozwalacz();

function __snd_rzut() { 
__audio_init__(this, snd_rzut, '', 'aud/Rzut.mp3', '');
}; var snd_rzut = new __snd_rzut();

function __snd_bec() { 
__audio_init__(this, snd_bec, '', 'aud/Szklo.mp3', '');
}; var snd_bec = new __snd_bec();

function __snd_ou() { 
__audio_init__(this, snd_ou, '', 'aud/ou.mp3', '');
}; var snd_ou = new __snd_ou();

function __snd_potwor() { 
__audio_init__(this, snd_potwor, '', 'aud/Potwor.mp3', '');
}; var snd_potwor = new __snd_potwor();



/***********************************************************************
 * MUSICS
 ***********************************************************************/
function __Greensleeves() { 
__audio_init__(this, Greensleeves, '', 'aud/GreensleevesToAGround.mp3', '');
}; var Greensleeves = new __Greensleeves();

function __GreenS() { 
__audio_init__(this, GreenS, '', 'aud/greenS.mp3', '');
}; var GreenS = new __GreenS();



/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __VALENTINE_TLO() { 
__background_init__(this, VALENTINE_TLO, 'img/planszaTytulowaVB.png')}; var VALENTINE_TLO = new __VALENTINE_TLO();

function __paniD() { 
__background_init__(this, paniD, 'img/pani_diabel.png')}; var paniD = new __paniD();

function __instrukcja() { 
__background_init__(this, instrukcja, 'img/instrukcja_p.png')}; var instrukcja = new __instrukcja();



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
obiekt_gracza=this;

this.odlicz = 40;

this.air = 0;
this.jump = 0;
this.spada = true;
bity = 0;
this.odrzut=0;

global.poczatkowe_punkty=punkty;
global.game_paused=false; 
global.friendzoned=false;

dnoPiekieł=room_height;
global.poziomLawy = dnoPiekieł;

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

wybieranieBroni();

// wybrana_bron
		this.odlicz--;
		if (this.odlicz<0)
		{		
			this.odlicz=0;
			if ( keyboard_check(vk_space)) {

				if (wybrana_bron!='') {
					if (posiadane_bronie[wybrana_bron]>0) {
						
						this.odlicz=bronie[wybrana_bron][3];
						
						kule=[];
						var spd = bronie[wybrana_bron][5]; 
						var typPocisku = bronie[wybrana_bron][4];
						var liczbaPociskow = bronie[wybrana_bron][6];
						var xdir = lengthdir_x(spd, direction);
						var ydir = lengthdir_y(spd, direction);
						
						if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(bronie[wybrana_bron][7]);
						
						for (var i=0;i<liczbaPociskow;i++) {
							if (posiadane_bronie[wybrana_bron]>0) {
								
								kule[i] = instance_create(x+xdir*i,y+ydir*i,typPocisku);
								kule[i].speed = spd;
								kule[i].direction = direction;
															
								posiadane_bronie[wybrana_bron]--;
							}
						}
						
						if (posiadane_bronie[wybrana_bron]<=0) {
							for (var broń in posiadane_bronie)
								{
										if (posiadane_bronie[broń]>0)
										{
											wybrana_bron=broń;
										}
								}
						}
						
					} else {
					
					}
				}
			}
		}


odliczanie++;
	if (odliczanie>360)
	{
		odliczanie=0;
	}

if (odliczanie % 5 == 0) {
	global.poziomLawy--;
}

szybkosc_utraty_latania=8;
if (odliczanie % szybkosc_utraty_latania == 0) {
	if (moze_latac) {
			procent_latania--;
			if (procent_latania<1) {
				moze_latac=false;
			}
		}
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
		

			if ( keyboard_check(vk_d)  || keyboard_check(vk_a))  {
				this.skrzydelko.x=x; 
				this.skrzydelko.y=y-15+sin(odliczanie/2)*5;
				this.skrzydelko.image_angle=sin(odliczanie*tu_d2r*24)*15;
			}
			else if ( keyboard_check(vk_w) )
			{
				this.skrzydelko.x=x; 
				this.skrzydelko.y=y-15+sin(odliczanie)*5;
				this.skrzydelko.image_angle=sin(odliczanie*tu_d2r*48)*15;
			}
			else if ( keyboard_check(vk_s) )
			{
				this.skrzydelko.x=x; 
				this.skrzydelko.y=y-15;
				this.skrzydelko.image_angle=sin(odliczanie*tu_d2r*3)*15;
			}
			else
			{
				this.skrzydelko.x=x+5-this.kier*10;
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
		
		
		if ( keyboard_check(vk_w) )
		{
			y-=3;
			direction = 90;
		}
		if ( keyboard_check(vk_s) )
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
		if (this.spada==false) {
			image_angle=0;
		} else {
			image_angle=air*12;
		}
		
		if ( (keyboard_check_pressed(vk_w) ) && this.jump == 0 && this.air ==0 && this.spada == false) {
			jump = 1;
			air =  10; // siła skoku
			if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(snd_jump);
			 
		}

		if ( air > -64 ) air -= 0.5;

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
		|| ( place_meeting(x, y, szybkaWinda) != null)
		|| ( place_meeting(x, y, kongbigobj) != null)
		|| ( place_meeting(x, y, konggobj) != null)
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
			
			this.air = 0;
			this.jump = 0;
			this.spada = false;
			
			if ( place_meeting(x, y, kladka) != null)
			{
				y-=2;
				if ( place_meeting(x, y+4, kladka) != null)
				{
					y-=2;
				}
			}
			
			if ( place_meeting(x, y, szybkaWinda) != null)
			{
				y-=5;
				if ( place_meeting(x, y+4, szybkaWinda) != null)
				{
					y-=5;
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
	
	
	if  ((!this.spada) || (moze_latac)) {
	
		if ( keyboard_check(vk_d) )  {
			x += 4;
			if (moze_latac)
				{
					x += 4;
				}
			direction = 0;
			image_index = 4 + floor((x % 32) / 8);
			this.kier=1;
			
			if (
			(place_meeting(x, y, podloze_ziemia) != null) || 
			(place_meeting(x, y, podloze_trawa) != null) ||
			( place_meeting(x, y, kongbigobj) != null) ||
			( place_meeting(x, y, konggobj) != null) )
			{
					x = xprevious;		
			}
				
			if (place_meeting(x, y+8, podloze_skos_lewy) != null)
				{
					y -= 2;
					x += 1;
				}
		}

		if ( keyboard_check(vk_a) ) {
			x -= 4;
			if (moze_latac)
				{
					x -= 4;
				}
			direction = 180;
			image_index = 0+ floor((x % 32 ) / 8);
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
	
	}
	
	

	if ( x < 0 ) x = 0;
	if ( x > room_width -32 ) x = room_width-32;

	
	
	if (y>wyliczDno()-strefaParzeniaLawy)
	{
		if (irandom(10)>8) {
			bity++;
			instance_create(x-15+irandom(30),y-64+irandom(30),dym);
		}
	}

	if (y>wyliczDno())
	{
		dodajZycie(-1);
	}
}
else
{
/*
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

if (bity>=10)
{
	dodajZycie(-1);
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
	
		
	
		if (other.image_index<3) {
			other.image_index++;
		} else {
			serc = instance_create(x-20,y ,serduszko);
			serc.direction=irandom(360);
			serc.speed=4;
		}
	}
	
	if (other.image_index>0) {
		x=(x+other.x)/2;
		y=(y+other.y)/2;
	}
}
else
{
	kolejnyEtap();
}
}
this.other = this.place_meeting(this.x, this.y, wrog1);
if(this.other != null) {
bity++;
image_index=1;
y-=2*irandom(2);

expl = instance_create(x+irandom(20)-10,y +irandom(20)-10 ,explozja);

}
this.other = this.place_meeting(this.x, this.y, wrog2);
if(this.other != null) {
bity++;
image_index=1;
y-=2*irandom(2);

expl = instance_create(x+irandom(20)-10,y +irandom(20)-10 ,explozja);

}
this.other = this.place_meeting(this.x, this.y, kula_wroga);
if(this.other != null) {
bity+=3;
image_index=1;

expl = instance_create(x+irandom(20)-10,y +irandom(20)-10 ,explozja);

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
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var podloze_ziemia = new __podloze_ziemia();

function __podloze_trawa() {
__instance_init__(this, podloze_trawa, null, 1, 0, sprite_384, 1, 2);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
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
__instance_init__(this, bonus, null, 1, 0, sprite_469, 1, 3);
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
else if (image_index==17)
{
	wybuchCzaszki(x,y);
}
else
{
	doliczPunkty(3);
	if (image_index<5)
	{
		bity-=(6-image_index);
	} else {
		bity--;
	}
	if (bity<0) bity=0;
}

animacjaZebrania = instance_create(x,y ,zebranyObiekt);
animacjaZebrania.image_index=image_index;

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
__instance_init__(this, obj_drzwi, null, 1, 0, drzwi, 1, 4);
this.on_creation = function() {
with(this) {
image_speed = 0;
}
};
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
__instance_init__(this, podloze_skos_lewy, null, 1, 0, sprite_560, 1, 6);
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
__instance_init__(this, podloze_skos_prawy, null, 1, 0, sprite_563, 1, 7);
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

function __chmurka_myslenia() {
__instance_init__(this, chmurka_myslenia, null, 1, 0, chmurkaS, 1, 24);
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
__instance_init__(this, pierscien_do_wziecia, null, 1, 0, sprite_1196, 1, 25);
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
__instance_init__(this, pierscien_pomyslany, null, 1, 0, sprite_1196, 0, 26);
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
__instance_init__(this, but_do_wziecia, null, 1, 0, sprite_1216, 1, 27);
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
__instance_init__(this, but_pomyslany, null, 1, 0, sprite_1216, 0, 28);
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
__instance_init__(this, cenzura, null, 1, 0, sprite_1224, 0, 29);
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
__instance_init__(this, wrog1, null, 1, 0, sprite_1228, 1, 30);
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
doliczPunkty(4);
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
				image_index=0+(x/8+y/8) % 4;
			}
			else
			{
				image_index=4+(x/8+y/8) % 4;
			}
		}
		else
		{
			image_index=0;
			y+=4;
		}
		
		
if (y>wyliczDno())
	{
		instance_destroy();
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
this.other = this.place_meeting(this.x, this.y, pociskPistoletu);
if(this.other != null) {
other.instance_destroy();
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
__instance_init__(this, wrog2, null, 1, 0, sprite_1229, 1, 31);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
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
				image_index=0+(x/8+y/8) % 3;
				direction = 180;
			}
			else
			{
				image_index=3+(x/8+y/8) % 3;
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
		
if (y>wyliczDno())
	{
		instance_destroy();
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
this.other = this.place_meeting(this.x, this.y, pociskPistoletu);
if(this.other != null) {
other.instance_destroy();
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
__instance_init__(this, explozja, null, 1, 0, sprite_1240, 1, 32);
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
__instance_init__(this, kula_wroga, null, 1, 0, sprite_1322, 1, 37);
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

function __tasma_lewo() {
__instance_init__(this, tasma_lewo, null, 1, 0, sprite_2025, 1, 106);
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
__instance_init__(this, tasma_prawo, null, 1, 0, sprite_2025, 1, 107);
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
__instance_init__(this, tasma_skraj, null, 1, 0, sprite_2025, 1, 108);
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
__instance_init__(this, tasma_skraj_prawy, null, 1, 0, sprite_2025, 1, 115);
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
__instance_init__(this, egipska_krolewna, null, 1, 0, sprite_2067, 1, 129);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
this.p_przes=0;
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

				przes=Math.sin((xstart+ystart+odliczanie/2)/45*Math.PI)*20;
				x=this.xss+przes;
				mysl.x=x+15;
				mysl.y=y - 55;
				pier.x=mysl.x+15;
				pier.y=mysl.y +5;
				
				if (przes<this.p_przes)
				{	
					image_index=0+(Math.floor(x/4) % 4);
				}
				else if (przes>this.p_przes)
				{
					image_index=4+(Math.floor(x/4) % 4);
				}
				else
				{
					image_index=0;
				}
				this.p_przes = przes;
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
				/*
					image_angle=-90;
					
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=this.xss+przes+35;
					y=this.yss+przes+10;
				*/
				
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
__instance_init__(this, kot_pomyslany, null, 1, 0, sprite_2078, 0, 130);
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
}; var kot_pomyslany = new __kot_pomyslany();

function __kot_do_wziecia() {
__instance_init__(this, kot_do_wziecia, null, 1, 0, sprite_2078, 1, 131);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
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
	image_index =(image_index+1) % 6;
	if (image_index<3)
	{
		x-=2;
	}
	else
	{
		x+=2;
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
__instance_init__(this, serduszko, null, 1, 0, pentagramS, 1, 133);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;

image_xscale=0.3;
image_yscale=0.3;
this.odliczanie=25;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

this.odliczanie--;
image_angle+=3;
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
__instance_init__(this, klocek, null, 1, 0, sprite_2093, 1, 134);
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
if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(snd_bec);
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


if (y>wyliczDno())
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
__instance_init__(this, klocek_ciemny, null, 1, 0, sprite_2094, 1, 135);
this.on_creation = on_creation_i;
this.on_destroy = function() {
with(this) {
for (i=0;i<10;i++)
{
	instance_create(x,y,kawalek);
}
if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(snd_bec);
}
};
this.on_step = function() {
with(this) {
if (y>ystart)
{
	y--;
}

if (y>wyliczDno())
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
__instance_init__(this, kawalek, null, 1, 0, sprite_2106, 1, 140);
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
image_angle++;
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
__instance_init__(this, kladka, null, 1, 0, kladka_sprite, 1, 154);
this.on_creation = function() {
with(this) {
this.opoznienie_klatki=irandom(300);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;


if (this.opoznienie_klatki>0) {
	this.opoznienie_klatki--;
} else {
	y-=2;
	if (ystart>y+200)
	{
		y=ystart;
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
}; var kladka = new __kladka();

function __HUD() {
__instance_init__(this, HUD, null, 1, 0, null, 1, 162);
this.on_creation = function() {
with(this) {
this.odliczanie=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
x=room_viewport_x+50;
y=room_viewport_y+20;

if ( mouse_check_released() )
{

	if  ((mouse_x>370) && (mouse_y<38)  && (mouse_x<400) )
	{
		dzwieki_on_bool=!dzwieki_on_bool;
	}
	
	if ((mouse_x>420) && (mouse_y<38)  && (mouse_x<450) )
	{
		muzyka_on_off();
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
draw_set_color(255,255,0);

draw_sprite_ext(tloHUDA ,0,x-65,y-30,1,1,0,0.5);

draw_sprite(sprite_pause,0,x+520,y-20);

if 	(!global.game_paused) {
	if (this.odliczanie++>360) {
		this.odliczanie=0;
	}
}


var xlawy=128;
var ylawy=125;
poziomPlomieni = wyliczDno()-25;

for (var j=0;j<480;j+=ylawy) {
	for (var i=0;i<room_width;i+=xlawy) {
		draw_sprite(lawa,(floor(this.odliczanie/10)+j/ylawy+0*i/xlawy) % 7,i,j+poziomPlomieni+50);
	}
}

for (var i=0;i<room_width;i+=20) {
	draw_sprite(plomienS,(floor(this.odliczanie/4)+i) % 9,i,poziomPlomieni);
}



if (moze_latac)	{
		draw_sprite_ext(skrzydla_sprite,0,x+270,y-20,0.5,0.5,0,0.75);
		draw_text(x+265 , y , procent_latania+"%");
	}


var nrBroni=0;
var przezr=0.75;
var wlk=0.5;
for (var broń in posiadane_bronie)
{
		if (posiadane_bronie[broń]>0)
		{
			xBroni=x+290+33*nrBroni;
			
			if (nrBroni==2) {
				xTextu=xBroni;
			} else {
				xTextu=xBroni+5;
			}
			
			if (nrBroni==3) {
				xBroni-=12;
			}


			yBroni=y+15+15*nrBroni;
			if (nrBroni>2) {
				yBroni=y+10+30-(nrBroni-2)*15;
			}
			
			przezr=0.75;
			wlk=0.5;
			if (broń==wybrana_bron) {
				przezr=0.85+0.15*(sin(this.odliczanie/10));
				wlk=0.6;
			}
			draw_sprite_ext(bronie[broń][1], 0,xBroni,yBroni,wlk,wlk,0,przezr);
			draw_text(xTextu, yBroni+15 , posiadane_bronie[broń]);
		}
		nrBroni++;
}



if (global.friendzoned)
{
	draw_text(x+200 , y+150 , "FRIENDZONED!");
}

if (global.game_paused)
{
	draw_text(x+300 , y+200 , "PAUSED");
}

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

this.rysuj = function(kat,obrazek,klatka,wartosc) {
	arr=this.wyliczXY(kat);
	ofsetyy=0;
	ofsetxx=-30;
	wspOddalenia=1;
	wspOddaleniaObrazkow=1;
	ofsetYObrazkow=-20;
	ofsetXObrazkow=-15;

	draw_sprite_ext(obrazek,klatka,x+ofsetxx+arr[0]*wspOddaleniaObrazkow+ofsetXObrazkow,y+ofsetyy+arr[1]*wspOddaleniaObrazkow+ofsetYObrazkow, 0.75, 0.75, 0,0.75);
	if (wartosc>0) {
		draw_text(x+ofsetxx+arr[0] *wspOddalenia, y+ofsetyy+arr[1]*wspOddalenia , wartosc);
	}
}

this.wyliczXY = function(degrees) {
	promien=84;
	radians = degrees * (Math.PI/180)
	xx=Math.sin(radians)*promien;
	yy=Math.cos(radians)*promien;
	return [xx,yy];
}

// tworzenie tabeli spriteów
arrayOfSprites = [];
for (var przedmiot in co_ma)
{
		if (co_ma[przedmiot]>0)
		{
			arrayOfSprites.push([co_moze_miec[przedmiot][2],0]);
		}
}




bicieSerca=Math.sin(this.odliczanie * (Math.PI/45));
skalaSerca=2.5+0.25*bicieSerca;
przesuniecieSerca=-bicieSerca*5;
draw_sprite_ext(sprite_469,5, x-60+przesuniecieSerca, y-60+przesuniecieSerca, skalaSerca, skalaSerca, 0,0.75);

this.rysujIloscZycia = function(ile_zyc, ile_ran) {
	draw_text(x-20, y-5, zycia);
	przesx=0;
	if (bity>0) {
	 przesx=5;
	}
	draw_text(x-30+przesx, y+24 , (10-bity)*10+'%');
}

this.rysujIloscZycia(zycia,bity);

draw_text(x+28 , y-12 , punkty);

ile_ma_przedmiotow = arrayOfSprites.length;

if (ile_ma_przedmiotow>0) {
	mnoznik=90/ile_ma_przedmiotow;
	for (i=0;i<ile_ma_przedmiotow;i++) {
		wartosc = 0;
		kat = i*mnoznik;
		obrazek = arrayOfSprites[i][0];
		klatka = arrayOfSprites[i][1];
		this.rysuj(kat,obrazek,klatka,wartosc);
	}
}

}
}
};
}; var HUD = new __HUD();

function __filizanka_do_wziecia() {
__instance_init__(this, filizanka_do_wziecia, null, 1, 0, sprite_2214, 1, 163);
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
__instance_init__(this, filizanka_pomyslana, null, 1, 0, sprite_2214, 1, 164);
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
__instance_init__(this, zlozona_dziewczyna, null, 1, 0, sprite_1400, 1, 166);
this.on_creation = function() {
with(this) {
image_speed=0;
this.xss=xstart;
this.yss=ystart;
this.ident=-1;
this.jestem_juz=1;
this.sledz_gracza=0;
this.p_przes=0;
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
				
				
				if (przes<this.p_przes)
				{	
					image_index=0+(Math.floor(x/4) % 3);
				}
				else if (przes>this.p_przes)
				{
					image_index=3+(Math.floor(x/4) % 3);
				}
				else
				{
					image_index=0;
				}
				this.p_przes = przes;
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
				/*
					image_angle=-90;
					przes=Math.sin((xstart+ystart+odliczanie)/10*Math.PI)*5;
					x=x_gracza+przes*(1+this.ident);
					y=y_gracza+przes*(3-this.ident);
					*/
					przyblizIpomniejsz(this,obiekt_gracza);
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

if (y>wyliczDno()-strefaParzeniaLawy)
	{
		y=-50;
	}
}
};
this.on_end_step = function() {
with(this) {
ile_wymagane=co_wymagane.length;
if (liczba_spelnionych==ile_wymagane)
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
__instance_init__(this, chmurka_myslenia_dup, null, 1, 0, chmurkaS, 1, 167);
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

function __serce_tile() {
__instance_init__(this, serce_tile, null, 1, 0, sprite_469, 1, 170);
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
__instance_init__(this, girl_tile, null, 1, 0, sprite_etipoka, 1, 183);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

image_index=0+(Math.floor(x/4) % 4);
x--;

if (global.gra_w_pelni_zaladowana) {
	if (keyboard_check(vk_space)) {
		letsStartGame();
	}
}

this.odliczanie++;



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
__instance_init__(this, logo_grastry, null, 1, 0, grastra_logo, 1, 185);
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

function __dzwieki_wlaczone() {
__instance_init__(this, dzwieki_wlaczone, null, 1, 0, dzwieki_on_sprite, 1, 186);
this.on_creation = function() {
with(this) {
dzwieki_on_bool=true;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if ( mouse_check_pressed() && position_meeting(mouse_x,mouse_y,this) ){
		muzyka_on_off();
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
if (muzyka_on_bool) {
	draw_sprite(dzwieki_on_sprite,0,x,y);
} else {
	draw_sprite(dzwieki_off_sprite,0,x,y);
}

}
}
};
}; var dzwieki_wlaczone = new __dzwieki_wlaczone();

function __kwiatek_do_wziecia() {
__instance_init__(this, kwiatek_do_wziecia, null, 1, 0, kwiatek, 1, 188);
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
__instance_init__(this, kwiatek_pomyslany, null, 1, 0, kwiatek, 1, 189);
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
__instance_init__(this, burger_do_wziecia, null, 1, 0, burger, 1, 190);
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
__instance_init__(this, burger_pomyslany, null, 1, 0, burger, 1, 191);
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
__instance_init__(this, wrogAniol, null, 1, 0, sprite_2181, 1, 192);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
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
				image_index=0+(x/8+y/8) % 4;
				direction = 180;
			}
			else
			{
				image_index=4+(x/8+y/8) % 4;
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
this.other = this.place_meeting(this.x, this.y, pociskPistoletu);
if(this.other != null) {
other.instance_destroy();
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
__instance_init__(this, niewidzialny_obiekt, null, 1, 0, null, 1, 193);
this.on_creation = function() {
with(this) {
this.wz = 0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if  ( (abs(x_gracza-x)<32) && (abs(y_gracza-y+30)<32) )
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


if  ( (abs(x_gracza-x-200)<32) && (abs(y_gracza-y+30)<32) )
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
__instance_init__(this, skrzydla, null, 1, 0, skrzydla_sprite, 1, 194);
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
procent_latania=100;
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
__instance_init__(this, skrzydlo_obj, null, 1, 0, skrzydlo_ludzika, 1, 527);
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
__instance_init__(this, konggobj, null, 1, 0, kongg, 1, 598);
this.on_creation = function() {
with(this) {
this.ruchPoziomy=false;
this.ruchPionowy=false;
this.opoznienie=0;
this.opoznieniePoziome=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, Walenty);
if(this.other != null) {
ruch=true;


}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var konggobj = new __konggobj();

function __kongbigobj() {
__instance_init__(this, kongbigobj, null, 1, 0, konggbig, 1, 599);
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
__instance_init__(this, jablko_pomyslane, null, 1, 0, sprite_jablko, 1, 610);
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
__instance_init__(this, jablko_do_wziecia, null, 1, 0, sprite_jablko, 1, 611);
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
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var jablko_do_wziecia = new __jablko_do_wziecia();

function __slon_pomyslany() {
__instance_init__(this, slon_pomyslany, null, 1, 0, sprite_slon_pomyslany, 1, 612);
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
__instance_init__(this, slon_do_wziecia_dup, null, 1, 0, sprite_slon, 1, 613);
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

function __pistolet() {
__instance_init__(this, pistolet, null, 1, 0, pistoletSprite, 1, 708);
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
dodajBron('pistolet');
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pistolet = new __pistolet();

function __pociskPistoletu() {
__instance_init__(this, pociskPistoletu, null, 1, 0, pociskPistoletuSprite, 1, 709);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < 0 || x > room_width) instance_destroy();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, klocek);
if(this.other != null) {
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, klocek_ciemny);
if(this.other != null) {
other.instance_destroy();
instance_destroy(); 
}
this.other = this.place_meeting(this.x, this.y, wrog1);
if(this.other != null) {
other.instance_destroy();
instance_destroy(); 
}
this.other = this.place_meeting(this.x, this.y, wrog2);
if(this.other != null) {
other.instance_destroy();
instance_destroy(); 
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pociskPistoletu = new __pociskPistoletu();

function __zebranyObiekt() {
__instance_init__(this, zebranyObiekt, null, 1, 0, sprite_469, 1, 721);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=5;

image_xscale=0.5;
image_yscale=0.5;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x>0) 
{
 x-=20
}

if (y>0) 
{
 y-=10;
}

if  ((x<=0) && (y<=0)) {
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
}; var zebranyObiekt = new __zebranyObiekt();

function __granatnik() {
__instance_init__(this, granatnik, null, 1, 0, granatnikS, 1, 831);
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
dodajBron('granatnik');
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var granatnik = new __granatnik();

function __rozwalacz() {
__instance_init__(this, rozwalacz, null, 1, 0, rozwalaczS, 1, 832);
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
dodajBron('rozwalacz');
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var rozwalacz = new __rozwalacz();

function __kalasz() {
__instance_init__(this, kalasz, null, 1, 0, kalaszS, 1, 833);
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
dodajBron('kalasz');
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var kalasz = new __kalasz();

function __granat() {
__instance_init__(this, granat, null, 1, 0, granatS, 1, 837);
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
dodajBron('granat');
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var granat = new __granat();

function __granatRzucony() {
__instance_init__(this, granatRzucony, null, 1, 0, granatS, 1, 838);
this.on_creation = function() {
with(this) {
this.rzut=-10;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < 0 || x > room_width || y > room_height || y<-20) instance_destroy();
y+=this.rzut;
this.rzut++;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, klocek);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, klocek_ciemny);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy(); 
}
this.other = this.place_meeting(this.x, this.y, podloze_ziemia);
if(this.other != null) {
wybuchGranatu(x,y);
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, podloze_trawa);
if(this.other != null) {
wybuchGranatu(x,y);
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrog1);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrog2);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrogAniol);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var granatRzucony = new __granatRzucony();

function __odlamek() {
__instance_init__(this, odlamek, null, 1, 0, sprite_2106, 1, 839);
this.on_creation = function() {
with(this) {
this.rzut=-10;
speed = irandom(4) + 4;
direction = irandom(360);
image_angle = direction;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < 0 || x > room_width || y > room_height || y<-20) instance_destroy();
y+=this.rzut;
this.rzut++;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, klocek);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, klocek_ciemny);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy(); 
}
this.other = this.place_meeting(this.x, this.y, podloze_ziemia);
if(this.other != null) {
wybuchGranatu(x,y);
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, podloze_trawa);
if(this.other != null) {
wybuchGranatu(x,y);
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrog1);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrog2);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrogAniol);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var odlamek = new __odlamek();

function __pociskGranatnika() {
__instance_init__(this, pociskGranatnika, null, 1, 0, pociskGranatnikaS, 1, 840);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < 0 || x > room_width || y > room_height || y<-20) instance_destroy();
//image_angle+=17;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, klocek);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, klocek_ciemny);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy(); 
}
this.other = this.place_meeting(this.x, this.y, podloze_ziemia);
if(this.other != null) {
wybuchGranatu(x,y);
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, podloze_trawa);
if(this.other != null) {
wybuchGranatu(x,y);
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrog1);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrog2);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
this.other = this.place_meeting(this.x, this.y, wrogAniol);
if(this.other != null) {
wybuchGranatu(x,y);
other.instance_destroy();
instance_destroy();
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pociskGranatnika = new __pociskGranatnika();

function __blueBoss() {
__instance_init__(this, blueBoss, null, 1, 0, blueBossS, 1, 841);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
this.kier=3;
this.odlicz=100;
this.odliczStworzenie=global.czestotliwoscTworzenia;
this.zycie=100;
}
};
this.on_destroy = function() {
with(this) {
zabiciePotwora(this,16);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if  (( place_meeting(x, y+24, podloze_ziemia) != null)
		|| ( place_meeting(x, y+24, podloze_trawa) != null)
		|| ( place_meeting(x, y+24, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+24, podloze_skos_prawy) != null)
		)
		{
			if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				)
				{
					this.kier=-this.kier;
				}
				
			x+=this.kier;
		}
		else
		{
			y+=4;
		}
		
		
		tworzenieWroga(this,wrog2);
		
		this.odlicz--;
		if (this.odlicz<0)
		{
			if (abs(x-x_gracza)<220)
			{
				kule=[];
				
				for (var i=0;i<3;i++) {
					kule[i] = instance_create(x,y +15,kula_wroga);
					
					if (x>x_gracza) {
						kule[i].direction= 180  -15+15*i;
					} else {
						kule[i].direction = -15+15*i;
					}
					
					
					
					kule[i].speed = 15;
				}
				
				
				
				this.odlicz=40;				
			}
		}
		
if (y>wyliczDno())
	{
		instance_destroy();
	}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {
ranaPotworowi(this,other,1);


}
this.other = this.place_meeting(this.x, this.y, pociskPistoletu);
if(this.other != null) {
ranaPotworowi(this,other,2);
}
this.other = this.place_meeting(this.x, this.y, granatRzucony);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, odlamek);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, pociskGranatnika);
if(this.other != null) {
ranaPotworowi(this,other,10);
}
this.other = this.place_meeting(this.x, this.y, pociskRozwalacza);
if(this.other != null) {
ranaPotworowi(this,other,50);
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if (this.zycie<=0) {
instance_destroy();
} else {
	
	animacjaBosa(this,blueBossS);
	
}
}
}
};
}; var blueBoss = new __blueBoss();

function __dym() {
__instance_init__(this, dym, null, 1, 0, chmurkaS, 1, 914);
this.on_creation = function() {
with(this) {
this.czas=50;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.czas--;
y-=2;

if (this.czas<0) {
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
}; var dym = new __dym();

function __pociskRozwalacza() {
__instance_init__(this, pociskRozwalacza, null, 1, 0, pociskRozwalaczaS, 1, 915);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (x < 0 || x > room_width || y > room_height || y<-20) instance_destroy();
image_angle+=17;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, klocek);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, klocek_ciemny);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, podloze_ziemia);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, podloze_trawa);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, wrog1);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, wrog2);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, wrogAniol);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, kladka);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, podloze_skos_lewy);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, podloze_skos_prawy);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, tasma_lewo);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, tasma_prawo);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, tasma_skraj);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
this.other = this.place_meeting(this.x, this.y, tasma_skraj_prawy);
if(this.other != null) {
wybuchRozwalacza(x,y);
other.instance_destroy();
instance_destroy();

}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pociskRozwalacza = new __pociskRozwalacza();

function __redBoss() {
__instance_init__(this, redBoss, null, 1, 0, redBossS, 1, 916);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
this.kier=-1.5;
this.odlicz=100;
this.odliczStworzenie=global.czestotliwoscTworzenia;
this.zycie=100;
}
};
this.on_destroy = function() {
with(this) {
zabiciePotwora(this,16);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if  (( place_meeting(x, y+24, podloze_ziemia) != null)
		|| ( place_meeting(x, y+24, podloze_trawa) != null)
		|| ( place_meeting(x, y+24, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+24, podloze_skos_prawy) != null)
		)
		{
			if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				)
				{
					this.kier=-this.kier;
				}
				
			x+=this.kier;
		}
		else
		{
			y+=2;
		}
		
		
		tworzenieWroga(this,wrogAniol);
		
		this.odlicz--;
		if (this.odlicz<0)
		{
			if (abs(x-x_gracza)<220)
			{
				kule=[];
				
				for (var i=0;i<3;i++) {
					kule[i] = instance_create(x,y +15,kula_wroga);
					
					if (x>x_gracza) {
						kule[i].direction= 180  -15+15*i;
					} else {
						kule[i].direction = -15+15*i;
					}
					
					
					
					kule[i].speed = 15;
				}
				
				
				
				this.odlicz=40;				
			}
		}
		
if (y>wyliczDno())
	{
		instance_destroy();
	}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {
ranaPotworowi(this,other,1);


}
this.other = this.place_meeting(this.x, this.y, pociskPistoletu);
if(this.other != null) {
ranaPotworowi(this,other,2);
}
this.other = this.place_meeting(this.x, this.y, granatRzucony);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, odlamek);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, pociskGranatnika);
if(this.other != null) {
ranaPotworowi(this,other,10);
}
this.other = this.place_meeting(this.x, this.y, pociskRozwalacza);
if(this.other != null) {
ranaPotworowi(this,other,50);
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if (this.zycie<=0) {
instance_destroy();
} else {
	
	animacjaBosa(this,redBossS);
	
}
}
}
};
}; var redBoss = new __redBoss();

function __greenBoss() {
__instance_init__(this, greenBoss, null, 1, 0, greenBossS, 1, 917);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
this.kier=-1.5;
this.odlicz=100;
this.odliczStworzenie=global.czestotliwoscTworzenia;
this.zycie=100;
}
};
this.on_destroy = function() {
with(this) {
zabiciePotwora(this,16);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

var jakDalekoSprawdzac=16;

if  (( place_meeting(x, y+jakDalekoSprawdzac, podloze_ziemia) != null)
		|| ( place_meeting(x, y+jakDalekoSprawdzac, podloze_trawa) != null)
		|| ( place_meeting(x, y+jakDalekoSprawdzac, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+jakDalekoSprawdzac, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+jakDalekoSprawdzac, klocek) != null)
		|| ( place_meeting(x, y+jakDalekoSprawdzac, klocek_ciemny) != null)
		)
		{
			if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				)
				{
					this.kier=-this.kier;
				}
				
			x+=this.kier;
		}
		else
		{
			y+=4;
		}
		
		
		tworzenieWroga(this,wrog1);
		
		this.odlicz--;
		if (this.odlicz<0)
		{
			if (abs(x-x_gracza)<220)
			{
				kule=[];
				
				for (var i=0;i<3;i++) {
					kule[i] = instance_create(x,y +15,kula_wroga);
					
					if (x>x_gracza) {
						kule[i].direction= 180  -15+15*i;
					} else {
						kule[i].direction = -15+15*i;
					}
					
					
					
					kule[i].speed = 15;
				}
				
				
				
				this.odlicz=40;				
			}
		}
		
if (y>wyliczDno())
	{
		instance_destroy();
	}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {
ranaPotworowi(this,other,1);


}
this.other = this.place_meeting(this.x, this.y, pociskPistoletu);
if(this.other != null) {
ranaPotworowi(this,other,2);
}
this.other = this.place_meeting(this.x, this.y, granatRzucony);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, odlamek);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, pociskGranatnika);
if(this.other != null) {
ranaPotworowi(this,other,10);
}
this.other = this.place_meeting(this.x, this.y, pociskRozwalacza);
if(this.other != null) {
ranaPotworowi(this,other,50);
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if (this.zycie<=0) {
instance_destroy();
} else {
	
	animacjaBosa(this,greenBossS);
	
}
}
}
};
}; var greenBoss = new __greenBoss();

function __bigBoss() {
__instance_init__(this, bigBoss, null, 1, 0, glownyBossS, 1, 918);
this.on_creation = function() {
with(this) {
image_speed=0;
image_index=0;
this.kier=-1.5;
this.odlicz=100;
this.odliczStworzenie=global.czestotliwoscTworzenia;
this.zycie=200;
}
};
this.on_destroy = function() {
with(this) {
zabiciePotwora(this,16);
}
};
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;

if  (( place_meeting(x, y+24, podloze_ziemia) != null)
		|| ( place_meeting(x, y+24, podloze_trawa) != null)
		|| ( place_meeting(x, y+24, podloze_skos_lewy) != null)
		|| ( place_meeting(x, y+24, podloze_skos_prawy) != null)
		|| ( place_meeting(x, y+24, klocek) != null)
		|| ( place_meeting(x, y+24, klocek_ciemny) != null)
		)
		{
			if  (( place_meeting(x+2*this.kier, y, podloze_ziemia) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_trawa) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_lewy) != null)
				|| ( place_meeting(x+2*this.kier, y, podloze_skos_prawy) != null)
				)
				{
					this.kier=-this.kier;
				}
				
			x+=this.kier;
		}
		else
		{
		  if (this.odlicz<40) {
		   y+=4;
		  } else {
			y-=2;
		  }
			
		}
		
		ir=irandom(3);
		var bosDoUtworzenia=redBoss;
		switch (ir) {
			case 1:
				bosDoUtworzenia=redBoss;
			break;
			
			case 2:
				bosDoUtworzenia=greenBoss;
			break;
			
			case 3:
				bosDoUtworzenia=blueBoss;
			break;
		}
		
		tworzenieWroga(this,bosDoUtworzenia);
		
		this.odlicz--;
		if (this.odlicz<0)
		{
			if (abs(x-x_gracza)<220)
			{
				kule=[];
				
				for (var i=0;i<3;i++) {
					kule[i] = instance_create(x,y +15,kula_wroga);
					
					if (x>x_gracza) {
						kule[i].direction= 180  -15+15*i;
					} else {
						kule[i].direction = -15+15*i;
					}
					
					
					
					kule[i].speed = 15;
				}
				
				
				
				this.odlicz=90;				
			}
		}
		
if (y>wyliczDno())
	{
		instance_destroy();
	}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, kawalek);
if(this.other != null) {
ranaPotworowi(this,other,1);


}
this.other = this.place_meeting(this.x, this.y, pociskPistoletu);
if(this.other != null) {
ranaPotworowi(this,other,2);
}
this.other = this.place_meeting(this.x, this.y, granatRzucony);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, odlamek);
if(this.other != null) {
ranaPotworowi(this,other,5);
}
this.other = this.place_meeting(this.x, this.y, pociskGranatnika);
if(this.other != null) {
ranaPotworowi(this,other,10);
}
this.other = this.place_meeting(this.x, this.y, pociskRozwalacza);
if(this.other != null) {
ranaPotworowi(this,other,50);
}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if (this.zycie<=0) {
instance_destroy();
} else {
	
	animacjaBosa(this,glownyBossS);
	
}
}
}
};
}; var bigBoss = new __bigBoss();

function __chmurkaKoncowa() {
__instance_init__(this, chmurkaKoncowa, null, 1, 0, chmura, 1, 1550);
this.on_creation = function() {
with(this) {
this.odliczanie=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (keyboard_check(vk_space)) {
		this.odliczanie=10;
	}
	
if (this.odliczanie>0) {
	this.odliczanie--;
	if (this.odliczanie==0) {
		room_goto_first();
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
}; var chmurkaKoncowa = new __chmurkaKoncowa();

function __szybkaWinda() {
__instance_init__(this, szybkaWinda, null, 1, 0, elewatorS, 1, 1614);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if 	(global.game_paused) return;


y-=5;
if (ystart>y+600)
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
}; var szybkaWinda = new __szybkaWinda();



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
__room_start__(this, EkranStartowy, 640, 480, 30, 255, 0, 0, VALENTINE_TLO.image, 0, 0, 0, 640, 480, null, 50, 50);

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
		ustaw_odgrywany_utwor(GreenS);
		
		var start_div = document.createElement('div');
		var divIdName = 'start';
		start_div.setAttribute('id',divIdName);
		start_div.setAttribute('name',divIdName);
		start_div.setAttribute('style','position: absolute; top: 275px; left: 0px; width: 640px; background-color: transparent; font-size: 95px; color: black; text-align: center; text-shadow: 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #00ffff , 0 0 70px #00ffff , 0 0 80px #00ffff , 0 0 100px #00ffff ;');
		start_div.innerHTML = 'Start'+dedykacja;
		
		
		var tytul_div = document.createElement('div');
		var divIdName = 'tytul';
		tytul_div.setAttribute('id',divIdName);
		tytul_div.setAttribute('name',divIdName);
		tytul_div.setAttribute('style','position: absolute; top: 375px; left: 485px; background-color: transparent;');
		tytul_div.innerHTML = 'Grastra 2016<br><br>game code: Jimmy<br>music: Henry VIII<br><small style="font-size: 9px">v 1.0.1.3</small>';
		
		
		var punkty_div = document.createElement('div');
		divIdName = 'punkty';

		punkty_div.setAttribute('id',divIdName);
		punkty_div.setAttribute('name',divIdName);
		punkty_div.setAttribute('style','border: 2px solid; border-radius: 1em; position: absolute; top: 270px; left: 450px; background-color: red; color: white; padding: 1.5em;');

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
		
		start_div.addEventListener("click",letsStartGame,false);
		
		global.gra_w_pelni_zaladowana = true;

	}
}
};
}
var EkranStartowy = new __EkranStartowy();
tu_scenes.push(EkranStartowy);
function __EtapStartowy() { 
this.tiles = [
[1000000,
[paniD,
[512,0,128,128,0,0],
[512,0,128,128,128,0],
[512,0,128,128,256,0],
[512,0,128,128,384,0],
[512,0,128,128,512,0],
[512,0,128,128,640,0],
[512,0,128,128,768,0],
[512,0,128,128,896,0],
[512,0,128,128,1024,0],
[512,0,128,128,1152,0],
[512,0,128,128,1280,0],
[512,0,128,128,1408,0],
[512,0,128,128,1536,0],
[512,128,128,128,0,128],
[512,128,128,128,128,128],
[512,128,128,128,256,128],
[512,128,128,128,384,128],
[512,128,128,128,512,128],
[512,128,128,128,640,128],
[512,128,128,128,768,128],
[512,128,128,128,896,128],
[512,128,128,128,1024,128],
[512,128,128,128,1152,128],
[512,128,128,128,1280,128],
[512,128,128,128,1408,128],
[512,128,128,128,1536,128],
[512,256,128,128,0,256],
[512,256,128,128,128,256],
[512,256,128,128,256,256],
[512,256,128,128,384,256],
[512,256,128,128,512,256],
[512,256,128,128,640,256],
[512,256,128,128,768,256],
[512,256,128,128,896,256],
[512,256,128,128,1024,256],
[512,256,128,128,1152,256],
[512,256,128,128,1280,256],
[512,256,128,128,1408,256],
[512,256,128,128,1536,256]],
[instrukcja,
[0,0,96,96,64,1280],
[288,0,96,96,192,1248],
[384,0,96,96,288,1248],
[0,384,96,96,192,1056],
[96,384,96,96,288,1056],
[288,384,96,96,192,960],
[384,384,96,96,288,960],
[288,96,96,96,480,1248]]]];
this.objects = [
[{o:Walenty, x:80, y:112}],
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
[{o:podloze_skos_prawy, x:592, y:272}],
[{o:podloze_skos_prawy, x:608, y:288}],
[{o:podloze_skos_prawy, x:624, y:304}],
[{o:podloze_skos_prawy, x:640, y:320}],
[{o:podloze_skos_prawy, x:944, y:336}],
[{o:podloze_skos_prawy, x:960, y:352}],
[{o:podloze_skos_prawy, x:976, y:368}],
[{o:podloze_skos_prawy, x:992, y:384}],
[{o:podloze_skos_prawy, x:1008, y:400}],
[{o:podloze_skos_prawy, x:1024, y:416}],
[{o:podloze_skos_prawy, x:1040, y:432}],
[{o:podloze_ziemia, x:1040, y:448}],
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
[{o:podloze_skos_prawy, x:1200, y:368}],
[{o:podloze_skos_prawy, x:1216, y:384}],
[{o:podloze_skos_prawy, x:1232, y:400}],
[{o:podloze_ziemia, x:1120, y:384}],
[{o:podloze_ziemia, x:1104, y:400}],
[{o:podloze_ziemia, x:1088, y:416}],
[{o:podloze_ziemia, x:1072, y:432}],
[{o:podloze_ziemia, x:1056, y:448}],
[{o:podloze_ziemia, x:1200, y:384}],
[{o:podloze_ziemia, x:1216, y:400}],
[{o:podloze_skos_lewy, x:1376, y:400}],
[{o:podloze_skos_lewy, x:1392, y:384}],
[{o:podloze_skos_lewy, x:1408, y:368}],
[{o:podloze_skos_prawy, x:1584, y:368}],
[{o:podloze_skos_prawy, x:1600, y:384}],
[{o:podloze_skos_prawy, x:1616, y:400}],
[{o:podloze_skos_prawy, x:1632, y:416}],
[{o:podloze_skos_prawy, x:1648, y:432}],
[{o:podloze_ziemia, x:1392, y:400}],
[{o:podloze_ziemia, x:1408, y:384}],
[{o:podloze_ziemia, x:1424, y:368}],
[{o:podloze_ziemia, x:1568, y:368}],
[{o:podloze_ziemia, x:1584, y:384}],
[{o:podloze_ziemia, x:1600, y:400}],
[{o:podloze_ziemia, x:1616, y:416}],
[{o:podloze_ziemia, x:1632, y:432}],
[{o:podloze_ziemia, x:1648, y:448}],
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
[{o:podloze_ziemia, x:576, y:272}],
[{o:podloze_ziemia, x:592, y:288}],
[{o:podloze_ziemia, x:608, y:304}],
[{o:podloze_ziemia, x:624, y:320}],
[{o:podloze_ziemia, x:640, y:336}],
[{o:podloze_ziemia, x:464, y:336}],
[{o:tasma_prawo, x:380, y:180}],
[{o:tasma_prawo, x:400, y:180}],
[{o:tasma_prawo, x:420, y:180}],
[{o:tasma_prawo, x:440, y:180}],
[{o:tasma_prawo, x:460, y:180}],
[{o:tasma_skraj, x:360, y:180}],
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
[{o:kladka, x:1552, y:240}],
[{o:kladka, x:1552, y:128}],
[{o:klocek_ciemny, x:1488, y:144}],
[{o:klocek_ciemny, x:1456, y:32}],
[{o:podloze_ziemia, x:1344, y:304}],
[{o:podloze_ziemia, x:784, y:240}],
[{o:podloze_ziemia, x:768, y:240}],
[{o:filizanka_do_wziecia, x:1460, y:0}],
[{o:zlozona_dziewczyna, x:400, y:800}],
[{o:zlozona_dziewczyna, x:540, y:500}],
[{o:zlozona_dziewczyna, x:500, y:620}],
[{o:podloze_trawa, x:0, y:416}],
[{o:podloze_trawa, x:160, y:416}],
[{o:podloze_trawa, x:0, y:384}],
[{o:podloze_trawa, x:0, y:352}],
[{o:pierscien_do_wziecia, x:544, y:192}],
[{o:bonus, x:1024, y:352}],
[{o:jablko_do_wziecia, x:1568, y:224}],
[{o:jablko_do_wziecia, x:1600, y:352}],
[{o:podloze_trawa, x:224, y:288}],
[{o:podloze_trawa, x:352, y:288}],
[{o:klocek_ciemny, x:352, y:64}],
[{o:klocek_ciemny, x:544, y:352}],
[{o:klocek_ciemny, x:1152, y:256}],
[{o:podloze_trawa, x:0, y:1408}],
[{o:podloze_trawa, x:160, y:1408}],
[{o:podloze_trawa, x:0, y:1376}],
[{o:podloze_trawa, x:0, y:1344}],
[{o:podloze_trawa, x:0, y:1312}],
[{o:podloze_trawa, x:0, y:1280}],
[{o:podloze_trawa, x:0, y:1248}],
[{o:podloze_trawa, x:0, y:1216}],
[{o:podloze_trawa, x:0, y:1184}],
[{o:podloze_trawa, x:0, y:1152}],
[{o:podloze_trawa, x:0, y:1120}],
[{o:podloze_trawa, x:0, y:1088}],
[{o:podloze_trawa, x:128, y:1408}],
[{o:podloze_trawa, x:32, y:1408}],
[{o:podloze_trawa, x:64, y:1408}],
[{o:podloze_trawa, x:96, y:1408}],
[{o:podloze_trawa, x:160, y:1248}],
[{o:podloze_trawa, x:160, y:1216}],
[{o:podloze_trawa, x:160, y:1184}],
[{o:podloze_trawa, x:160, y:1152}],
[{o:podloze_trawa, x:160, y:1120}],
[{o:podloze_trawa, x:160, y:1088}],
[{o:podloze_trawa, x:160, y:1056}],
[{o:podloze_trawa, x:160, y:1024}],
[{o:podloze_trawa, x:192, y:1408}],
[{o:podloze_trawa, x:224, y:1408}],
[{o:podloze_trawa, x:352, y:1408}],
[{o:podloze_trawa, x:384, y:1408}],
[{o:podloze_trawa, x:416, y:1408}],
[{o:podloze_trawa, x:576, y:1408}],
[{o:podloze_trawa, x:608, y:1408}],
[{o:podloze_trawa, x:608, y:1376}],
[{o:podloze_trawa, x:640, y:1376}],
[{o:podloze_trawa, x:640, y:1344}],
[{o:podloze_trawa, x:672, y:1344}],
[{o:podloze_trawa, x:672, y:1312}],
[{o:podloze_trawa, x:1152, y:864}],
[{o:podloze_trawa, x:0, y:1056}],
[{o:podloze_trawa, x:0, y:1024}],
[{o:podloze_trawa, x:0, y:992}],
[{o:podloze_trawa, x:0, y:960}],
[{o:podloze_trawa, x:0, y:928}],
[{o:podloze_trawa, x:0, y:896}],
[{o:podloze_trawa, x:160, y:992}],
[{o:podloze_trawa, x:160, y:960}],
[{o:podloze_trawa, x:160, y:928}],
[{o:podloze_trawa, x:160, y:896}],
[{o:podloze_trawa, x:160, y:864}],
[{o:podloze_trawa, x:0, y:864}],
[{o:podloze_trawa, x:0, y:832}],
[{o:podloze_trawa, x:0, y:800}],
[{o:podloze_trawa, x:0, y:768}],
[{o:podloze_trawa, x:0, y:736}],
[{o:podloze_trawa, x:0, y:704}],
[{o:podloze_trawa, x:0, y:672}],
[{o:podloze_trawa, x:0, y:640}],
[{o:podloze_trawa, x:160, y:832}],
[{o:podloze_trawa, x:160, y:800}],
[{o:podloze_trawa, x:160, y:768}],
[{o:podloze_trawa, x:160, y:736}],
[{o:podloze_trawa, x:160, y:704}],
[{o:podloze_trawa, x:160, y:672}],
[{o:podloze_trawa, x:160, y:640}],
[{o:podloze_trawa, x:160, y:608}],
[{o:podloze_trawa, x:160, y:576}],
[{o:podloze_trawa, x:160, y:544}],
[{o:podloze_trawa, x:160, y:480}],
[{o:podloze_trawa, x:160, y:512}],
[{o:podloze_trawa, x:160, y:448}],
[{o:podloze_trawa, x:0, y:448}],
[{o:podloze_trawa, x:0, y:480}],
[{o:podloze_trawa, x:0, y:512}],
[{o:podloze_trawa, x:0, y:544}],
[{o:podloze_trawa, x:0, y:576}],
[{o:podloze_trawa, x:0, y:608}],
[{o:podloze_trawa, x:160, y:384}],
[{o:podloze_trawa, x:160, y:352}],
[{o:podloze_trawa, x:160, y:320}],
[{o:podloze_trawa, x:160, y:288}],
[{o:podloze_trawa, x:192, y:288}],
[{o:podloze_trawa, x:0, y:288}],
[{o:podloze_trawa, x:0, y:320}],
[{o:podloze_ziemia, x:736, y:1264}],
[{o:podloze_ziemia, x:752, y:1264}],
[{o:podloze_ziemia, x:1104, y:912}],
[{o:podloze_ziemia, x:1088, y:912}],
[{o:podloze_ziemia, x:1360, y:688}],
[{o:podloze_ziemia, x:1376, y:688}],
[{o:podloze_ziemia, x:1344, y:512}],
[{o:podloze_ziemia, x:1328, y:512}],
[{o:podloze_ziemia, x:160, y:272}],
[{o:podloze_ziemia, x:16, y:272}],
[{o:podloze_ziemia, x:480, y:1248}],
[{o:podloze_ziemia, x:464, y:1248}],
[{o:podloze_ziemia, x:432, y:1216}],
[{o:podloze_ziemia, x:416, y:1216}],
[{o:podloze_ziemia, x:704, y:1104}],
[{o:podloze_ziemia, x:1360, y:544}],
[{o:podloze_ziemia, x:1376, y:544}],
[{o:skrzydla, x:192, y:192}],
[{o:jablko_do_wziecia, x:272, y:240}],
[{o:slon_do_wziecia_dup, x:352, y:224}],
[{o:filizanka_do_wziecia, x:256, y:176}],
[{o:but_do_wziecia, x:304, y:160}],
[{o:pierscien_do_wziecia, x:256, y:112}],
[{o:bonus, x:224, y:48}],
[{o:burger_do_wziecia, x:208, y:256}],
[{o:kwiatek_do_wziecia, x:192, y:112}],
[{o:kot_do_wziecia, x:320, y:256}],
[{o:podloze_ziemia, x:16, y:112}],
[{o:podloze_ziemia, x:0, y:112}],
[{o:kalasz, x:336, y:128}],
[{o:podloze_ziemia, x:680, y:100}],
[{o:podloze_ziemia, x:700, y:100}],
[{o:podloze_ziemia, x:720, y:100}],
[{o:podloze_ziemia, x:740, y:100}],
[{o:podloze_trawa, x:640, y:240}],
[{o:podloze_trawa, x:608, y:240}],
[{o:podloze_trawa, x:576, y:240}],
[{o:podloze_trawa, x:528, y:592}],
[{o:podloze_trawa, x:496, y:592}],
[{o:podloze_trawa, x:464, y:592}],
[{o:podloze_trawa, x:432, y:592}],
[{o:podloze_trawa, x:672, y:592}],
[{o:podloze_trawa, x:704, y:592}],
[{o:podloze_trawa, x:672, y:624}],
[{o:podloze_trawa, x:736, y:592}],
[{o:podloze_trawa, x:768, y:592}],
[{o:podloze_trawa, x:800, y:592}],
[{o:podloze_trawa, x:832, y:592}],
[{o:podloze_trawa, x:0, y:240}],
[{o:podloze_trawa, x:160, y:240}],
[{o:podloze_trawa, x:1488, y:640}],
[{o:podloze_trawa, x:1520, y:640}],
[{o:klocek, x:64, y:1376}],
[{o:podloze_trawa, x:352, y:896}],
[{o:podloze_trawa, x:384, y:896}],
[{o:podloze_trawa, x:416, y:896}],
[{o:podloze_trawa, x:448, y:896}],
[{o:podloze_trawa, x:480, y:896}],
[{o:podloze_trawa, x:512, y:896}],
[{o:podloze_trawa, x:512, y:864}],
[{o:podloze_trawa, x:288, y:864}],
[{o:podloze_trawa, x:320, y:896}],
[{o:podloze_trawa, x:288, y:896}],
[{o:podloze_ziemia, x:480, y:752}],
[{o:podloze_ziemia, x:496, y:752}],
[{o:podloze_ziemia, x:512, y:752}],
[{o:podloze_ziemia, x:528, y:752}],
[{o:podloze_ziemia, x:544, y:752}],
[{o:podloze_ziemia, x:560, y:752}],
[{o:podloze_ziemia, x:576, y:752}],
[{o:podloze_ziemia, x:592, y:752}],
[{o:podloze_ziemia, x:592, y:736}],
[{o:podloze_ziemia, x:608, y:736}],
[{o:podloze_ziemia, x:464, y:752}],
[{o:podloze_ziemia, x:464, y:736}],
[{o:podloze_ziemia, x:448, y:736}],
[{o:podloze_trawa, x:192, y:448}],
[{o:podloze_trawa, x:192, y:384}],
[{o:podloze_trawa, x:256, y:384}],
[{o:podloze_trawa, x:320, y:384}],
[{o:podloze_trawa, x:384, y:384}],
[{o:podloze_trawa, x:448, y:384}],
[{o:podloze_trawa, x:512, y:384}],
[{o:podloze_trawa, x:576, y:384}],
[{o:podloze_trawa, x:640, y:384}],
[{o:podloze_trawa, x:704, y:384}],
[{o:podloze_trawa, x:768, y:384}],
[{o:podloze_trawa, x:832, y:384}],
[{o:podloze_trawa, x:896, y:384}],
[{o:podloze_trawa, x:960, y:384}],
[{o:podloze_trawa, x:1088, y:384}],
[{o:podloze_trawa, x:1152, y:384}],
[{o:podloze_trawa, x:1216, y:384}],
[{o:podloze_trawa, x:1280, y:384}],
[{o:podloze_trawa, x:1344, y:384}],
[{o:podloze_trawa, x:1408, y:384}],
[{o:podloze_trawa, x:1472, y:384}],
[{o:podloze_trawa, x:1536, y:384}],
[{o:podloze_trawa, x:1600, y:384}],
[{o:podloze_trawa, x:224, y:384}],
[{o:podloze_trawa, x:288, y:384}],
[{o:podloze_trawa, x:352, y:384}],
[{o:podloze_trawa, x:416, y:384}],
[{o:podloze_trawa, x:480, y:384}],
[{o:podloze_trawa, x:544, y:384}],
[{o:podloze_trawa, x:608, y:384}],
[{o:podloze_trawa, x:672, y:384}],
[{o:podloze_trawa, x:736, y:384}],
[{o:podloze_trawa, x:800, y:384}],
[{o:podloze_trawa, x:864, y:384}],
[{o:podloze_trawa, x:928, y:384}],
[{o:podloze_trawa, x:992, y:384}],
[{o:podloze_trawa, x:1024, y:384}],
[{o:podloze_trawa, x:1056, y:384}],
[{o:podloze_trawa, x:1120, y:384}],
[{o:podloze_trawa, x:1184, y:384}],
[{o:podloze_trawa, x:1248, y:384}],
[{o:podloze_trawa, x:1312, y:384}],
[{o:podloze_trawa, x:1376, y:384}],
[{o:podloze_trawa, x:1440, y:384}],
[{o:podloze_trawa, x:1504, y:384}],
[{o:podloze_trawa, x:1568, y:384}],
[{o:podloze_trawa, x:1632, y:384}],
[{o:bonus, x:928, y:1312}],
[{o:bonus, x:1024, y:1280}],
[{o:bonus, x:1088, y:1280}],
[{o:bonus, x:1152, y:1280}],
[{o:bonus, x:1024, y:1216}],
[{o:bonus, x:1088, y:1216}],
[{o:bonus, x:1152, y:1216}],
[{o:bonus, x:1152, y:1024}],
[{o:bonus, x:1216, y:1024}],
[{o:bonus, x:1216, y:960}],
[{o:bonus, x:1152, y:960}],
[{o:bonus, x:1344, y:832}],
[{o:bonus, x:1408, y:832}],
[{o:bonus, x:1408, y:896}],
[{o:bonus, x:1344, y:896}],
[{o:bonus, x:1600, y:832}],
[{o:bonus, x:1600, y:896}],
[{o:bonus, x:1344, y:1216}],
[{o:bonus, x:1408, y:1216}],
[{o:bonus, x:1408, y:1280}],
[{o:bonus, x:1344, y:1280}],
[{o:klocek, x:1472, y:1088}],
[{o:klocek, x:1536, y:1152}],
[{o:klocek, x:1600, y:1216}],
[{o:kladka, x:1536, y:1024}],
[{o:filizanka_do_wziecia, x:1536, y:832}],
[{o:podloze_ziemia, x:1472, y:960}],
[{o:podloze_ziemia, x:1408, y:896}],
[{o:podloze_ziemia, x:1344, y:832}],
[{o:kladka, x:1216, y:832}],
[{o:kladka, x:1408, y:768}],
[{o:pistolet, x:256, y:1152}],
[{o:bonus, x:320, y:1280}],
[{o:bonus, x:384, y:1088}],
[{o:bonus, x:320, y:1088}],
[{o:bonus, x:512, y:960}],
[{o:bonus, x:576, y:960}],
[{o:tasma_lewo, x:1088, y:704}],
[{o:tasma_lewo, x:1104, y:704}],
[{o:tasma_lewo, x:1120, y:704}],
[{o:tasma_skraj_prawy, x:1136, y:704}],
[{o:tasma_skraj, x:1072, y:704}],
[{o:kladka, x:992, y:720}],
[{o:kladka, x:896, y:768}],
[{o:kladka, x:768, y:896}],
[{o:podloze_ziemia, x:1264, y:480}],
[{o:podloze_ziemia, x:1280, y:480}],
[{o:podloze_ziemia, x:1248, y:480}],
[{o:podloze_ziemia, x:1296, y:480}],
[{o:podloze_ziemia, x:560, y:592}],
[{o:podloze_ziemia, x:576, y:592}],
[{o:but_do_wziecia, x:672, y:400}],
[{o:but_do_wziecia, x:352, y:432}],
[{o:wrog1, x:940, y:800}],
[{o:kladka, x:560, y:1280}],
[{o:klocek, x:1120, y:864}],
[{o:klocek, x:1184, y:800}],
[{o:klocek, x:1296, y:720}],
[{o:klocek, x:1328, y:688}],
[{o:tasma_prawo, x:460, y:1380}],
[{o:tasma_prawo, x:480, y:1380}],
[{o:tasma_prawo, x:500, y:1380}],
[{o:tasma_prawo, x:520, y:1380}],
[{o:tasma_prawo, x:540, y:1380}],
[{o:tasma_prawo, x:560, y:1380}],
[{o:tasma_skraj, x:440, y:1380}],
[{o:tasma_skraj_prawy, x:580, y:1380}],
[{o:podloze_skos_lewy, x:752, y:1232}],
[{o:podloze_skos_lewy, x:784, y:1200}],
[{o:podloze_skos_lewy, x:816, y:1168}],
[{o:podloze_skos_lewy, x:848, y:1136}],
[{o:podloze_skos_lewy, x:864, y:1120}],
[{o:podloze_skos_lewy, x:880, y:1104}],
[{o:podloze_skos_lewy, x:896, y:1088}],
[{o:podloze_skos_lewy, x:912, y:1072}],
[{o:podloze_skos_lewy, x:928, y:1056}],
[{o:podloze_skos_lewy, x:944, y:1040}],
[{o:podloze_skos_lewy, x:976, y:1008}],
[{o:podloze_skos_lewy, x:1008, y:976}],
[{o:podloze_skos_lewy, x:1040, y:944}],
[{o:podloze_skos_lewy, x:1056, y:928}],
[{o:podloze_skos_lewy, x:1072, y:912}],
[{o:podloze_skos_lewy, x:1088, y:896}],
[{o:podloze_skos_lewy, x:1104, y:880}],
[{o:podloze_skos_lewy, x:1152, y:848}],
[{o:podloze_skos_lewy, x:1168, y:832}],
[{o:filizanka_do_wziecia, x:1024, y:768}],
[{o:filizanka_do_wziecia, x:864, y:896}],
[{o:szybkaWinda, x:208, y:1200}],
[{o:podloze_skos_lewy, x:768, y:1216}],
[{o:podloze_skos_lewy, x:800, y:1184}],
[{o:podloze_skos_lewy, x:832, y:1152}],
[{o:podloze_skos_lewy, x:960, y:1024}],
[{o:podloze_skos_lewy, x:992, y:992}],
[{o:podloze_skos_lewy, x:1024, y:960}],
[{o:podloze_ziemia, x:320, y:688}],
[{o:podloze_ziemia, x:304, y:688}],
[{o:podloze_ziemia, x:336, y:688}],
[{o:podloze_ziemia, x:352, y:608}],
[{o:podloze_ziemia, x:368, y:608}],
[{o:podloze_ziemia, x:384, y:608}],
[{o:podloze_ziemia, x:624, y:1360}],
[{o:podloze_ziemia, x:656, y:1328}],
[{o:podloze_ziemia, x:688, y:1296}],
[{o:podloze_ziemia, x:704, y:1280}],
[{o:podloze_ziemia, x:720, y:1264}],
[{o:podloze_ziemia, x:736, y:1248}],
[{o:podloze_ziemia, x:752, y:1232}],
[{o:podloze_ziemia, x:768, y:1216}],
[{o:podloze_ziemia, x:784, y:1200}],
[{o:podloze_ziemia, x:800, y:1184}],
[{o:podloze_ziemia, x:816, y:1168}],
[{o:podloze_ziemia, x:832, y:1152}],
[{o:podloze_ziemia, x:848, y:1136}],
[{o:podloze_ziemia, x:864, y:1120}],
[{o:podloze_ziemia, x:880, y:1104}],
[{o:podloze_ziemia, x:896, y:1088}],
[{o:podloze_ziemia, x:912, y:1072}],
[{o:podloze_ziemia, x:928, y:1056}],
[{o:podloze_ziemia, x:944, y:1040}],
[{o:podloze_ziemia, x:960, y:1024}],
[{o:podloze_ziemia, x:976, y:1008}],
[{o:podloze_ziemia, x:992, y:992}],
[{o:podloze_ziemia, x:1008, y:976}],
[{o:podloze_ziemia, x:1024, y:960}],
[{o:podloze_ziemia, x:1040, y:944}],
[{o:podloze_ziemia, x:1056, y:928}],
[{o:podloze_ziemia, x:1072, y:912}],
[{o:podloze_ziemia, x:1088, y:896}],
[{o:podloze_ziemia, x:1104, y:880}],
[{o:podloze_ziemia, x:1152, y:848}],
[{o:podloze_ziemia, x:1168, y:832}],
[{o:podloze_ziemia, x:224, y:1232}],
[{o:podloze_ziemia, x:240, y:1232}],
[{o:podloze_ziemia, x:256, y:1232}],
[{o:podloze_ziemia, x:272, y:1232}],
[{o:podloze_ziemia, x:288, y:1232}],
[{o:podloze_ziemia, x:304, y:1232}],
[{o:podloze_ziemia, x:320, y:1232}],
[{o:podloze_ziemia, x:336, y:1232}],
[{o:podloze_ziemia, x:1120, y:1104}],
[{o:podloze_ziemia, x:1136, y:1104}],
[{o:podloze_ziemia, x:1152, y:1104}],
[{o:podloze_ziemia, x:1216, y:1088}],
[{o:podloze_ziemia, x:1232, y:1088}],
[{o:podloze_ziemia, x:1248, y:1088}],
[{o:podloze_ziemia, x:1264, y:1040}],
[{o:podloze_ziemia, x:1280, y:1040}],
[{o:podloze_ziemia, x:1296, y:1040}],
[{o:podloze_ziemia, x:1312, y:992}],
[{o:podloze_ziemia, x:1328, y:992}],
[{o:podloze_ziemia, x:1344, y:992}],
[{o:podloze_ziemia, x:1360, y:944}],
[{o:podloze_ziemia, x:1376, y:944}],
[{o:podloze_ziemia, x:1392, y:944}],
[{o:podloze_ziemia, x:1424, y:896}],
[{o:podloze_ziemia, x:1440, y:896}],
[{o:podloze_ziemia, x:1024, y:1328}],
[{o:podloze_ziemia, x:1040, y:1328}],
[{o:podloze_ziemia, x:1056, y:1328}],
[{o:podloze_ziemia, x:1072, y:1328}],
[{o:podloze_ziemia, x:1088, y:1328}],
[{o:podloze_ziemia, x:1104, y:1328}],
[{o:podloze_ziemia, x:1120, y:1328}],
[{o:podloze_ziemia, x:1136, y:1328}],
[{o:podloze_ziemia, x:1152, y:1328}],
[{o:podloze_ziemia, x:1168, y:1328}],
[{o:podloze_ziemia, x:976, y:1280}],
[{o:podloze_ziemia, x:960, y:1280}],
[{o:podloze_ziemia, x:944, y:1280}],
[{o:podloze_ziemia, x:1024, y:1216}],
[{o:podloze_ziemia, x:1040, y:1216}],
[{o:podloze_ziemia, x:1056, y:1216}],
[{o:podloze_ziemia, x:1072, y:1168}],
[{o:podloze_ziemia, x:1088, y:1168}],
[{o:but_do_wziecia, x:1584, y:528}],
[{o:podloze_ziemia, x:1584, y:576}],
[{o:podloze_ziemia, x:1600, y:576}],
[{o:podloze_ziemia, x:288, y:544}],
[{o:podloze_ziemia, x:272, y:544}]];
this.start = function() {
__room_start__(this, EtapStartowy, 1660, 1480, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);



co_wymagane=['filizanka','kot','but'];



};
}
var EtapStartowy = new __EtapStartowy();
tu_scenes.push(EtapStartowy);
function __etap_Bonusowy() { 
this.tiles = [
];
this.objects = [
[{o:Walenty, x:128, y:320}],
[{o:podloze_trawa, x:64, y:352}],
[{o:podloze_trawa, x:96, y:352}],
[{o:podloze_trawa, x:128, y:352}],
[{o:podloze_trawa, x:160, y:352}],
[{o:bonus, x:64, y:224}],
[{o:bonus, x:128, y:224}],
[{o:bonus, x:64, y:192}],
[{o:bonus, x:128, y:192}],
[{o:bonus, x:64, y:160}],
[{o:bonus, x:128, y:160}],
[{o:bonus, x:64, y:128}],
[{o:bonus, x:128, y:128}],
[{o:bonus, x:64, y:96}],
[{o:bonus, x:128, y:96}],
[{o:bonus, x:64, y:64}],
[{o:bonus, x:128, y:64}],
[{o:bonus, x:256, y:320}],
[{o:bonus, x:320, y:320}],
[{o:bonus, x:384, y:320}],
[{o:bonus, x:448, y:320}],
[{o:bonus, x:512, y:320}],
[{o:bonus, x:576, y:320}],
[{o:tasma_skraj, x:256, y:384}],
[{o:tasma_skraj_prawy, x:592, y:384}],
[{o:tasma_prawo, x:272, y:384}],
[{o:tasma_prawo, x:288, y:384}],
[{o:tasma_prawo, x:304, y:384}],
[{o:tasma_prawo, x:320, y:384}],
[{o:tasma_prawo, x:336, y:384}],
[{o:tasma_prawo, x:352, y:384}],
[{o:tasma_prawo, x:368, y:384}],
[{o:tasma_prawo, x:384, y:384}],
[{o:tasma_prawo, x:400, y:384}],
[{o:tasma_prawo, x:416, y:384}],
[{o:tasma_prawo, x:432, y:384}],
[{o:tasma_prawo, x:448, y:384}],
[{o:tasma_prawo, x:464, y:384}],
[{o:tasma_prawo, x:480, y:384}],
[{o:tasma_prawo, x:496, y:384}],
[{o:tasma_prawo, x:512, y:384}],
[{o:tasma_prawo, x:528, y:384}],
[{o:tasma_prawo, x:544, y:384}],
[{o:tasma_prawo, x:560, y:384}],
[{o:tasma_prawo, x:576, y:384}],
[{o:klocek, x:544, y:304}],
[{o:klocek, x:496, y:272}],
[{o:klocek, x:432, y:304}],
[{o:klocek, x:544, y:240}],
[{o:podloze_trawa, x:608, y:208}],
[{o:podloze_trawa, x:576, y:208}],
[{o:klocek_ciemny, x:464, y:272}],
[{o:podloze_ziemia, x:32, y:304}],
[{o:podloze_ziemia, x:16, y:256}],
[{o:podloze_ziemia, x:0, y:208}],
[{o:kladka, x:224, y:224}],
[{o:podloze_trawa, x:496, y:128}],
[{o:podloze_trawa, x:464, y:128}],
[{o:podloze_trawa, x:432, y:128}],
[{o:podloze_trawa, x:400, y:128}],
[{o:podloze_trawa, x:368, y:128}],
[{o:podloze_trawa, x:336, y:128}],
[{o:podloze_trawa, x:304, y:128}],
[{o:egipska_krolewna, x:384, y:80}],
[{o:filizanka_do_wziecia, x:592, y:160}],
[{o:bonus, x:480, y:64}],
[{o:bonus, x:304, y:64}],
[{o:bonus, x:304, y:16}],
[{o:bonus, x:480, y:16}],
[{o:bonus, x:576, y:48}],
[{o:bonus, x:576, y:0}],
[{o:bonus, x:128, y:32}],
[{o:bonus, x:64, y:32}],
[{o:kladka, x:160, y:320}]];
this.start = function() {
__room_start__(this, etap_Bonusowy, 640, 490, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, null, 50, 50);

co_wymagane='filizanka';

};
}
var etap_Bonusowy = new __etap_Bonusowy();
tu_scenes.push(etap_Bonusowy);
function __Etap2() { 
this.tiles = [
];
this.objects = [
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
[{o:podloze_ziemia, x:16, y:368}],
[{o:podloze_ziemia, x:48, y:368}],
[{o:podloze_ziemia, x:80, y:368}],
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
[{o:podloze_trawa, x:1952, y:448}],
[{o:klocek_ciemny, x:2064, y:352}],
[{o:klocek, x:2016, y:304}],
[{o:podloze_trawa, x:704, y:448}],
[{o:podloze_trawa, x:768, y:448}],
[{o:podloze_trawa, x:896, y:448}],
[{o:podloze_trawa, x:1024, y:448}],
[{o:podloze_trawa, x:1152, y:448}],
[{o:podloze_trawa, x:1280, y:448}],
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
[{o:podloze_ziemia, x:2752, y:416}],
[{o:podloze_ziemia, x:2736, y:416}],
[{o:podloze_ziemia, x:2736, y:432}],
[{o:podloze_ziemia, x:2720, y:432}],
[{o:podloze_ziemia, x:2720, y:448}],
[{o:podloze_ziemia, x:2096, y:432}],
[{o:podloze_ziemia, x:2096, y:448}],
[{o:podloze_ziemia, x:2096, y:464}],
[{o:podloze_ziemia, x:1392, y:304}],
[{o:podloze_ziemia, x:1376, y:304}],
[{o:podloze_ziemia, x:1376, y:288}],
[{o:podloze_ziemia, x:1392, y:288}],
[{o:podloze_ziemia, x:1360, y:272}],
[{o:podloze_ziemia, x:1328, y:256}],
[{o:podloze_ziemia, x:1312, y:256}],
[{o:podloze_trawa, x:1280, y:272}],
[{o:podloze_ziemia, x:1200, y:256}],
[{o:podloze_ziemia, x:1184, y:256}],
[{o:podloze_ziemia, x:1168, y:256}],
[{o:podloze_ziemia, x:1152, y:256}],
[{o:podloze_ziemia, x:1136, y:256}],
[{o:podloze_ziemia, x:1104, y:256}],
[{o:podloze_ziemia, x:1072, y:272}],
[{o:podloze_ziemia, x:1056, y:272}],
[{o:podloze_ziemia, x:1040, y:272}],
[{o:podloze_ziemia, x:1024, y:272}],
[{o:podloze_ziemia, x:1072, y:272}],
[{o:podloze_ziemia, x:1088, y:272}],
[{o:podloze_ziemia, x:1008, y:272}],
[{o:podloze_ziemia, x:1008, y:256}],
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
[{o:podloze_trawa, x:1312, y:224}],
[{o:podloze_skos_prawy, x:1376, y:272}],
[{o:podloze_ziemia, x:1360, y:240}],
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
[{o:podloze_ziemia, x:1328, y:112}],
[{o:podloze_ziemia, x:1344, y:112}],
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
[{o:podloze_trawa, x:1136, y:144}],
[{o:podloze_ziemia, x:1088, y:240}],
[{o:podloze_ziemia, x:992, y:272}],
[{o:podloze_ziemia, x:976, y:272}],
[{o:podloze_ziemia, x:960, y:272}],
[{o:podloze_ziemia, x:944, y:272}],
[{o:podloze_ziemia, x:928, y:272}],
[{o:podloze_ziemia, x:928, y:256}],
[{o:podloze_ziemia, x:1024, y:176}],
[{o:podloze_ziemia, x:1008, y:176}],
[{o:podloze_ziemia, x:992, y:176}],
[{o:tasma_skraj, x:1568, y:304}],
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
[{o:bonus, x:160, y:0}],
[{o:bonus, x:208, y:0}],
[{o:pierscien_do_wziecia, x:2800, y:416}],
[{o:klocek, x:1136, y:176}],
[{o:klocek, x:1072, y:176}],
[{o:klocek, x:944, y:64}],
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
[{o:podloze_skos_lewy, x:2720, y:416}],
[{o:podloze_skos_lewy, x:2704, y:432}],
[{o:podloze_skos_lewy, x:2192, y:464}],
[{o:podloze_skos_lewy, x:2208, y:448}],
[{o:podloze_skos_lewy, x:2224, y:432}],
[{o:podloze_skos_prawy, x:2256, y:432}],
[{o:podloze_skos_prawy, x:2272, y:448}],
[{o:podloze_skos_prawy, x:2288, y:464}],
[{o:podloze_skos_prawy, x:528, y:416}],
[{o:podloze_skos_prawy, x:576, y:448}],
[{o:podloze_skos_prawy, x:640, y:464}],
[{o:klocek, x:64, y:288}],
[{o:klocek_ciemny, x:0, y:208}],
[{o:klocek, x:992, y:16}],
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
[{o:konggobj, x:2352, y:336}],
[{o:klocek, x:2352, y:336}],
[{o:klocek, x:2384, y:336}],
[{o:klocek, x:2416, y:336}],
[{o:klocek_ciemny, x:2976, y:272}],
[{o:bonus, x:2976, y:224}],
[{o:podloze_ziemia, x:2752, y:448}],
[{o:podloze_ziemia, x:2752, y:464}],
[{o:podloze_ziemia, x:2768, y:464}],
[{o:podloze_ziemia, x:1376, y:448}],
[{o:Walenty, x:336, y:96}],
[{o:podloze_trawa, x:288, y:240}],
[{o:podloze_trawa, x:352, y:240}],
[{o:podloze_ziemia, x:272, y:192}],
[{o:podloze_ziemia, x:288, y:176}],
[{o:podloze_ziemia, x:304, y:176}],
[{o:podloze_ziemia, x:320, y:176}],
[{o:podloze_ziemia, x:336, y:176}],
[{o:podloze_ziemia, x:352, y:176}],
[{o:podloze_ziemia, x:368, y:176}],
[{o:podloze_ziemia, x:384, y:192}],
[{o:podloze_ziemia, x:400, y:208}],
[{o:podloze_ziemia, x:400, y:224}],
[{o:podloze_ziemia, x:400, y:240}],
[{o:podloze_ziemia, x:400, y:256}],
[{o:podloze_ziemia, x:256, y:208}],
[{o:podloze_ziemia, x:256, y:224}],
[{o:podloze_ziemia, x:256, y:240}],
[{o:podloze_ziemia, x:256, y:256}],
[{o:podloze_ziemia, x:256, y:272}],
[{o:podloze_ziemia, x:272, y:288}],
[{o:podloze_ziemia, x:400, y:272}],
[{o:podloze_ziemia, x:384, y:288}],
[{o:podloze_ziemia, x:384, y:304}],
[{o:podloze_ziemia, x:272, y:304}],
[{o:podloze_ziemia, x:288, y:320}],
[{o:podloze_ziemia, x:304, y:320}],
[{o:podloze_ziemia, x:320, y:320}],
[{o:podloze_ziemia, x:336, y:320}],
[{o:podloze_ziemia, x:352, y:320}],
[{o:podloze_ziemia, x:368, y:320}],
[{o:podloze_ziemia, x:272, y:208}],
[{o:podloze_ziemia, x:288, y:192}],
[{o:podloze_ziemia, x:304, y:192}],
[{o:podloze_ziemia, x:320, y:192}],
[{o:podloze_ziemia, x:336, y:192}],
[{o:podloze_ziemia, x:352, y:192}],
[{o:podloze_ziemia, x:368, y:192}],
[{o:podloze_ziemia, x:384, y:208}],
[{o:podloze_ziemia, x:384, y:224}],
[{o:podloze_ziemia, x:272, y:224}],
[{o:podloze_ziemia, x:288, y:224}],
[{o:podloze_ziemia, x:288, y:208}],
[{o:podloze_ziemia, x:304, y:224}],
[{o:podloze_ziemia, x:304, y:208}],
[{o:podloze_ziemia, x:320, y:224}],
[{o:podloze_ziemia, x:320, y:208}],
[{o:podloze_ziemia, x:336, y:224}],
[{o:podloze_ziemia, x:336, y:208}],
[{o:podloze_ziemia, x:352, y:224}],
[{o:podloze_ziemia, x:352, y:208}],
[{o:podloze_ziemia, x:368, y:208}],
[{o:podloze_ziemia, x:368, y:224}],
[{o:podloze_ziemia, x:320, y:272}],
[{o:podloze_ziemia, x:352, y:288}],
[{o:podloze_ziemia, x:304, y:288}],
[{o:podloze_ziemia, x:304, y:304}],
[{o:podloze_ziemia, x:352, y:304}],
[{o:podloze_ziemia, x:336, y:272}],
[{o:podloze_ziemia, x:320, y:256}],
[{o:podloze_ziemia, x:336, y:256}],
[{o:podloze_ziemia, x:336, y:240}],
[{o:podloze_ziemia, x:320, y:240}],
[{o:podloze_ziemia, x:288, y:288}],
[{o:podloze_ziemia, x:288, y:304}],
[{o:podloze_ziemia, x:368, y:288}],
[{o:podloze_ziemia, x:368, y:304}],
[{o:podloze_skos_lewy, x:336, y:304}],
[{o:podloze_skos_prawy, x:320, y:304}],
[{o:klocek, x:304, y:336}],
[{o:klocek, x:352, y:336}],
[{o:podloze_ziemia, x:304, y:416}],
[{o:podloze_ziemia, x:320, y:416}],
[{o:podloze_ziemia, x:336, y:416}],
[{o:podloze_ziemia, x:352, y:416}],
[{o:podloze_ziemia, x:368, y:416}],
[{o:podloze_ziemia, x:304, y:240}],
[{o:podloze_ziemia, x:352, y:240}],
[{o:klocek, x:304, y:384}],
[{o:klocek, x:336, y:384}],
[{o:pistolet, x:96, y:80}],
[{o:podloze_ziemia, x:432, y:384}],
[{o:podloze_ziemia, x:688, y:128}],
[{o:podloze_ziemia, x:672, y:128}],
[{o:podloze_ziemia, x:656, y:128}],
[{o:podloze_ziemia, x:640, y:128}],
[{o:podloze_ziemia, x:624, y:128}],
[{o:wrog1, x:624, y:0}],
[{o:wrog1, x:592, y:16}],
[{o:konggobj, x:160, y:128}],
[{o:skrzydla, x:64, y:208}],
[{o:podloze_trawa, x:1824, y:0}],
[{o:podloze_trawa, x:1824, y:32}],
[{o:podloze_trawa, x:1824, y:64}],
[{o:podloze_trawa, x:1824, y:96}],
[{o:podloze_trawa, x:1824, y:128}],
[{o:podloze_trawa, x:1824, y:160}],
[{o:podloze_trawa, x:1824, y:192}],
[{o:podloze_trawa, x:1824, y:224}],
[{o:podloze_trawa, x:1824, y:256}],
[{o:podloze_trawa, x:1824, y:288}],
[{o:podloze_trawa, x:1824, y:320}],
[{o:podloze_trawa, x:1824, y:352}],
[{o:podloze_trawa, x:1824, y:384}],
[{o:podloze_trawa, x:1824, y:416}],
[{o:podloze_trawa, x:1824, y:448}],
[{o:podloze_trawa, x:1824, y:480}],
[{o:podloze_trawa, x:1856, y:480}],
[{o:podloze_trawa, x:1856, y:448}],
[{o:podloze_trawa, x:1856, y:416}],
[{o:podloze_trawa, x:1856, y:384}],
[{o:podloze_trawa, x:1856, y:352}],
[{o:podloze_trawa, x:1856, y:320}],
[{o:podloze_trawa, x:1856, y:288}],
[{o:podloze_trawa, x:1856, y:256}],
[{o:podloze_trawa, x:1856, y:224}],
[{o:podloze_trawa, x:1856, y:192}],
[{o:podloze_trawa, x:1856, y:160}],
[{o:podloze_trawa, x:1856, y:128}],
[{o:podloze_trawa, x:1856, y:96}],
[{o:podloze_trawa, x:1856, y:64}],
[{o:podloze_trawa, x:1856, y:32}],
[{o:podloze_trawa, x:1856, y:0}],
[{o:podloze_trawa, x:0, y:832}],
[{o:podloze_trawa, x:64, y:832}],
[{o:podloze_trawa, x:128, y:832}],
[{o:podloze_trawa, x:192, y:832}],
[{o:tasma_skraj, x:1792, y:576}],
[{o:tasma_skraj_prawy, x:1968, y:576}],
[{o:tasma_lewo, x:1808, y:576}],
[{o:tasma_lewo, x:1824, y:576}],
[{o:tasma_lewo, x:1840, y:576}],
[{o:tasma_lewo, x:1856, y:576}],
[{o:tasma_lewo, x:1872, y:576}],
[{o:tasma_lewo, x:1888, y:576}],
[{o:tasma_lewo, x:1904, y:576}],
[{o:tasma_lewo, x:1920, y:576}],
[{o:tasma_lewo, x:1936, y:576}],
[{o:tasma_lewo, x:1952, y:576}],
[{o:podloze_ziemia, x:1728, y:544}],
[{o:podloze_ziemia, x:1744, y:544}],
[{o:podloze_ziemia, x:1680, y:512}],
[{o:podloze_ziemia, x:1664, y:512}],
[{o:podloze_ziemia, x:1616, y:480}],
[{o:podloze_ziemia, x:1600, y:480}]];
this.start = function() {
__room_start__(this, Etap2, 3320, 880, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane='pierścień';

};
}
var Etap2 = new __Etap2();
tu_scenes.push(Etap2);
function __Etap5PierwszyBos() { 
this.tiles = [
];
this.objects = [
[{o:Walenty, x:64, y:1472}],
[{o:podloze_trawa, x:0, y:1536}],
[{o:podloze_trawa, x:32, y:1536}],
[{o:podloze_trawa, x:64, y:1536}],
[{o:podloze_trawa, x:96, y:1536}],
[{o:podloze_trawa, x:0, y:1152}],
[{o:podloze_trawa, x:0, y:1184}],
[{o:podloze_trawa, x:0, y:1216}],
[{o:podloze_trawa, x:32, y:1216}],
[{o:podloze_trawa, x:64, y:1216}],
[{o:podloze_trawa, x:96, y:1216}],
[{o:podloze_trawa, x:128, y:1216}],
[{o:podloze_trawa, x:160, y:1216}],
[{o:podloze_trawa, x:192, y:1216}],
[{o:podloze_trawa, x:224, y:1216}],
[{o:podloze_trawa, x:256, y:1216}],
[{o:podloze_trawa, x:288, y:1216}],
[{o:podloze_trawa, x:320, y:1216}],
[{o:podloze_trawa, x:352, y:1216}],
[{o:podloze_trawa, x:384, y:1216}],
[{o:podloze_trawa, x:416, y:1216}],
[{o:podloze_trawa, x:448, y:1216}],
[{o:podloze_trawa, x:480, y:1216}],
[{o:podloze_trawa, x:512, y:1216}],
[{o:podloze_trawa, x:544, y:1216}],
[{o:podloze_trawa, x:576, y:1216}],
[{o:podloze_trawa, x:608, y:1216}],
[{o:greenBoss, x:256, y:1024}],
[{o:klocek, x:224, y:1536}],
[{o:klocek, x:256, y:1536}],
[{o:kladka, x:288, y:1568}],
[{o:tasma_skraj, x:352, y:1504}],
[{o:tasma_prawo, x:368, y:1504}],
[{o:tasma_prawo, x:384, y:1504}],
[{o:tasma_prawo, x:400, y:1504}],
[{o:tasma_prawo, x:416, y:1504}],
[{o:tasma_prawo, x:432, y:1504}],
[{o:tasma_prawo, x:448, y:1504}],
[{o:tasma_prawo, x:464, y:1504}],
[{o:tasma_prawo, x:480, y:1504}],
[{o:tasma_prawo, x:496, y:1504}],
[{o:tasma_prawo, x:512, y:1504}],
[{o:tasma_prawo, x:528, y:1504}],
[{o:tasma_prawo, x:544, y:1504}],
[{o:tasma_prawo, x:560, y:1504}],
[{o:tasma_prawo, x:576, y:1504}],
[{o:tasma_prawo, x:592, y:1504}],
[{o:tasma_prawo, x:608, y:1504}],
[{o:tasma_skraj_prawy, x:624, y:1504}],
[{o:podloze_trawa, x:672, y:1488}],
[{o:podloze_trawa, x:640, y:1216}],
[{o:podloze_trawa, x:672, y:1216}],
[{o:podloze_trawa, x:704, y:1488}],
[{o:podloze_trawa, x:768, y:1440}],
[{o:podloze_trawa, x:800, y:1440}],
[{o:podloze_trawa, x:832, y:1440}],
[{o:podloze_trawa, x:896, y:1376}],
[{o:podloze_trawa, x:928, y:1376}],
[{o:podloze_trawa, x:976, y:1376}],
[{o:podloze_trawa, x:960, y:1376}],
[{o:podloze_ziemia, x:1024, y:1344}],
[{o:podloze_ziemia, x:1088, y:1344}],
[{o:podloze_ziemia, x:1152, y:1344}],
[{o:podloze_ziemia, x:1248, y:1344}],
[{o:podloze_ziemia, x:1344, y:1344}],
[{o:podloze_ziemia, x:1440, y:1344}],
[{o:podloze_ziemia, x:1536, y:1344}],
[{o:kladka, x:1536, y:1248}],
[{o:klocek_ciemny, x:1536, y:1280}],
[{o:podloze_trawa, x:1472, y:1120}],
[{o:podloze_trawa, x:1440, y:1120}],
[{o:podloze_trawa, x:1408, y:1120}],
[{o:podloze_trawa, x:1504, y:1120}],
[{o:podloze_trawa, x:1376, y:1104}],
[{o:egipska_krolewna, x:1440, y:1072}],
[{o:burger_do_wziecia, x:80, y:1104}],
[{o:podloze_trawa, x:1248, y:1056}],
[{o:podloze_ziemia, x:1152, y:1056}],
[{o:podloze_ziemia, x:1056, y:1056}],
[{o:podloze_ziemia, x:960, y:1056}],
[{o:podloze_ziemia, x:896, y:1024}],
[{o:podloze_ziemia, x:832, y:1024}],
[{o:podloze_ziemia, x:768, y:960}],
[{o:podloze_ziemia, x:704, y:960}],
[{o:granat, x:192, y:1344}],
[{o:kalasz, x:192, y:1280}],
[{o:wrogAniol, x:512, y:832}],
[{o:wrog2, x:640, y:64}],
[{o:podloze_trawa, x:640, y:192}],
[{o:podloze_trawa, x:672, y:192}],
[{o:podloze_trawa, x:608, y:192}],
[{o:podloze_trawa, x:448, y:288}],
[{o:podloze_trawa, x:448, y:320}],
[{o:podloze_trawa, x:480, y:320}],
[{o:podloze_trawa, x:512, y:320}],
[{o:podloze_trawa, x:544, y:320}],
[{o:podloze_trawa, x:544, y:416}],
[{o:podloze_trawa, x:576, y:416}],
[{o:podloze_trawa, x:608, y:416}],
[{o:podloze_trawa, x:640, y:416}],
[{o:podloze_trawa, x:672, y:416}],
[{o:podloze_trawa, x:672, y:544}],
[{o:podloze_trawa, x:704, y:544}],
[{o:podloze_trawa, x:736, y:544}],
[{o:podloze_trawa, x:768, y:544}],
[{o:podloze_trawa, x:800, y:544}],
[{o:podloze_trawa, x:832, y:544}],
[{o:podloze_trawa, x:832, y:512}],
[{o:podloze_trawa, x:672, y:640}],
[{o:podloze_trawa, x:640, y:640}],
[{o:podloze_trawa, x:608, y:640}],
[{o:podloze_trawa, x:576, y:640}],
[{o:podloze_trawa, x:544, y:640}],
[{o:kladka, x:64, y:1024}],
[{o:skrzydla, x:64, y:768}],
[{o:wrog2, x:608, y:0}],
[{o:bonus, x:288, y:864}],
[{o:bonus, x:256, y:832}],
[{o:bonus, x:320, y:832}],
[{o:bonus, x:352, y:800}],
[{o:bonus, x:224, y:800}],
[{o:bonus, x:208, y:768}],
[{o:bonus, x:368, y:768}],
[{o:bonus, x:352, y:736}],
[{o:bonus, x:224, y:736}],
[{o:bonus, x:256, y:736}],
[{o:bonus, x:272, y:752}],
[{o:bonus, x:320, y:736}],
[{o:bonus, x:304, y:752}],
[{o:bonus, x:288, y:768}],
[{o:bonus, x:112, y:512}],
[{o:bonus, x:144, y:480}],
[{o:bonus, x:176, y:448}],
[{o:bonus, x:208, y:480}],
[{o:bonus, x:240, y:512}],
[{o:bonus, x:176, y:496}],
[{o:bonus, x:176, y:544}],
[{o:bonus, x:176, y:592}],
[{o:bonus, x:176, y:304}],
[{o:bonus, x:176, y:256}],
[{o:bonus, x:176, y:224}],
[{o:bonus, x:176, y:176}],
[{o:bonus, x:144, y:208}],
[{o:bonus, x:208, y:208}],
[{o:bonus, x:240, y:240}],
[{o:bonus, x:112, y:240}],
[{o:kalasz, x:112, y:48}],
[{o:granat, x:192, y:80}],
[{o:granatnik, x:208, y:32}],
[{o:bonus, x:336, y:16}],
[{o:bonus, x:384, y:32}],
[{o:bonus, x:432, y:64}],
[{o:bonus, x:480, y:96}],
[{o:bonus, x:752, y:32}],
[{o:bonus, x:800, y:48}],
[{o:bonus, x:848, y:64}],
[{o:bonus, x:976, y:32}],
[{o:bonus, x:1024, y:64}],
[{o:bonus, x:1072, y:96}],
[{o:bonus, x:1152, y:16}],
[{o:bonus, x:1184, y:48}],
[{o:bonus, x:1232, y:96}],
[{o:bonus, x:1344, y:16}],
[{o:bonus, x:1392, y:48}],
[{o:bonus, x:1456, y:96}],
[{o:bonus, x:1296, y:240}],
[{o:bonus, x:1344, y:240}],
[{o:bonus, x:1392, y:240}],
[{o:bonus, x:1392, y:288}],
[{o:bonus, x:1344, y:288}],
[{o:bonus, x:1296, y:288}],
[{o:bonus, x:1296, y:336}],
[{o:bonus, x:1344, y:336}],
[{o:bonus, x:1392, y:336}],
[{o:bonus, x:1248, y:384}],
[{o:bonus, x:1200, y:384}],
[{o:bonus, x:1152, y:384}],
[{o:bonus, x:1152, y:432}],
[{o:bonus, x:1200, y:432}],
[{o:bonus, x:1248, y:432}],
[{o:bonus, x:1248, y:480}],
[{o:bonus, x:1200, y:480}],
[{o:bonus, x:1152, y:480}],
[{o:bonus, x:1104, y:336}],
[{o:bonus, x:1104, y:288}],
[{o:bonus, x:1104, y:240}],
[{o:bonus, x:1056, y:240}],
[{o:bonus, x:1056, y:288}],
[{o:bonus, x:1008, y:240}],
[{o:bonus, x:1008, y:288}],
[{o:bonus, x:1008, y:336}],
[{o:bonus, x:1056, y:336}],
[{o:bonus, x:1296, y:528}],
[{o:bonus, x:1344, y:528}],
[{o:bonus, x:1392, y:528}],
[{o:bonus, x:1392, y:576}],
[{o:bonus, x:1392, y:624}],
[{o:bonus, x:1344, y:624}],
[{o:bonus, x:1344, y:576}],
[{o:bonus, x:1296, y:576}],
[{o:bonus, x:1296, y:624}],
[{o:bonus, x:1104, y:624}],
[{o:bonus, x:1104, y:576}],
[{o:bonus, x:1104, y:528}],
[{o:bonus, x:1056, y:528}],
[{o:bonus, x:1056, y:576}],
[{o:bonus, x:1008, y:576}],
[{o:bonus, x:1008, y:528}],
[{o:bonus, x:1008, y:624}],
[{o:bonus, x:1056, y:624}],
[{o:podloze_ziemia, x:1008, y:384}],
[{o:podloze_ziemia, x:1104, y:384}],
[{o:podloze_ziemia, x:1056, y:384}],
[{o:podloze_ziemia, x:1152, y:528}],
[{o:podloze_ziemia, x:1200, y:528}],
[{o:podloze_ziemia, x:1248, y:528}],
[{o:podloze_ziemia, x:1296, y:672}],
[{o:podloze_ziemia, x:1344, y:672}],
[{o:podloze_ziemia, x:1392, y:672}],
[{o:kladka, x:160, y:1584}],
[{o:kladka, x:1184, y:1424}],
[{o:podloze_trawa, x:1024, y:1488}],
[{o:podloze_trawa, x:1056, y:1488}],
[{o:podloze_trawa, x:1088, y:1488}],
[{o:podloze_trawa, x:1120, y:1488}],
[{o:podloze_trawa, x:1152, y:1488}],
[{o:podloze_trawa, x:1248, y:1456}],
[{o:podloze_trawa, x:1280, y:1456}],
[{o:podloze_trawa, x:1312, y:1456}],
[{o:podloze_trawa, x:1344, y:1456}],
[{o:podloze_trawa, x:1376, y:1456}],
[{o:podloze_trawa, x:1232, y:1168}],
[{o:podloze_trawa, x:1200, y:1168}],
[{o:podloze_trawa, x:1168, y:1168}],
[{o:podloze_trawa, x:1040, y:1168}],
[{o:podloze_trawa, x:1008, y:1168}],
[{o:podloze_trawa, x:976, y:1168}],
[{o:kladka, x:1088, y:1168}],
[{o:kladka, x:896, y:1200}],
[{o:kladka, x:816, y:1216}],
[{o:bonus, x:144, y:1424}],
[{o:bonus, x:240, y:1424}],
[{o:bonus, x:368, y:1424}],
[{o:bonus, x:496, y:1424}],
[{o:bonus, x:576, y:1424}],
[{o:bonus, x:432, y:1424}],
[{o:bonus, x:368, y:1360}],
[{o:bonus, x:432, y:1360}],
[{o:bonus, x:496, y:1360}],
[{o:bonus, x:576, y:1360}],
[{o:bonus, x:688, y:1392}],
[{o:bonus, x:784, y:1360}],
[{o:bonus, x:896, y:1296}],
[{o:bonus, x:960, y:1264}],
[{o:bonus, x:832, y:1136}],
[{o:bonus, x:896, y:1120}],
[{o:bonus, x:1056, y:1408}],
[{o:bonus, x:1120, y:1408}],
[{o:bonus, x:1056, y:1248}],
[{o:bonus, x:1136, y:1248}],
[{o:bonus, x:1232, y:1248}],
[{o:bonus, x:1328, y:1248}],
[{o:bonus, x:1424, y:1248}],
[{o:bonus, x:1312, y:1392}],
[{o:bonus, x:1376, y:1392}],
[{o:bonus, x:1424, y:1184}],
[{o:bonus, x:1328, y:1184}],
[{o:bonus, x:1232, y:960}],
[{o:bonus, x:1136, y:960}],
[{o:bonus, x:1056, y:960}],
[{o:bonus, x:960, y:960}],
[{o:bonus, x:688, y:864}],
[{o:bonus, x:768, y:864}],
[{o:podloze_ziemia, x:224, y:1568}],
[{o:podloze_ziemia, x:240, y:1568}],
[{o:podloze_ziemia, x:256, y:1568}],
[{o:podloze_ziemia, x:272, y:1568}],
[{o:szybkaWinda, x:1312, y:1072}]];
this.start = function() {
__room_start__(this, Etap5PierwszyBos, 1600, 1600, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane='burg';

};
}
var Etap5PierwszyBos = new __Etap5PierwszyBos();
tu_scenes.push(Etap5PierwszyBos);
function __ETAP3() { 
this.tiles = [
];
this.objects = [
[{o:podloze_trawa, x:0, y:0}],
[{o:podloze_trawa, x:0, y:64}],
[{o:podloze_trawa, x:0, y:128}],
[{o:podloze_trawa, x:0, y:192}],
[{o:podloze_trawa, x:0, y:256}],
[{o:podloze_trawa, x:0, y:320}],
[{o:podloze_trawa, x:0, y:384}],
[{o:podloze_trawa, x:0, y:2432}],
[{o:podloze_trawa, x:128, y:2432}],
[{o:podloze_trawa, x:192, y:2432}],
[{o:podloze_trawa, x:32, y:2432}],
[{o:podloze_trawa, x:160, y:2432}],
[{o:podloze_trawa, x:256, y:2368}],
[{o:podloze_trawa, x:288, y:2368}],
[{o:podloze_trawa, x:64, y:2304}],
[{o:podloze_trawa, x:96, y:2304}],
[{o:podloze_trawa, x:128, y:2304}],
[{o:podloze_trawa, x:160, y:2304}],
[{o:Walenty, x:96, y:32}],
[{o:podloze_ziemia, x:0, y:32}],
[{o:podloze_ziemia, x:0, y:96}],
[{o:podloze_ziemia, x:0, y:160}],
[{o:podloze_ziemia, x:0, y:224}],
[{o:podloze_ziemia, x:0, y:288}],
[{o:podloze_ziemia, x:0, y:352}],
[{o:klocek, x:512, y:2208}],
[{o:kladka, x:480, y:2080}],
[{o:kladka, x:384, y:2048}],
[{o:podloze_trawa, x:224, y:2080}],
[{o:podloze_trawa, x:192, y:2080}],
[{o:podloze_ziemia, x:160, y:2048}],
[{o:podloze_ziemia, x:32, y:2048}],
[{o:kladka, x:0, y:1984}],
[{o:podloze_ziemia, x:480, y:2208}],
[{o:kladka, x:160, y:1824}],
[{o:kladka, x:224, y:1664}],
[{o:klocek_ciemny, x:288, y:1568}],
[{o:klocek, x:320, y:1552}],
[{o:klocek, x:352, y:1536}],
[{o:klocek, x:384, y:1520}],
[{o:klocek, x:416, y:1504}],
[{o:klocek, x:448, y:1488}],
[{o:klocek, x:480, y:1472}],
[{o:klocek, x:512, y:1456}],
[{o:klocek, x:544, y:1440}],
[{o:klocek, x:576, y:1424}],
[{o:podloze_skos_lewy, x:304, y:1552}],
[{o:podloze_skos_lewy, x:400, y:1504}],
[{o:tasma_skraj_prawy, x:544, y:1408}],
[{o:tasma_lewo, x:528, y:1408}],
[{o:tasma_lewo, x:512, y:1408}],
[{o:tasma_lewo, x:496, y:1408}],
[{o:tasma_lewo, x:480, y:1408}],
[{o:tasma_skraj, x:464, y:1408}],
[{o:kladka, x:464, y:1328}],
[{o:szybkaWinda, x:400, y:1248}],
[{o:szybkaWinda, x:528, y:1232}],
[{o:podloze_trawa, x:576, y:960}],
[{o:klocek_ciemny, x:576, y:832}],
[{o:klocek_ciemny, x:576, y:704}],
[{o:klocek_ciemny, x:320, y:704}],
[{o:klocek_ciemny, x:256, y:704}],
[{o:podloze_skos_lewy, x:576, y:576}],
[{o:podloze_skos_prawy, x:320, y:576}],
[{o:podloze_skos_prawy, x:320, y:2368}],
[{o:podloze_ziemia, x:384, y:2432}],
[{o:podloze_ziemia, x:448, y:2432}],
[{o:podloze_ziemia, x:512, y:2432}],
[{o:kladka, x:576, y:2432}],
[{o:podloze_ziemia, x:512, y:2176}],
[{o:kladka, x:256, y:640}],
[{o:podloze_trawa, x:352, y:384}],
[{o:podloze_trawa, x:384, y:384}],
[{o:podloze_trawa, x:416, y:384}],
[{o:podloze_trawa, x:448, y:384}],
[{o:podloze_trawa, x:480, y:384}],
[{o:podloze_trawa, x:576, y:384}],
[{o:podloze_trawa, x:608, y:384}],
[{o:podloze_trawa, x:288, y:256}],
[{o:podloze_trawa, x:320, y:256}],
[{o:podloze_trawa, x:352, y:256}],
[{o:podloze_trawa, x:384, y:256}],
[{o:podloze_trawa, x:480, y:256}],
[{o:podloze_trawa, x:512, y:256}],
[{o:podloze_trawa, x:544, y:256}],
[{o:podloze_trawa, x:576, y:256}],
[{o:podloze_trawa, x:608, y:256}],
[{o:podloze_trawa, x:288, y:128}],
[{o:podloze_trawa, x:320, y:128}],
[{o:podloze_trawa, x:352, y:128}],
[{o:podloze_trawa, x:384, y:128}],
[{o:podloze_trawa, x:416, y:128}],
[{o:podloze_trawa, x:448, y:128}],
[{o:podloze_trawa, x:576, y:128}],
[{o:podloze_trawa, x:608, y:128}],
[{o:kladka, x:512, y:224}],
[{o:szybkaWinda, x:192, y:608}],
[{o:podloze_skos_lewy, x:272, y:256}],
[{o:podloze_skos_lewy, x:336, y:384}],
[{o:klocek, x:416, y:256}],
[{o:klocek, x:448, y:256}],
[{o:klocek, x:512, y:384}],
[{o:klocek, x:544, y:384}],
[{o:egipska_krolewna, x:576, y:288}],
[{o:slon_do_wziecia_dup, x:576, y:64}],
[{o:bonus, x:384, y:320}],
[{o:bonus, x:448, y:320}],
[{o:bonus, x:512, y:320}],
[{o:bonus, x:320, y:192}],
[{o:bonus, x:384, y:192}],
[{o:bonus, x:608, y:192}],
[{o:bonus, x:320, y:64}],
[{o:bonus, x:384, y:64}],
[{o:bonus, x:256, y:192}],
[{o:bonus, x:256, y:64}]];
this.start = function() {
__room_start__(this, ETAP3, 640, 2500, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane='slon';

};
}
var ETAP3 = new __ETAP3();
tu_scenes.push(ETAP3);
function __Etap6_Labirynt() { 
this.tiles = [
];
this.objects = [
[{o:podloze_ziemia, x:48, y:1536}],
[{o:podloze_ziemia, x:96, y:1536}],
[{o:podloze_ziemia, x:144, y:1536}],
[{o:podloze_trawa, x:192, y:1536}],
[{o:podloze_trawa, x:256, y:1536}],
[{o:podloze_trawa, x:288, y:1536}],
[{o:podloze_trawa, x:320, y:1536}],
[{o:podloze_trawa, x:384, y:1536}],
[{o:podloze_trawa, x:480, y:1536}],
[{o:Walenty, x:288, y:1504}],
[{o:podloze_trawa, x:640, y:1408}],
[{o:podloze_trawa, x:640, y:1376}],
[{o:podloze_trawa, x:640, y:1344}],
[{o:podloze_trawa, x:640, y:1312}],
[{o:podloze_trawa, x:640, y:1440}],
[{o:podloze_trawa, x:640, y:1472}],
[{o:podloze_trawa, x:640, y:1504}],
[{o:podloze_trawa, x:640, y:1536}],
[{o:podloze_trawa, x:640, y:1568}],
[{o:podloze_trawa, x:672, y:1568}],
[{o:podloze_trawa, x:672, y:1536}],
[{o:podloze_trawa, x:672, y:1504}],
[{o:podloze_trawa, x:672, y:1472}],
[{o:podloze_trawa, x:672, y:1440}],
[{o:podloze_trawa, x:672, y:1408}],
[{o:podloze_trawa, x:672, y:1376}],
[{o:podloze_trawa, x:672, y:1344}],
[{o:podloze_trawa, x:672, y:1312}],
[{o:podloze_trawa, x:672, y:1280}],
[{o:podloze_trawa, x:640, y:1280}],
[{o:podloze_trawa, x:640, y:1248}],
[{o:podloze_trawa, x:608, y:1248}],
[{o:podloze_trawa, x:672, y:1248}],
[{o:podloze_trawa, x:704, y:1248}],
[{o:podloze_trawa, x:608, y:1024}],
[{o:podloze_trawa, x:640, y:1024}],
[{o:podloze_trawa, x:672, y:1024}],
[{o:podloze_trawa, x:704, y:1024}],
[{o:podloze_trawa, x:640, y:992}],
[{o:podloze_trawa, x:640, y:960}],
[{o:podloze_trawa, x:640, y:928}],
[{o:podloze_trawa, x:640, y:896}],
[{o:podloze_trawa, x:640, y:864}],
[{o:podloze_trawa, x:640, y:832}],
[{o:podloze_trawa, x:640, y:800}],
[{o:podloze_trawa, x:640, y:768}],
[{o:podloze_trawa, x:640, y:736}],
[{o:podloze_trawa, x:640, y:704}],
[{o:podloze_trawa, x:608, y:704}],
[{o:podloze_trawa, x:672, y:704}],
[{o:podloze_trawa, x:704, y:704}],
[{o:podloze_trawa, x:672, y:736}],
[{o:podloze_trawa, x:672, y:768}],
[{o:podloze_trawa, x:672, y:800}],
[{o:podloze_trawa, x:672, y:832}],
[{o:podloze_trawa, x:672, y:864}],
[{o:podloze_trawa, x:672, y:896}],
[{o:podloze_trawa, x:672, y:928}],
[{o:podloze_trawa, x:672, y:960}],
[{o:podloze_trawa, x:672, y:992}],
[{o:kongbigobj, x:384, y:1248}],
[{o:kongbigobj, x:160, y:1248}],
[{o:szybkaWinda, x:32, y:1472}],
[{o:szybkaWinda, x:768, y:1536}],
[{o:podloze_trawa, x:832, y:1248}],
[{o:podloze_trawa, x:864, y:1248}],
[{o:podloze_trawa, x:896, y:1248}],
[{o:podloze_trawa, x:928, y:1248}],
[{o:podloze_trawa, x:864, y:1280}],
[{o:podloze_trawa, x:896, y:1280}],
[{o:podloze_trawa, x:864, y:1312}],
[{o:podloze_trawa, x:896, y:1312}],
[{o:podloze_trawa, x:864, y:1344}],
[{o:podloze_trawa, x:896, y:1344}],
[{o:podloze_trawa, x:896, y:1376}],
[{o:podloze_trawa, x:864, y:1376}],
[{o:podloze_trawa, x:864, y:1408}],
[{o:podloze_trawa, x:896, y:1408}],
[{o:podloze_trawa, x:896, y:1440}],
[{o:podloze_trawa, x:864, y:1440}],
[{o:podloze_trawa, x:864, y:1472}],
[{o:podloze_trawa, x:896, y:1472}],
[{o:podloze_trawa, x:896, y:1504}],
[{o:podloze_trawa, x:864, y:1504}],
[{o:podloze_trawa, x:864, y:1536}],
[{o:podloze_trawa, x:896, y:1536}],
[{o:podloze_trawa, x:896, y:1568}],
[{o:podloze_trawa, x:864, y:1568}],
[{o:podloze_trawa, x:832, y:1024}],
[{o:podloze_trawa, x:864, y:1024}],
[{o:podloze_trawa, x:896, y:1024}],
[{o:podloze_trawa, x:928, y:1024}],
[{o:podloze_trawa, x:864, y:992}],
[{o:podloze_trawa, x:896, y:992}],
[{o:podloze_trawa, x:896, y:960}],
[{o:podloze_trawa, x:864, y:960}],
[{o:podloze_trawa, x:864, y:928}],
[{o:podloze_trawa, x:896, y:928}],
[{o:podloze_trawa, x:896, y:896}],
[{o:podloze_trawa, x:864, y:896}],
[{o:podloze_trawa, x:864, y:896}],
[{o:podloze_trawa, x:864, y:864}],
[{o:podloze_trawa, x:896, y:864}],
[{o:podloze_trawa, x:896, y:832}],
[{o:podloze_trawa, x:864, y:832}],
[{o:podloze_trawa, x:864, y:800}],
[{o:podloze_trawa, x:896, y:800}],
[{o:podloze_trawa, x:864, y:768}],
[{o:podloze_trawa, x:896, y:768}],
[{o:podloze_trawa, x:864, y:736}],
[{o:podloze_trawa, x:896, y:736}],
[{o:podloze_trawa, x:896, y:704}],
[{o:podloze_trawa, x:928, y:704}],
[{o:podloze_trawa, x:864, y:704}],
[{o:podloze_trawa, x:832, y:704}],
[{o:kongbigobj, x:1056, y:1248}],
[{o:kongbigobj, x:1280, y:1248}],
[{o:konggobj, x:1056, y:1024}],
[{o:konggobj, x:1280, y:1024}],
[{o:bonus, x:992, y:1152}],
[{o:bonus, x:992, y:1120}],
[{o:bonus, x:992, y:1088}],
[{o:kladka, x:1216, y:1248}],
[{o:podloze_trawa, x:480, y:1024}],
[{o:podloze_trawa, x:448, y:1024}],
[{o:podloze_trawa, x:416, y:1024}],
[{o:podloze_trawa, x:384, y:1024}],
[{o:podloze_trawa, x:352, y:1024}],
[{o:podloze_trawa, x:256, y:1024}],
[{o:podloze_trawa, x:224, y:1024}],
[{o:podloze_trawa, x:192, y:1024}],
[{o:podloze_trawa, x:160, y:1024}],
[{o:podloze_trawa, x:416, y:992}],
[{o:podloze_trawa, x:416, y:960}],
[{o:podloze_trawa, x:416, y:928}],
[{o:podloze_trawa, x:416, y:896}],
[{o:podloze_trawa, x:416, y:864}],
[{o:podloze_trawa, x:448, y:864}],
[{o:podloze_trawa, x:480, y:864}],
[{o:klocek, x:512, y:864}],
[{o:klocek, x:544, y:864}],
[{o:klocek, x:576, y:864}],
[{o:klocek, x:608, y:864}],
[{o:granatnik, x:480, y:928}],
[{o:podloze_trawa, x:1536, y:928}],
[{o:podloze_trawa, x:1536, y:896}],
[{o:podloze_trawa, x:1568, y:800}],
[{o:podloze_trawa, x:1408, y:192}],
[{o:podloze_trawa, x:1440, y:192}],
[{o:podloze_trawa, x:1472, y:192}],
[{o:podloze_trawa, x:1504, y:160}],
[{o:podloze_trawa, x:1568, y:768}],
[{o:podloze_trawa, x:1568, y:736}],
[{o:podloze_trawa, x:1056, y:512}],
[{o:podloze_trawa, x:1088, y:512}],
[{o:podloze_trawa, x:1120, y:512}],
[{o:podloze_trawa, x:1184, y:512}],
[{o:podloze_trawa, x:1152, y:512}],
[{o:podloze_trawa, x:1184, y:480}],
[{o:podloze_trawa, x:1056, y:480}],
[{o:szybkaWinda, x:1344, y:832}],
[{o:podloze_trawa, x:1536, y:960}],
[{o:podloze_trawa, x:1504, y:960}],
[{o:podloze_trawa, x:1472, y:960}],
[{o:podloze_trawa, x:1440, y:960}],
[{o:podloze_trawa, x:1408, y:960}],
[{o:podloze_trawa, x:1376, y:960}],
[{o:podloze_trawa, x:1536, y:160}],
[{o:podloze_trawa, x:1568, y:160}],
[{o:skrzydla, x:1536, y:192}],
[{o:podloze_ziemia, x:1584, y:240}],
[{o:podloze_ziemia, x:1584, y:224}],
[{o:podloze_ziemia, x:1584, y:208}],
[{o:podloze_ziemia, x:1584, y:192}],
[{o:rozwalacz, x:544, y:976}],
[{o:podloze_trawa, x:0, y:128}],
[{o:podloze_trawa, x:0, y:160}],
[{o:podloze_trawa, x:32, y:160}],
[{o:podloze_trawa, x:64, y:160}],
[{o:podloze_trawa, x:96, y:160}],
[{o:podloze_trawa, x:224, y:160}],
[{o:podloze_trawa, x:256, y:160}],
[{o:podloze_trawa, x:288, y:160}],
[{o:podloze_trawa, x:320, y:160}],
[{o:podloze_trawa, x:320, y:128}],
[{o:podloze_trawa, x:0, y:352}],
[{o:podloze_trawa, x:0, y:384}],
[{o:podloze_trawa, x:32, y:384}],
[{o:podloze_trawa, x:64, y:384}],
[{o:podloze_trawa, x:96, y:384}],
[{o:podloze_trawa, x:128, y:384}],
[{o:podloze_trawa, x:160, y:384}],
[{o:podloze_trawa, x:192, y:384}],
[{o:podloze_trawa, x:224, y:384}],
[{o:podloze_trawa, x:256, y:384}],
[{o:podloze_trawa, x:288, y:384}],
[{o:podloze_trawa, x:320, y:384}],
[{o:podloze_trawa, x:352, y:384}],
[{o:podloze_trawa, x:384, y:384}],
[{o:podloze_trawa, x:416, y:384}],
[{o:podloze_trawa, x:448, y:384}],
[{o:podloze_trawa, x:480, y:384}],
[{o:podloze_trawa, x:512, y:384}],
[{o:podloze_trawa, x:576, y:384}],
[{o:podloze_trawa, x:544, y:384}],
[{o:podloze_trawa, x:576, y:352}],
[{o:podloze_trawa, x:608, y:384}],
[{o:podloze_trawa, x:640, y:384}],
[{o:podloze_trawa, x:640, y:352}],
[{o:podloze_trawa, x:64, y:352}],
[{o:zlozona_dziewczyna, x:64, y:96}],
[{o:zlozona_dziewczyna, x:224, y:96}],
[{o:podloze_ziemia, x:144, y:80}],
[{o:podloze_ziemia, x:160, y:80}],
[{o:podloze_ziemia, x:176, y:80}],
[{o:podloze_ziemia, x:192, y:80}],
[{o:podloze_ziemia, x:208, y:80}],
[{o:podloze_ziemia, x:208, y:64}],
[{o:podloze_ziemia, x:128, y:64}],
[{o:podloze_ziemia, x:128, y:80}],
[{o:pierscien_do_wziecia, x:1552, y:112}],
[{o:jablko_do_wziecia, x:768, y:1296}],
[{o:blueBoss, x:416, y:192}],
[{o:kalasz, x:1456, y:912}],
[{o:granat, x:1536, y:864}],
[{o:granat, x:1568, y:704}],
[{o:pistolet, x:1120, y:432}],
[{o:klocek, x:1472, y:224}],
[{o:klocek, x:1472, y:256}],
[{o:klocek, x:1504, y:256}],
[{o:klocek, x:1536, y:256}],
[{o:klocek, x:1568, y:256}],
[{o:bonus, x:192, y:1184}],
[{o:bonus, x:416, y:1184}],
[{o:bonus, x:672, y:1184}],
[{o:bonus, x:896, y:1184}],
[{o:bonus, x:1440, y:96}],
[{o:bonus, x:128, y:320}],
[{o:bonus, x:192, y:320}],
[{o:bonus, x:256, y:320}],
[{o:bonus, x:320, y:320}],
[{o:bonus, x:384, y:320}],
[{o:bonus, x:448, y:320}],
[{o:bonus, x:512, y:320}]];
this.start = function() {
__room_start__(this, Etap6_Labirynt, 1600, 1600, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);


co_wymagane=['pierścień','jablko'];

};
}
var Etap6_Labirynt = new __Etap6_Labirynt();
tu_scenes.push(Etap6_Labirynt);
function __Etap4() { 
this.tiles = [
];
this.objects = [
[{o:Walenty, x:64, y:384}],
[{o:podloze_trawa, x:0, y:448}],
[{o:podloze_trawa, x:32, y:448}],
[{o:podloze_trawa, x:64, y:448}],
[{o:podloze_trawa, x:96, y:448}],
[{o:podloze_trawa, x:128, y:448}],
[{o:podloze_skos_lewy, x:144, y:432}],
[{o:klocek, x:160, y:432}],
[{o:klocek, x:192, y:432}],
[{o:klocek, x:224, y:432}],
[{o:klocek, x:256, y:432}],
[{o:podloze_skos_lewy, x:288, y:416}],
[{o:podloze_trawa, x:288, y:432}],
[{o:podloze_trawa, x:320, y:416}],
[{o:podloze_ziemia, x:304, y:416}],
[{o:klocek, x:352, y:416}],
[{o:klocek, x:384, y:416}],
[{o:klocek, x:416, y:416}],
[{o:klocek, x:448, y:416}],
[{o:podloze_skos_lewy, x:464, y:400}],
[{o:podloze_ziemia, x:480, y:400}],
[{o:podloze_ziemia, x:496, y:400}],
[{o:podloze_skos_lewy, x:512, y:384}],
[{o:podloze_ziemia, x:512, y:400}],
[{o:podloze_ziemia, x:528, y:384}],
[{o:podloze_ziemia, x:544, y:384}],
[{o:podloze_ziemia, x:560, y:384}],
[{o:podloze_ziemia, x:576, y:384}],
[{o:podloze_ziemia, x:592, y:384}],
[{o:kladka, x:624, y:384}],
[{o:podloze_trawa, x:704, y:368}],
[{o:podloze_trawa, x:736, y:352}],
[{o:podloze_trawa, x:768, y:352}],
[{o:podloze_trawa, x:800, y:352}],
[{o:klocek, x:832, y:352}],
[{o:klocek, x:864, y:352}],
[{o:klocek, x:896, y:352}],
[{o:klocek, x:928, y:352}],
[{o:podloze_skos_lewy, x:992, y:320}],
[{o:podloze_skos_lewy, x:976, y:336}],
[{o:podloze_skos_lewy, x:1008, y:304}],
[{o:podloze_trawa, x:960, y:352}],
[{o:podloze_trawa, x:1008, y:336}],
[{o:podloze_trawa, x:1024, y:304}],
[{o:podloze_ziemia, x:1008, y:320}],
[{o:podloze_ziemia, x:992, y:336}],
[{o:podloze_ziemia, x:992, y:352}],
[{o:podloze_trawa, x:1088, y:320}],
[{o:podloze_trawa, x:1152, y:320}],
[{o:podloze_ziemia, x:1216, y:320}],
[{o:podloze_ziemia, x:1280, y:320}],
[{o:podloze_ziemia, x:1344, y:320}],
[{o:podloze_ziemia, x:1408, y:320}],
[{o:podloze_ziemia, x:1472, y:320}],
[{o:podloze_trawa, x:1536, y:320}],
[{o:podloze_ziemia, x:1600, y:320}],
[{o:podloze_ziemia, x:1664, y:320}],
[{o:podloze_trawa, x:1728, y:320}],
[{o:podloze_trawa, x:1760, y:320}],
[{o:podloze_trawa, x:1744, y:352}],
[{o:podloze_trawa, x:1744, y:384}],
[{o:podloze_trawa, x:1744, y:416}],
[{o:podloze_trawa, x:1744, y:448}],
[{o:podloze_trawa, x:1840, y:320}],
[{o:podloze_trawa, x:1920, y:320}],
[{o:podloze_trawa, x:2112, y:256}],
[{o:podloze_ziemia, x:2240, y:256}],
[{o:podloze_ziemia, x:2304, y:256}],
[{o:podloze_ziemia, x:2368, y:256}],
[{o:podloze_ziemia, x:2432, y:256}],
[{o:kladka, x:2176, y:384}],
[{o:podloze_ziemia, x:2496, y:256}],
[{o:kladka, x:2560, y:256}],
[{o:podloze_ziemia, x:2496, y:64}],
[{o:podloze_ziemia, x:2432, y:64}],
[{o:podloze_ziemia, x:2376, y:96}],
[{o:podloze_ziemia, x:2328, y:96}],
[{o:podloze_ziemia, x:2280, y:96}],
[{o:podloze_ziemia, x:2232, y:96}],
[{o:podloze_ziemia, x:2208, y:48}],
[{o:podloze_trawa, x:2160, y:48}],
[{o:podloze_trawa, x:2112, y:64}],
[{o:podloze_ziemia, x:2144, y:64}],
[{o:podloze_trawa, x:1952, y:96}],
[{o:podloze_trawa, x:1920, y:96}],
[{o:podloze_trawa, x:1824, y:96}],
[{o:podloze_trawa, x:1792, y:96}],
[{o:podloze_trawa, x:1696, y:96}],
[{o:podloze_trawa, x:1664, y:96}],
[{o:kladka, x:1568, y:96}],
[{o:podloze_ziemia, x:1504, y:32}],
[{o:podloze_ziemia, x:1472, y:32}],
[{o:podloze_ziemia, x:1408, y:32}],
[{o:podloze_ziemia, x:1376, y:32}],
[{o:podloze_ziemia, x:1312, y:32}],
[{o:podloze_ziemia, x:1280, y:32}],
[{o:podloze_trawa, x:1216, y:64}],
[{o:podloze_trawa, x:1184, y:64}],
[{o:podloze_trawa, x:1152, y:64}],
[{o:podloze_trawa, x:1056, y:96}],
[{o:podloze_trawa, x:1024, y:96}],
[{o:podloze_trawa, x:992, y:96}],
[{o:podloze_ziemia, x:96, y:320}],
[{o:podloze_ziemia, x:64, y:256}],
[{o:podloze_ziemia, x:32, y:192}],
[{o:podloze_ziemia, x:0, y:128}],
[{o:podloze_ziemia, x:64, y:64}],
[{o:podloze_ziemia, x:160, y:64}],
[{o:podloze_ziemia, x:224, y:64}],
[{o:podloze_ziemia, x:288, y:64}],
[{o:podloze_trawa, x:2080, y:96}],
[{o:podloze_trawa, x:2112, y:96}],
[{o:podloze_trawa, x:896, y:64}],
[{o:podloze_trawa, x:864, y:64}],
[{o:kwiatek_do_wziecia, x:864, y:32}],
[{o:podloze_trawa, x:1984, y:128}],
[{o:podloze_trawa, x:2016, y:128}],
[{o:podloze_trawa, x:2048, y:128}],
[{o:podloze_trawa, x:2080, y:128}],
[{o:podloze_trawa, x:1952, y:128}],
[{o:podloze_ziemia, x:1984, y:288}],
[{o:podloze_ziemia, x:2048, y:288}],
[{o:egipska_krolewna, x:2016, y:64}],
[{o:kwiatek_do_wziecia, x:992, y:64}],
[{o:kwiatek_do_wziecia, x:832, y:32}],
[{o:kwiatek_do_wziecia, x:832, y:64}],
[{o:podloze_trawa, x:832, y:96}],
[{o:podloze_trawa, x:864, y:96}],
[{o:bonus, x:96, y:224}],
[{o:bonus, x:64, y:160}],
[{o:bonus, x:160, y:0}],
[{o:bonus, x:224, y:0}],
[{o:bonus, x:288, y:0}],
[{o:bonus, x:288, y:288}],
[{o:bonus, x:736, y:224}],
[{o:bonus, x:800, y:224}],
[{o:bonus, x:1024, y:192}],
[{o:bonus, x:1056, y:32}],
[{o:bonus, x:1184, y:0}],
[{o:bonus, x:1248, y:224}],
[{o:bonus, x:1312, y:192}],
[{o:bonus, x:1376, y:224}],
[{o:bonus, x:1440, y:192}],
[{o:bonus, x:1536, y:224}],
[{o:bonus, x:1664, y:224}],
[{o:bonus, x:1792, y:224}],
[{o:bonus, x:2272, y:160}],
[{o:bonus, x:2400, y:160}],
[{o:bonus, x:2240, y:32}],
[{o:bonus, x:2304, y:32}]];
this.start = function() {
__room_start__(this, Etap4, 2640, 510, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 300, 300);

co_wymagane='kwiat';

};
}
var Etap4 = new __Etap4();
tu_scenes.push(Etap4);
function __Etap_7_duzy() { 
this.tiles = [
];
this.objects = [
[{o:podloze_trawa, x:1728, y:3136}],
[{o:podloze_trawa, x:1760, y:3136}],
[{o:podloze_trawa, x:1792, y:3136}],
[{o:podloze_trawa, x:1824, y:3136}],
[{o:Walenty, x:1792, y:3104}],
[{o:podloze_ziemia, x:1664, y:3072}],
[{o:podloze_ziemia, x:1888, y:3072}],
[{o:podloze_ziemia, x:1904, y:3072}],
[{o:podloze_ziemia, x:1680, y:3072}],
[{o:podloze_ziemia, x:1600, y:3008}],
[{o:podloze_ziemia, x:1968, y:3008}],
[{o:tasma_lewo, x:1536, y:2960}],
[{o:tasma_lewo, x:1520, y:2960}],
[{o:tasma_lewo, x:1504, y:2960}],
[{o:tasma_lewo, x:1488, y:2960}],
[{o:tasma_lewo, x:1472, y:2960}],
[{o:tasma_lewo, x:1456, y:2960}],
[{o:tasma_lewo, x:1440, y:2960}],
[{o:tasma_lewo, x:1424, y:2960}],
[{o:tasma_lewo, x:1408, y:2960}],
[{o:tasma_lewo, x:1392, y:2960}],
[{o:tasma_lewo, x:1376, y:2960}],
[{o:tasma_skraj, x:1360, y:2960}],
[{o:tasma_skraj_prawy, x:1552, y:2960}],
[{o:kladka, x:2048, y:2960}],
[{o:kladka, x:2128, y:2880}],
[{o:podloze_ziemia, x:1312, y:3008}],
[{o:podloze_ziemia, x:1216, y:3008}],
[{o:szybkaWinda, x:1120, y:3008}],
[{o:kladka, x:1184, y:2528}],
[{o:kladka, x:960, y:2464}],
[{o:kladka, x:1088, y:2336}],
[{o:klocek, x:1184, y:2272}],
[{o:klocek, x:1216, y:2272}],
[{o:klocek, x:1248, y:2272}],
[{o:klocek, x:1280, y:2304}],
[{o:klocek, x:1312, y:2304}],
[{o:klocek, x:1344, y:2304}],
[{o:klocek, x:1376, y:2336}],
[{o:klocek, x:1408, y:2336}],
[{o:klocek, x:1440, y:2336}],
[{o:klocek, x:2208, y:2752}],
[{o:klocek, x:2240, y:2752}],
[{o:klocek, x:2272, y:2752}],
[{o:klocek, x:2304, y:2784}],
[{o:klocek, x:2336, y:2784}],
[{o:klocek, x:2368, y:2784}],
[{o:klocek, x:2400, y:2816}],
[{o:klocek, x:2432, y:2816}],
[{o:klocek, x:2464, y:2816}],
[{o:klocek, x:2496, y:2848}],
[{o:klocek, x:2528, y:2848}],
[{o:klocek, x:2560, y:2848}],
[{o:kladka, x:2592, y:2912}],
[{o:kladka, x:2688, y:2784}],
[{o:kladka, x:2752, y:2656}],
[{o:podloze_ziemia, x:2848, y:2528}],
[{o:podloze_ziemia, x:2912, y:2528}],
[{o:podloze_trawa, x:2976, y:2528}],
[{o:podloze_trawa, x:3008, y:2528}],
[{o:podloze_trawa, x:3040, y:2528}],
[{o:podloze_trawa, x:3072, y:2528}],
[{o:podloze_trawa, x:3104, y:2528}],
[{o:podloze_trawa, x:3136, y:2528}],
[{o:podloze_trawa, x:3168, y:2528}],
[{o:szybkaWinda, x:1472, y:2400}],
[{o:kladka, x:1536, y:1888}],
[{o:kladka, x:1600, y:1920}],
[{o:podloze_ziemia, x:1664, y:1696}],
[{o:podloze_ziemia, x:1696, y:1760}],
[{o:podloze_trawa, x:1728, y:1760}],
[{o:podloze_trawa, x:1760, y:1760}],
[{o:podloze_trawa, x:1792, y:1760}],
[{o:podloze_trawa, x:3168, y:2496}],
[{o:podloze_trawa, x:3168, y:2448}],
[{o:podloze_ziemia, x:3168, y:2480}],
[{o:podloze_ziemia, x:3184, y:2480}],
[{o:podloze_ziemia, x:3088, y:2400}],
[{o:podloze_ziemia, x:3072, y:2400}],
[{o:podloze_ziemia, x:3136, y:2512}],
[{o:podloze_ziemia, x:3152, y:2512}],
[{o:skrzydla, x:3072, y:2240}],
[{o:skrzydla, x:1856, y:1664}],
[{o:podloze_trawa, x:0, y:3168}],
[{o:podloze_trawa, x:32, y:3168}],
[{o:podloze_trawa, x:64, y:3168}],
[{o:podloze_trawa, x:96, y:3168}],
[{o:podloze_trawa, x:96, y:3136}],
[{o:podloze_trawa, x:96, y:3104}],
[{o:podloze_trawa, x:96, y:3072}],
[{o:podloze_trawa, x:64, y:3072}],
[{o:podloze_trawa, x:32, y:3072}],
[{o:podloze_trawa, x:0, y:3072}],
[{o:podloze_trawa, x:0, y:3104}],
[{o:podloze_trawa, x:0, y:3136}],
[{o:podloze_trawa, x:128, y:3072}],
[{o:podloze_trawa, x:0, y:3040}],
[{o:podloze_trawa, x:0, y:3008}],
[{o:podloze_trawa, x:0, y:2432}],
[{o:podloze_trawa, x:0, y:1888}],
[{o:podloze_trawa, x:0, y:1792}],
[{o:podloze_trawa, x:0, y:1728}],
[{o:podloze_trawa, x:0, y:1696}],
[{o:podloze_trawa, x:32, y:1696}],
[{o:podloze_trawa, x:0, y:1760}],
[{o:podloze_trawa, x:64, y:1696}],
[{o:podloze_trawa, x:96, y:1696}],
[{o:podloze_trawa, x:128, y:1696}],
[{o:podloze_trawa, x:128, y:1728}],
[{o:podloze_trawa, x:128, y:1760}],
[{o:podloze_trawa, x:128, y:1792}],
[{o:podloze_trawa, x:160, y:1792}],
[{o:podloze_trawa, x:192, y:1792}],
[{o:podloze_trawa, x:224, y:1792}],
[{o:podloze_trawa, x:256, y:1792}],
[{o:podloze_trawa, x:288, y:1792}],
[{o:podloze_trawa, x:320, y:1792}],
[{o:podloze_trawa, x:320, y:1600}],
[{o:podloze_trawa, x:320, y:1568}],
[{o:podloze_trawa, x:352, y:1568}],
[{o:podloze_trawa, x:384, y:1568}],
[{o:podloze_trawa, x:416, y:1568}],
[{o:podloze_trawa, x:416, y:1536}],
[{o:podloze_trawa, x:416, y:1504}],
[{o:podloze_trawa, x:416, y:1472}],
[{o:podloze_trawa, x:448, y:1472}],
[{o:podloze_trawa, x:480, y:1472}],
[{o:podloze_trawa, x:480, y:1440}],
[{o:podloze_trawa, x:480, y:1408}],
[{o:podloze_trawa, x:512, y:1408}],
[{o:podloze_trawa, x:544, y:1408}],
[{o:podloze_trawa, x:544, y:1376}],
[{o:podloze_trawa, x:544, y:1344}],
[{o:klocek, x:320, y:1760}],
[{o:klocek, x:320, y:1728}],
[{o:klocek, x:320, y:1696}],
[{o:klocek, x:320, y:1664}],
[{o:klocek, x:320, y:1632}],
[{o:klocek, x:800, y:1952}],
[{o:klocek, x:864, y:1664}],
[{o:klocek, x:544, y:1248}],
[{o:klocek, x:608, y:1216}],
[{o:klocek, x:480, y:1216}],
[{o:klocek, x:480, y:1152}],
[{o:klocek, x:608, y:1152}],
[{o:klocek, x:544, y:1120}],
[{o:podloze_trawa, x:0, y:992}],
[{o:podloze_trawa, x:0, y:1024}],
[{o:podloze_trawa, x:0, y:1056}],
[{o:podloze_trawa, x:0, y:1088}],
[{o:podloze_trawa, x:0, y:1120}],
[{o:podloze_trawa, x:0, y:1152}],
[{o:podloze_trawa, x:0, y:1184}],
[{o:podloze_trawa, x:0, y:1216}],
[{o:podloze_trawa, x:0, y:1248}],
[{o:podloze_trawa, x:0, y:1280}],
[{o:podloze_trawa, x:32, y:1280}],
[{o:podloze_trawa, x:64, y:1280}],
[{o:podloze_trawa, x:96, y:1280}],
[{o:podloze_trawa, x:128, y:1280}],
[{o:podloze_trawa, x:160, y:1280}],
[{o:podloze_trawa, x:192, y:1280}],
[{o:podloze_trawa, x:0, y:1312}],
[{o:podloze_trawa, x:0, y:1344}],
[{o:podloze_trawa, x:0, y:1376}],
[{o:podloze_trawa, x:576, y:1376}],
[{o:podloze_trawa, x:512, y:1472}],
[{o:podloze_trawa, x:544, y:1472}],
[{o:podloze_trawa, x:576, y:1472}],
[{o:podloze_trawa, x:608, y:1472}],
[{o:podloze_trawa, x:608, y:1504}],
[{o:podloze_trawa, x:640, y:1504}],
[{o:podloze_trawa, x:672, y:1504}],
[{o:podloze_trawa, x:704, y:1504}],
[{o:podloze_trawa, x:736, y:1504}],
[{o:podloze_trawa, x:736, y:1472}],
[{o:podloze_trawa, x:768, y:1472}],
[{o:podloze_trawa, x:800, y:1472}],
[{o:podloze_trawa, x:800, y:1440}],
[{o:podloze_trawa, x:832, y:1440}],
[{o:podloze_trawa, x:832, y:1408}],
[{o:podloze_trawa, x:896, y:1408}],
[{o:podloze_trawa, x:864, y:1408}],
[{o:podloze_trawa, x:896, y:1376}],
[{o:podloze_trawa, x:896, y:1344}],
[{o:podloze_trawa, x:896, y:1312}],
[{o:podloze_trawa, x:896, y:1280}],
[{o:podloze_trawa, x:896, y:992}],
[{o:podloze_trawa, x:896, y:960}],
[{o:podloze_trawa, x:864, y:960}],
[{o:podloze_trawa, x:832, y:960}],
[{o:podloze_trawa, x:832, y:992}],
[{o:podloze_trawa, x:896, y:928}],
[{o:podloze_trawa, x:896, y:896}],
[{o:podloze_trawa, x:896, y:864}],
[{o:podloze_trawa, x:928, y:864}],
[{o:podloze_trawa, x:960, y:864}],
[{o:podloze_trawa, x:992, y:864}],
[{o:podloze_trawa, x:1024, y:864}],
[{o:podloze_trawa, x:1056, y:864}],
[{o:podloze_trawa, x:1056, y:896}],
[{o:podloze_trawa, x:1056, y:928}],
[{o:podloze_trawa, x:1056, y:960}],
[{o:podloze_trawa, x:1056, y:992}],
[{o:podloze_trawa, x:1088, y:960}],
[{o:podloze_trawa, x:1120, y:960}],
[{o:podloze_trawa, x:1120, y:992}],
[{o:podloze_trawa, x:960, y:832}],
[{o:podloze_trawa, x:960, y:800}],
[{o:podloze_trawa, x:960, y:768}],
[{o:podloze_trawa, x:960, y:736}],
[{o:podloze_trawa, x:960, y:704}],
[{o:podloze_trawa, x:992, y:704}],
[{o:podloze_trawa, x:1024, y:704}],
[{o:podloze_trawa, x:1056, y:704}],
[{o:podloze_trawa, x:1088, y:704}],
[{o:podloze_trawa, x:1120, y:704}],
[{o:podloze_trawa, x:1152, y:704}],
[{o:podloze_trawa, x:1184, y:704}],
[{o:podloze_trawa, x:1184, y:736}],
[{o:podloze_trawa, x:1216, y:736}],
[{o:podloze_trawa, x:1248, y:736}],
[{o:podloze_trawa, x:1280, y:736}],
[{o:podloze_trawa, x:1280, y:768}],
[{o:podloze_trawa, x:1280, y:800}],
[{o:podloze_trawa, x:1312, y:800}],
[{o:podloze_trawa, x:1344, y:800}],
[{o:podloze_trawa, x:1376, y:800}],
[{o:podloze_trawa, x:1376, y:832}],
[{o:podloze_trawa, x:1408, y:832}],
[{o:podloze_trawa, x:1440, y:832}],
[{o:podloze_trawa, x:1472, y:832}],
[{o:podloze_trawa, x:1472, y:864}],
[{o:podloze_trawa, x:1472, y:896}],
[{o:podloze_trawa, x:1504, y:896}],
[{o:podloze_trawa, x:1536, y:896}],
[{o:podloze_trawa, x:1536, y:928}],
[{o:podloze_trawa, x:1568, y:928}],
[{o:podloze_trawa, x:1600, y:928}],
[{o:podloze_trawa, x:1632, y:928}],
[{o:podloze_trawa, x:1664, y:928}],
[{o:podloze_trawa, x:1664, y:960}],
[{o:podloze_trawa, x:1696, y:960}],
[{o:podloze_trawa, x:1728, y:960}],
[{o:podloze_trawa, x:1760, y:960}],
[{o:podloze_trawa, x:1792, y:960}],
[{o:podloze_trawa, x:1792, y:992}],
[{o:podloze_trawa, x:1792, y:1024}],
[{o:podloze_trawa, x:1984, y:1024}],
[{o:podloze_trawa, x:1984, y:992}],
[{o:podloze_trawa, x:1984, y:960}],
[{o:podloze_trawa, x:2016, y:960}],
[{o:podloze_trawa, x:2048, y:960}],
[{o:podloze_trawa, x:2080, y:960}],
[{o:podloze_trawa, x:2080, y:928}],
[{o:podloze_trawa, x:2080, y:896}],
[{o:podloze_trawa, x:2112, y:896}],
[{o:podloze_trawa, x:2144, y:896}],
[{o:podloze_trawa, x:2176, y:896}],
[{o:podloze_trawa, x:2208, y:896}],
[{o:podloze_trawa, x:2240, y:896}],
[{o:podloze_trawa, x:2272, y:896}],
[{o:podloze_trawa, x:2304, y:896}],
[{o:podloze_trawa, x:2304, y:928}],
[{o:podloze_trawa, x:2336, y:928}],
[{o:podloze_trawa, x:2368, y:928}],
[{o:podloze_trawa, x:2400, y:928}],
[{o:podloze_trawa, x:2432, y:928}],
[{o:podloze_trawa, x:2432, y:960}],
[{o:podloze_trawa, x:2464, y:960}],
[{o:podloze_trawa, x:2496, y:960}],
[{o:podloze_trawa, x:2496, y:992}],
[{o:podloze_trawa, x:2528, y:992}],
[{o:podloze_trawa, x:2560, y:992}],
[{o:podloze_trawa, x:2592, y:992}],
[{o:podloze_trawa, x:2816, y:992}],
[{o:podloze_trawa, x:2848, y:992}],
[{o:podloze_trawa, x:2880, y:992}],
[{o:podloze_trawa, x:2912, y:992}],
[{o:podloze_trawa, x:2944, y:992}],
[{o:podloze_trawa, x:2976, y:992}],
[{o:podloze_trawa, x:3040, y:992}],
[{o:podloze_trawa, x:3008, y:992}],
[{o:podloze_trawa, x:3072, y:992}],
[{o:podloze_trawa, x:3104, y:992}],
[{o:podloze_trawa, x:3104, y:960}],
[{o:podloze_trawa, x:3104, y:928}],
[{o:podloze_trawa, x:3136, y:928}],
[{o:podloze_trawa, x:3168, y:928}],
[{o:podloze_trawa, x:0, y:960}],
[{o:podloze_trawa, x:0, y:928}],
[{o:podloze_trawa, x:0, y:896}],
[{o:podloze_trawa, x:0, y:864}],
[{o:podloze_trawa, x:0, y:832}],
[{o:podloze_trawa, x:128, y:160}],
[{o:podloze_trawa, x:160, y:160}],
[{o:podloze_trawa, x:192, y:160}],
[{o:podloze_trawa, x:224, y:160}],
[{o:podloze_trawa, x:256, y:160}],
[{o:podloze_trawa, x:288, y:160}],
[{o:podloze_trawa, x:192, y:224}],
[{o:podloze_trawa, x:224, y:224}],
[{o:podloze_trawa, x:256, y:224}],
[{o:podloze_trawa, x:288, y:224}],
[{o:podloze_trawa, x:320, y:224}],
[{o:podloze_trawa, x:320, y:160}],
[{o:podloze_trawa, x:352, y:224}],
[{o:podloze_trawa, x:288, y:288}],
[{o:podloze_trawa, x:320, y:288}],
[{o:podloze_trawa, x:352, y:288}],
[{o:podloze_trawa, x:384, y:288}],
[{o:podloze_trawa, x:480, y:256}],
[{o:podloze_trawa, x:512, y:256}],
[{o:podloze_trawa, x:512, y:224}],
[{o:podloze_trawa, x:544, y:256}],
[{o:podloze_trawa, x:512, y:192}],
[{o:podloze_trawa, x:512, y:160}],
[{o:podloze_trawa, x:512, y:128}],
[{o:podloze_trawa, x:512, y:96}],
[{o:podloze_trawa, x:672, y:224}],
[{o:podloze_trawa, x:704, y:224}],
[{o:podloze_trawa, x:736, y:224}],
[{o:podloze_trawa, x:768, y:224}],
[{o:podloze_trawa, x:640, y:288}],
[{o:podloze_trawa, x:672, y:288}],
[{o:podloze_trawa, x:704, y:288}],
[{o:podloze_trawa, x:736, y:288}],
[{o:podloze_trawa, x:704, y:160}],
[{o:podloze_trawa, x:736, y:160}],
[{o:podloze_trawa, x:768, y:160}],
[{o:podloze_trawa, x:800, y:224}],
[{o:podloze_trawa, x:832, y:224}],
[{o:podloze_trawa, x:800, y:160}],
[{o:podloze_trawa, x:832, y:160}],
[{o:podloze_trawa, x:864, y:160}],
[{o:podloze_trawa, x:896, y:160}],
[{o:podloze_trawa, x:480, y:224}],
[{o:podloze_trawa, x:544, y:224}],
[{o:podloze_trawa, x:544, y:224}],
[{o:podloze_skos_prawy, x:544, y:192}],
[{o:podloze_skos_prawy, x:560, y:208}],
[{o:podloze_skos_lewy, x:480, y:208}],
[{o:podloze_skos_lewy, x:496, y:192}],
[{o:podloze_ziemia, x:496, y:208}],
[{o:podloze_ziemia, x:544, y:208}],
[{o:podloze_skos_prawy, x:544, y:112}],
[{o:podloze_skos_prawy, x:352, y:160}],
[{o:podloze_skos_lewy, x:688, y:160}],
[{o:podloze_skos_lewy, x:672, y:176}],
[{o:podloze_skos_prawy, x:368, y:176}],
[{o:podloze_skos_prawy, x:384, y:224}],
[{o:podloze_skos_prawy, x:400, y:240}],
[{o:podloze_skos_prawy, x:416, y:288}],
[{o:podloze_skos_prawy, x:432, y:304}],
[{o:podloze_skos_lewy, x:656, y:224}],
[{o:podloze_skos_lewy, x:640, y:240}],
[{o:podloze_skos_lewy, x:624, y:288}],
[{o:podloze_skos_lewy, x:608, y:304}],
[{o:podloze_ziemia, x:352, y:176}],
[{o:podloze_ziemia, x:384, y:240}],
[{o:podloze_ziemia, x:416, y:304}],
[{o:podloze_ziemia, x:624, y:304}],
[{o:podloze_ziemia, x:656, y:240}],
[{o:podloze_ziemia, x:688, y:176}],
[{o:podloze_trawa, x:512, y:288}],
[{o:podloze_trawa, x:512, y:320}],
[{o:podloze_trawa, x:544, y:288}],
[{o:podloze_trawa, x:480, y:288}],
[{o:podloze_trawa, x:544, y:320}],
[{o:podloze_trawa, x:480, y:320}],
[{o:podloze_ziemia, x:544, y:352}],
[{o:podloze_ziemia, x:544, y:368}],
[{o:podloze_ziemia, x:496, y:352}],
[{o:podloze_ziemia, x:496, y:368}],
[{o:podloze_ziemia, x:496, y:384}],
[{o:podloze_ziemia, x:496, y:400}],
[{o:podloze_ziemia, x:544, y:384}],
[{o:podloze_ziemia, x:544, y:400}],
[{o:podloze_ziemia, x:512, y:480}],
[{o:podloze_ziemia, x:512, y:464}],
[{o:podloze_ziemia, x:528, y:464}],
[{o:podloze_ziemia, x:544, y:464}],
[{o:podloze_ziemia, x:496, y:464}],
[{o:podloze_ziemia, x:560, y:480}],
[{o:podloze_ziemia, x:480, y:480}],
[{o:podloze_ziemia, x:464, y:496}],
[{o:podloze_ziemia, x:576, y:496}],
[{o:podloze_ziemia, x:576, y:512}],
[{o:podloze_ziemia, x:464, y:512}],
[{o:podloze_ziemia, x:464, y:528}],
[{o:podloze_ziemia, x:576, y:528}],
[{o:podloze_ziemia, x:576, y:544}],
[{o:podloze_ziemia, x:464, y:544}],
[{o:podloze_ziemia, x:480, y:560}],
[{o:podloze_ziemia, x:496, y:576}],
[{o:podloze_ziemia, x:512, y:576}],
[{o:podloze_ziemia, x:528, y:576}],
[{o:podloze_ziemia, x:544, y:576}],
[{o:podloze_ziemia, x:560, y:560}],
[{o:skrzydla, x:3136, y:960}],
[{o:rozwalacz, x:224, y:1728}],
[{o:pistolet, x:32, y:1632}],
[{o:bonus, x:96, y:1600}],
[{o:bonus, x:160, y:1600}],
[{o:bonus, x:224, y:1600}],
[{o:bonus, x:224, y:1664}],
[{o:bonus, x:896, y:1216}],
[{o:bonus, x:992, y:1216}],
[{o:bonus, x:1088, y:1216}],
[{o:bonus, x:1184, y:1216}],
[{o:klocek, x:1120, y:1312}],
[{o:skrzydla, x:992, y:736}],
[{o:kalasz, x:960, y:640}],
[{o:podloze_trawa, x:1152, y:384}],
[{o:podloze_trawa, x:1184, y:384}],
[{o:podloze_trawa, x:1216, y:384}],
[{o:podloze_trawa, x:1248, y:384}],
[{o:podloze_trawa, x:1280, y:384}],
[{o:podloze_trawa, x:1312, y:384}],
[{o:podloze_trawa, x:1344, y:384}],
[{o:podloze_trawa, x:1376, y:384}],
[{o:podloze_trawa, x:1408, y:384}],
[{o:podloze_trawa, x:1440, y:384}],
[{o:podloze_trawa, x:736, y:512}],
[{o:podloze_trawa, x:800, y:512}],
[{o:podloze_trawa, x:768, y:512}],
[{o:podloze_trawa, x:832, y:512}],
[{o:podloze_trawa, x:864, y:512}],
[{o:podloze_trawa, x:896, y:512}],
[{o:podloze_trawa, x:1696, y:192}],
[{o:podloze_trawa, x:1728, y:192}],
[{o:podloze_trawa, x:1760, y:192}],
[{o:podloze_trawa, x:1792, y:192}],
[{o:podloze_trawa, x:1664, y:192}],
[{o:podloze_trawa, x:1824, y:192}],
[{o:podloze_trawa, x:1856, y:192}],
[{o:podloze_trawa, x:1888, y:192}],
[{o:podloze_trawa, x:1920, y:192}],
[{o:podloze_trawa, x:1952, y:192}],
[{o:podloze_trawa, x:1984, y:192}],
[{o:podloze_trawa, x:2016, y:192}],
[{o:podloze_trawa, x:2048, y:192}],
[{o:podloze_trawa, x:2080, y:192}],
[{o:podloze_trawa, x:2112, y:192}],
[{o:podloze_trawa, x:2144, y:192}],
[{o:podloze_trawa, x:2176, y:192}],
[{o:podloze_trawa, x:2208, y:192}],
[{o:podloze_trawa, x:2240, y:192}],
[{o:podloze_trawa, x:2272, y:192}],
[{o:podloze_trawa, x:2464, y:224}],
[{o:podloze_trawa, x:2432, y:224}],
[{o:podloze_trawa, x:2400, y:224}],
[{o:podloze_trawa, x:2368, y:224}],
[{o:podloze_trawa, x:2336, y:224}],
[{o:podloze_trawa, x:2304, y:224}],
[{o:podloze_trawa, x:2272, y:224}],
[{o:podloze_trawa, x:2464, y:448}],
[{o:podloze_trawa, x:2496, y:448}],
[{o:podloze_trawa, x:2528, y:448}],
[{o:podloze_trawa, x:2560, y:448}],
[{o:podloze_trawa, x:2592, y:448}],
[{o:podloze_trawa, x:2624, y:448}],
[{o:podloze_trawa, x:2656, y:448}],
[{o:podloze_trawa, x:2432, y:448}],
[{o:podloze_trawa, x:2400, y:448}],
[{o:granat, x:1664, y:128}],
[{o:granat, x:1728, y:96}],
[{o:granat, x:1792, y:128}],
[{o:skrzydla, x:1728, y:32}],
[{o:blueBoss, x:1920, y:32}],
[{o:blueBoss, x:1600, y:576}],
[{o:blueBoss, x:768, y:384}],
[{o:redBoss, x:1280, y:224}],
[{o:pistolet, x:3072, y:2144}],
[{o:pistolet, x:1856, y:1568}],
[{o:kalasz, x:2240, y:672}],
[{o:kalasz, x:672, y:1056}],
[{o:kalasz, x:544, y:992}],
[{o:skrzydla, x:832, y:896}],
[{o:granatnik, x:352, y:384}],
[{o:granat, x:512, y:64}],
[{o:pistolet, x:64, y:96}],
[{o:pistolet, x:928, y:96}],
[{o:pistolet, x:64, y:384}],
[{o:podloze_trawa, x:2624, y:1088}],
[{o:podloze_trawa, x:2784, y:1088}],
[{o:podloze_trawa, x:2848, y:1248}],
[{o:podloze_trawa, x:2848, y:1280}],
[{o:podloze_trawa, x:2848, y:1312}],
[{o:podloze_trawa, x:2816, y:1312}],
[{o:podloze_trawa, x:2784, y:1312}],
[{o:podloze_trawa, x:2752, y:1312}],
[{o:podloze_trawa, x:2720, y:1312}],
[{o:podloze_trawa, x:2688, y:1312}],
[{o:podloze_trawa, x:2656, y:1312}],
[{o:podloze_trawa, x:2624, y:1312}],
[{o:podloze_trawa, x:2592, y:1312}],
[{o:podloze_trawa, x:2560, y:1312}],
[{o:podloze_trawa, x:2560, y:1280}],
[{o:podloze_trawa, x:2560, y:1248}],
[{o:podloze_trawa, x:2704, y:1168}],
[{o:podloze_trawa, x:1792, y:1184}],
[{o:podloze_trawa, x:1984, y:1184}],
[{o:podloze_trawa, x:1728, y:1280}],
[{o:podloze_trawa, x:1728, y:1312}],
[{o:podloze_trawa, x:1760, y:1312}],
[{o:podloze_trawa, x:1792, y:1312}],
[{o:podloze_trawa, x:1824, y:1312}],
[{o:podloze_trawa, x:1856, y:1312}],
[{o:podloze_trawa, x:1888, y:1312}],
[{o:podloze_trawa, x:1920, y:1312}],
[{o:podloze_trawa, x:1952, y:1312}],
[{o:podloze_trawa, x:1984, y:1312}],
[{o:podloze_trawa, x:2016, y:1312}],
[{o:podloze_trawa, x:2048, y:1312}],
[{o:podloze_trawa, x:2048, y:1280}],
[{o:podloze_trawa, x:1568, y:704}],
[{o:podloze_trawa, x:1568, y:736}],
[{o:podloze_trawa, x:1600, y:736}],
[{o:podloze_trawa, x:1632, y:736}],
[{o:podloze_trawa, x:1664, y:736}],
[{o:podloze_trawa, x:1696, y:736}],
[{o:podloze_trawa, x:1728, y:736}],
[{o:podloze_trawa, x:1760, y:736}],
[{o:podloze_trawa, x:1792, y:736}],
[{o:podloze_trawa, x:1824, y:736}],
[{o:podloze_trawa, x:1856, y:736}],
[{o:podloze_trawa, x:1888, y:736}],
[{o:podloze_trawa, x:1920, y:736}],
[{o:podloze_trawa, x:1952, y:736}],
[{o:podloze_trawa, x:1984, y:736}],
[{o:podloze_trawa, x:2016, y:736}],
[{o:podloze_trawa, x:2048, y:736}],
[{o:podloze_trawa, x:2080, y:736}],
[{o:podloze_trawa, x:2112, y:736}],
[{o:podloze_trawa, x:2336, y:576}],
[{o:podloze_trawa, x:2304, y:576}],
[{o:podloze_trawa, x:2272, y:576}],
[{o:podloze_trawa, x:2240, y:576}],
[{o:podloze_trawa, x:2880, y:768}],
[{o:podloze_trawa, x:2912, y:768}],
[{o:podloze_trawa, x:2944, y:768}],
[{o:podloze_trawa, x:2976, y:768}],
[{o:podloze_trawa, x:2464, y:736}],
[{o:podloze_trawa, x:2496, y:736}],
[{o:podloze_trawa, x:2528, y:736}],
[{o:podloze_trawa, x:2560, y:736}],
[{o:podloze_trawa, x:1920, y:2880}],
[{o:podloze_trawa, x:1888, y:2880}],
[{o:podloze_trawa, x:1856, y:2880}],
[{o:podloze_trawa, x:1824, y:2880}],
[{o:podloze_trawa, x:1792, y:2880}],
[{o:podloze_trawa, x:1760, y:2880}],
[{o:podloze_trawa, x:1728, y:2880}],
[{o:podloze_trawa, x:1696, y:2880}],
[{o:podloze_trawa, x:1696, y:2720}],
[{o:podloze_trawa, x:1728, y:2720}],
[{o:podloze_trawa, x:1760, y:2720}],
[{o:podloze_trawa, x:1792, y:2720}],
[{o:podloze_trawa, x:1824, y:2720}],
[{o:podloze_trawa, x:1856, y:2720}],
[{o:podloze_trawa, x:1888, y:2720}],
[{o:podloze_trawa, x:1920, y:2720}],
[{o:klocek, x:1952, y:2752}],
[{o:podloze_trawa, x:1664, y:2880}],
[{o:podloze_trawa, x:2688, y:448}],
[{o:podloze_trawa, x:2720, y:448}],
[{o:podloze_trawa, x:2720, y:416}],
[{o:but_do_wziecia, x:192, y:1248}],
[{o:pierscien_do_wziecia, x:2240, y:160}],
[{o:filizanka_do_wziecia, x:896, y:480}],
[{o:kwiatek_do_wziecia, x:544, y:1184}],
[{o:burger_do_wziecia, x:3136, y:64}],
[{o:jablko_do_wziecia, x:1568, y:640}],
[{o:slon_do_wziecia_dup, x:896, y:96}],
[{o:bonus, x:1888, y:3008}],
[{o:bonus, x:1952, y:2944}],
[{o:bonus, x:2208, y:2656}],
[{o:bonus, x:2240, y:2656}],
[{o:bonus, x:2272, y:2656}],
[{o:bonus, x:2400, y:2720}],
[{o:bonus, x:2432, y:2720}],
[{o:bonus, x:2464, y:2720}],
[{o:bonus, x:2912, y:2464}],
[{o:bonus, x:2912, y:2400}],
[{o:bonus, x:2848, y:2400}],
[{o:bonus, x:2848, y:2464}],
[{o:bonus, x:3168, y:2368}],
[{o:bonus, x:3008, y:2432}],
[{o:bonus, x:3072, y:2432}],
[{o:granat, x:3072, y:2336}],
[{o:granat, x:2816, y:928}],
[{o:granat, x:2880, y:928}],
[{o:granat, x:2592, y:928}],
[{o:granat, x:2528, y:928}],
[{o:bonus, x:2592, y:832}],
[{o:bonus, x:2528, y:832}],
[{o:bonus, x:2816, y:832}],
[{o:bonus, x:2880, y:832}],
[{o:skrzydla, x:3040, y:160}],
[{o:klocek, x:2912, y:32}],
[{o:klocek, x:2848, y:96}],
[{o:klocek, x:2944, y:128}],
[{o:klocek, x:2848, y:160}],
[{o:klocek, x:2944, y:224}],
[{o:klocek, x:3040, y:256}],
[{o:klocek, x:3104, y:320}],
[{o:klocek, x:3168, y:384}],
[{o:klocek, x:3104, y:416}],
[{o:klocek, x:3104, y:512}],
[{o:klocek, x:3072, y:608}],
[{o:klocek, x:3040, y:704}],
[{o:klocek, x:2752, y:320}],
[{o:klocek, x:2784, y:224}],
[{o:klocek, x:2816, y:768}],
[{o:klocek, x:2624, y:768}],
[{o:skrzydla, x:352, y:2400}],
[{o:klocek_ciemny, x:2080, y:64}],
[{o:klocek, x:2144, y:64}],
[{o:klocek, x:2208, y:64}],
[{o:bonus, x:2080, y:0}],
[{o:bonus, x:2144, y:0}],
[{o:bonus, x:2208, y:0}],
[{o:klocek_ciemny, x:1824, y:96}],
[{o:klocek, x:0, y:1536}],
[{o:klocek, x:64, y:1536}],
[{o:klocek, x:64, y:1472}],
[{o:klocek, x:0, y:1472}],
[{o:klocek, x:128, y:1504}],
[{o:klocek, x:192, y:1504}],
[{o:klocek, x:128, y:1440}],
[{o:klocek, x:192, y:1440}],
[{o:klocek, x:128, y:800}],
[{o:klocek, x:160, y:832}],
[{o:klocek, x:192, y:864}],
[{o:klocek, x:224, y:896}],
[{o:klocek, x:224, y:768}],
[{o:klocek, x:192, y:736}],
[{o:klocek, x:160, y:704}],
[{o:klocek, x:128, y:672}],
[{o:klocek, x:96, y:768}],
[{o:klocek, x:256, y:800}],
[{o:klocek, x:224, y:640}],
[{o:klocek, x:256, y:672}],
[{o:klocek, x:288, y:704}],
[{o:klocek, x:192, y:608}],
[{o:klocek, x:160, y:576}],
[{o:klocek, x:384, y:800}],
[{o:klocek, x:416, y:800}],
[{o:klocek, x:448, y:768}],
[{o:klocek, x:480, y:768}],
[{o:klocek, x:512, y:736}],
[{o:klocek, x:544, y:736}],
[{o:klocek, x:384, y:928}],
[{o:klocek, x:416, y:928}],
[{o:klocek, x:448, y:896}],
[{o:klocek, x:480, y:896}],
[{o:klocek, x:512, y:864}],
[{o:klocek, x:544, y:864}],
[{o:klocek, x:384, y:1024}],
[{o:klocek, x:416, y:1024}],
[{o:klocek, x:448, y:992}],
[{o:klocek, x:480, y:992}],
[{o:klocek, x:512, y:960}],
[{o:klocek, x:544, y:960}],
[{o:bonus, x:128, y:96}],
[{o:bonus, x:192, y:64}],
[{o:bonus, x:256, y:96}],
[{o:bonus, x:352, y:64}],
[{o:bonus, x:1984, y:2080}],
[{o:bonus, x:1984, y:2112}],
[{o:bonus, x:1984, y:2144}],
[{o:bonus, x:1984, y:2176}],
[{o:bonus, x:1984, y:2208}],
[{o:bonus, x:2016, y:2208}],
[{o:bonus, x:2048, y:2192}],
[{o:bonus, x:2064, y:2160}],
[{o:bonus, x:2064, y:2128}],
[{o:bonus, x:2048, y:2112}],
[{o:bonus, x:2032, y:2096}],
[{o:bonus, x:2008, y:2088}],
[{o:bonus, x:2136, y:2096}],
[{o:bonus, x:2136, y:2128}],
[{o:bonus, x:2136, y:2160}],
[{o:bonus, x:2128, y:2192}],
[{o:bonus, x:2128, y:2216}],
[{o:bonus, x:2224, y:2088}],
[{o:bonus, x:2224, y:2112}],
[{o:bonus, x:2224, y:2144}],
[{o:bonus, x:2224, y:2176}],
[{o:bonus, x:2224, y:2208}],
[{o:bonus, x:2256, y:2208}],
[{o:bonus, x:2280, y:2208}],
[{o:bonus, x:2240, y:2144}],
[{o:bonus, x:2240, y:2088}],
[{o:bonus, x:2256, y:2088}],
[{o:bonus, x:2280, y:2096}],
[{o:bonus, x:2176, y:1024}],
[{o:bonus, x:2240, y:1024}],
[{o:bonus, x:2304, y:1024}],
[{o:bonus, x:2112, y:1024}],
[{o:pistolet, x:2176, y:960}],
[{o:zlozona_dziewczyna, x:2624, y:384}],
[{o:zlozona_dziewczyna, x:2880, y:704}],
[{o:zlozona_dziewczyna, x:2496, y:640}],
[{o:zlozona_dziewczyna, x:2240, y:512}],
[{o:zlozona_dziewczyna, x:1792, y:640}],
[{o:zlozona_dziewczyna, x:1856, y:640}],
[{o:zlozona_dziewczyna, x:1920, y:640}],
[{o:zlozona_dziewczyna, x:1984, y:640}],
[{o:skrzydla, x:2368, y:320}],
[{o:podloze_ziemia, x:2418, y:1662}],
[{o:podloze_ziemia, x:2418, y:1674}],
[{o:podloze_ziemia, x:2416, y:1688}],
[{o:podloze_ziemia, x:2424, y:1704}],
[{o:podloze_ziemia, x:2432, y:1720}],
[{o:podloze_ziemia, x:2440, y:1728}],
[{o:podloze_ziemia, x:2448, y:1720}],
[{o:podloze_ziemia, x:2456, y:1704}],
[{o:podloze_ziemia, x:2464, y:1688}],
[{o:podloze_ziemia, x:2464, y:1672}],
[{o:podloze_ziemia, x:2464, y:1664}],
[{o:podloze_ziemia, x:2528, y:1664}],
[{o:podloze_ziemia, x:2528, y:1680}],
[{o:podloze_ziemia, x:2528, y:1696}],
[{o:podloze_ziemia, x:2528, y:1712}],
[{o:podloze_ziemia, x:2528, y:1720}],
[{o:podloze_ziemia, x:2528, y:1728}],
[{o:podloze_ziemia, x:2544, y:1728}],
[{o:podloze_ziemia, x:2552, y:1728}],
[{o:podloze_ziemia, x:2568, y:1712}],
[{o:podloze_ziemia, x:2568, y:1696}],
[{o:podloze_ziemia, x:2560, y:1680}],
[{o:podloze_ziemia, x:2544, y:1680}],
[{o:podloze_ziemia, x:2520, y:1656}],
[{o:podloze_ziemia, x:2464, y:1648}],
[{o:podloze_ziemia, x:2416, y:1648}],
[{o:podloze_ziemia, x:2520, y:1640}],
[{o:podloze_ziemia, x:2528, y:1640}],
[{o:podloze_ziemia, x:2536, y:1640}],
[{o:podloze_ziemia, x:2544, y:1640}],
[{o:podloze_ziemia, x:2552, y:1656}],
[{o:podloze_ziemia, x:2544, y:1664}],
[{o:podloze_ziemia, x:2624, y:1664}],
[{o:podloze_ziemia, x:2624, y:1696}],
[{o:podloze_ziemia, x:2656, y:1728}],
[{o:podloze_ziemia, x:2624, y:1680}],
[{o:podloze_ziemia, x:2632, y:1712}],
[{o:podloze_ziemia, x:2640, y:1720}],
[{o:podloze_ziemia, x:2664, y:1712}],
[{o:podloze_ziemia, x:2672, y:1688}],
[{o:podloze_ziemia, x:2664, y:1672}],
[{o:podloze_ziemia, x:2664, y:1664}],
[{o:podloze_ziemia, x:2656, y:1648}],
[{o:podloze_ziemia, x:2648, y:1640}],
[{o:podloze_ziemia, x:2640, y:1640}],
[{o:podloze_ziemia, x:2632, y:1656}],
[{o:podloze_ziemia, x:2704, y:1640}],
[{o:podloze_ziemia, x:2704, y:1648}],
[{o:podloze_ziemia, x:2712, y:1664}],
[{o:podloze_ziemia, x:2720, y:1672}],
[{o:podloze_ziemia, x:2736, y:1664}],
[{o:podloze_ziemia, x:2736, y:1648}],
[{o:podloze_ziemia, x:2744, y:1640}],
[{o:podloze_ziemia, x:2720, y:1688}],
[{o:podloze_ziemia, x:2720, y:1696}],
[{o:podloze_ziemia, x:2720, y:1704}],
[{o:podloze_ziemia, x:2720, y:1712}],
[{o:podloze_ziemia, x:2432, y:1864}],
[{o:podloze_ziemia, x:2432, y:1848}],
[{o:podloze_ziemia, x:2432, y:1840}],
[{o:podloze_ziemia, x:2432, y:1824}],
[{o:podloze_ziemia, x:2432, y:1808}],
[{o:podloze_ziemia, x:2432, y:1800}],
[{o:podloze_ziemia, x:2448, y:1816}],
[{o:podloze_ziemia, x:2464, y:1832}],
[{o:podloze_ziemia, x:2472, y:1824}],
[{o:podloze_ziemia, x:2488, y:1808}],
[{o:podloze_ziemia, x:2496, y:1800}],
[{o:podloze_ziemia, x:2496, y:1816}],
[{o:podloze_ziemia, x:2496, y:1832}],
[{o:podloze_ziemia, x:2504, y:1848}],
[{o:podloze_ziemia, x:2496, y:1856}],
[{o:podloze_ziemia, x:2496, y:1864}],
[{o:podloze_ziemia, x:2544, y:1800}],
[{o:podloze_ziemia, x:2544, y:1816}],
[{o:podloze_ziemia, x:2544, y:1832}],
[{o:podloze_ziemia, x:2544, y:1848}],
[{o:podloze_ziemia, x:2552, y:1856}],
[{o:podloze_ziemia, x:2568, y:1864}],
[{o:podloze_ziemia, x:2584, y:1864}],
[{o:podloze_ziemia, x:2600, y:1848}],
[{o:podloze_ziemia, x:2600, y:1832}],
[{o:podloze_ziemia, x:2600, y:1816}],
[{o:podloze_ziemia, x:2600, y:1800}],
[{o:podloze_ziemia, x:2672, y:1792}],
[{o:podloze_ziemia, x:2664, y:1792}],
[{o:podloze_ziemia, x:2648, y:1800}],
[{o:podloze_ziemia, x:2640, y:1816}],
[{o:podloze_ziemia, x:2648, y:1824}],
[{o:podloze_ziemia, x:2664, y:1832}],
[{o:podloze_ziemia, x:2680, y:1832}],
[{o:podloze_ziemia, x:2688, y:1840}],
[{o:podloze_ziemia, x:2688, y:1856}],
[{o:podloze_ziemia, x:2680, y:1872}],
[{o:podloze_ziemia, x:2664, y:1872}],
[{o:podloze_ziemia, x:2648, y:1864}],
[{o:podloze_ziemia, x:2656, y:1872}],
[{o:podloze_ziemia, x:2728, y:1792}],
[{o:podloze_ziemia, x:2744, y:1792}],
[{o:podloze_ziemia, x:2760, y:1792}],
[{o:podloze_ziemia, x:2776, y:1792}],
[{o:podloze_ziemia, x:2752, y:1808}],
[{o:podloze_ziemia, x:2752, y:1824}],
[{o:podloze_ziemia, x:2752, y:1840}],
[{o:podloze_ziemia, x:2752, y:1856}],
[{o:podloze_ziemia, x:2752, y:1864}],
[{o:podloze_ziemia, x:2512, y:1944}],
[{o:podloze_ziemia, x:2512, y:1952}],
[{o:podloze_ziemia, x:2512, y:1968}],
[{o:podloze_ziemia, x:2520, y:1984}],
[{o:podloze_ziemia, x:2512, y:2000}],
[{o:podloze_ziemia, x:2512, y:2016}],
[{o:podloze_ziemia, x:2520, y:2016}],
[{o:podloze_ziemia, x:2528, y:2016}],
[{o:podloze_ziemia, x:2544, y:2016}],
[{o:podloze_ziemia, x:2560, y:2008}],
[{o:podloze_ziemia, x:2568, y:1992}],
[{o:podloze_ziemia, x:2568, y:1968}],
[{o:podloze_ziemia, x:2568, y:1976}],
[{o:podloze_ziemia, x:2560, y:1952}],
[{o:podloze_ziemia, x:2552, y:1936}],
[{o:podloze_ziemia, x:2536, y:1928}],
[{o:podloze_ziemia, x:2520, y:1928}],
[{o:podloze_ziemia, x:2512, y:1928}],
[{o:podloze_ziemia, x:2608, y:1928}],
[{o:podloze_ziemia, x:2608, y:1944}],
[{o:podloze_ziemia, x:2608, y:1968}],
[{o:podloze_ziemia, x:2608, y:1960}],
[{o:podloze_ziemia, x:2608, y:1984}],
[{o:podloze_ziemia, x:2608, y:2000}],
[{o:podloze_ziemia, x:2608, y:2008}],
[{o:podloze_ziemia, x:2648, y:1928}],
[{o:podloze_ziemia, x:2648, y:1944}],
[{o:podloze_ziemia, x:2648, y:1960}],
[{o:podloze_ziemia, x:2648, y:1976}],
[{o:podloze_ziemia, x:2648, y:1992}],
[{o:podloze_ziemia, x:2648, y:2008}],
[{o:podloze_ziemia, x:2648, y:2016}],
[{o:podloze_ziemia, x:2664, y:2016}],
[{o:podloze_ziemia, x:2680, y:2024}],
[{o:podloze_ziemia, x:2680, y:2016}],
[{o:podloze_ziemia, x:2696, y:2016}],
[{o:podloze_ziemia, x:2664, y:1968}],
[{o:podloze_ziemia, x:2672, y:1968}],
[{o:podloze_ziemia, x:2664, y:1928}],
[{o:podloze_ziemia, x:2680, y:1928}],
[{o:podloze_ziemia, x:2696, y:1928}],
[{o:podloze_ziemia, x:2752, y:1920}],
[{o:podloze_ziemia, x:2752, y:1936}],
[{o:podloze_ziemia, x:2752, y:1952}],
[{o:podloze_ziemia, x:2752, y:1968}],
[{o:podloze_ziemia, x:2752, y:2008}],
[{o:podloze_ziemia, x:2672, y:1696}],
[{o:podloze_trawa, x:2656, y:128}],
[{o:podloze_trawa, x:2688, y:128}],
[{o:podloze_trawa, x:2720, y:128}],
[{o:podloze_trawa, x:2624, y:128}],
[{o:kot_do_wziecia, x:2656, y:96}],
[{o:skrzydla, x:192, y:384}],
[{o:rozwalacz, x:512, y:512}],
[{o:rozwalacz, x:512, y:544}]];
this.start = function() {
__room_start__(this, Etap_7_duzy, 3200, 3200, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);


co_wymagane=[
'kot',
'pierścień',
'but',
'filizanka',
'kwiat',
'burg',
'jablko',
'slon',
];

};
}
var Etap_7_duzy = new __Etap_7_duzy();
tu_scenes.push(Etap_7_duzy);
function __bossFight() { 
this.tiles = [
[1000000,
[paniD,
[512,128,128,128,1472,0],
[512,128,128,128,1344,0],
[512,128,128,128,1216,0],
[512,128,128,128,1088,0],
[512,128,128,128,960,0],
[512,128,128,128,832,0],
[512,128,128,128,704,0],
[512,256,128,128,1472,128],
[512,256,128,128,1344,128],
[512,256,128,128,1216,128],
[512,256,128,128,1088,128],
[512,256,128,128,960,128],
[512,256,128,128,832,128],
[512,256,128,128,704,128],
[512,384,128,128,1472,256],
[512,384,128,128,1344,256],
[512,384,128,128,1216,256],
[512,384,128,128,1088,256],
[512,384,128,128,960,256],
[512,384,128,128,832,256],
[512,384,128,128,704,256],
[0,256,128,128,1088,1344],
[128,256,128,128,1216,1344],
[0,384,128,128,1088,1472],
[128,384,128,128,1216,1472]]]];
this.objects = [
[{o:podloze_trawa, x:672, y:0}],
[{o:podloze_trawa, x:672, y:32}],
[{o:podloze_trawa, x:672, y:64}],
[{o:podloze_trawa, x:672, y:96}],
[{o:podloze_trawa, x:672, y:128}],
[{o:podloze_trawa, x:672, y:160}],
[{o:podloze_trawa, x:672, y:192}],
[{o:podloze_trawa, x:672, y:224}],
[{o:podloze_trawa, x:672, y:256}],
[{o:podloze_trawa, x:672, y:288}],
[{o:podloze_trawa, x:672, y:320}],
[{o:podloze_trawa, x:672, y:352}],
[{o:podloze_trawa, x:704, y:352}],
[{o:podloze_trawa, x:736, y:352}],
[{o:podloze_trawa, x:768, y:352}],
[{o:podloze_trawa, x:800, y:352}],
[{o:podloze_trawa, x:832, y:352}],
[{o:podloze_trawa, x:864, y:352}],
[{o:podloze_trawa, x:896, y:352}],
[{o:podloze_trawa, x:928, y:352}],
[{o:podloze_trawa, x:960, y:352}],
[{o:podloze_trawa, x:992, y:352}],
[{o:podloze_trawa, x:1024, y:352}],
[{o:podloze_trawa, x:1056, y:352}],
[{o:podloze_trawa, x:1088, y:352}],
[{o:podloze_trawa, x:1120, y:352}],
[{o:podloze_trawa, x:1280, y:352}],
[{o:podloze_trawa, x:1312, y:352}],
[{o:podloze_trawa, x:1344, y:352}],
[{o:podloze_trawa, x:1376, y:352}],
[{o:podloze_trawa, x:1408, y:352}],
[{o:podloze_trawa, x:1440, y:352}],
[{o:podloze_trawa, x:1472, y:352}],
[{o:podloze_trawa, x:1504, y:352}],
[{o:podloze_trawa, x:1536, y:352}],
[{o:podloze_trawa, x:1568, y:352}],
[{o:podloze_ziemia, x:1312, y:288}],
[{o:podloze_ziemia, x:1120, y:288}],
[{o:podloze_ziemia, x:1088, y:288}],
[{o:podloze_ziemia, x:1408, y:320}],
[{o:podloze_ziemia, x:1440, y:320}],
[{o:podloze_ziemia, x:1024, y:320}],
[{o:podloze_ziemia, x:992, y:320}],
[{o:podloze_trawa, x:160, y:0}],
[{o:podloze_trawa, x:160, y:32}],
[{o:podloze_trawa, x:160, y:64}],
[{o:podloze_trawa, x:160, y:96}],
[{o:podloze_trawa, x:160, y:128}],
[{o:podloze_trawa, x:160, y:160}],
[{o:podloze_trawa, x:160, y:224}],
[{o:podloze_trawa, x:160, y:192}],
[{o:podloze_trawa, x:0, y:1568}],
[{o:klocek, x:32, y:1536}],
[{o:klocek, x:64, y:1536}],
[{o:klocek, x:96, y:1536}],
[{o:klocek, x:128, y:1536}],
[{o:klocek, x:64, y:1504}],
[{o:klocek, x:96, y:1504}],
[{o:klocek, x:128, y:1504}],
[{o:klocek, x:96, y:1472}],
[{o:klocek, x:32, y:1472}],
[{o:klocek, x:64, y:1472}],
[{o:klocek, x:32, y:1504}],
[{o:klocek, x:0, y:1504}],
[{o:klocek, x:0, y:1536}],
[{o:klocek, x:160, y:1536}],
[{o:klocek, x:160, y:1504}],
[{o:klocek, x:128, y:1472}],
[{o:klocek, x:64, y:1440}],
[{o:klocek, x:96, y:1440}],
[{o:podloze_ziemia, x:160, y:1408}],
[{o:podloze_ziemia, x:192, y:1408}],
[{o:podloze_ziemia, x:224, y:1440}],
[{o:podloze_ziemia, x:256, y:1440}],
[{o:podloze_ziemia, x:192, y:1536}],
[{o:podloze_ziemia, x:224, y:1536}],
[{o:podloze_ziemia, x:256, y:1536}],
[{o:podloze_ziemia, x:288, y:1568}],
[{o:podloze_ziemia, x:320, y:1568}],
[{o:podloze_trawa, x:352, y:1568}],
[{o:podloze_trawa, x:384, y:1568}],
[{o:podloze_trawa, x:416, y:1568}],
[{o:podloze_skos_lewy, x:448, y:1440}],
[{o:podloze_skos_lewy, x:464, y:1424}],
[{o:podloze_skos_lewy, x:480, y:1408}],
[{o:podloze_skos_lewy, x:496, y:1392}],
[{o:podloze_skos_prawy, x:512, y:1392}],
[{o:podloze_skos_prawy, x:528, y:1408}],
[{o:podloze_skos_prawy, x:544, y:1424}],
[{o:podloze_skos_prawy, x:560, y:1440}],
[{o:podloze_ziemia, x:464, y:1440}],
[{o:podloze_ziemia, x:544, y:1440}],
[{o:podloze_ziemia, x:528, y:1440}],
[{o:podloze_ziemia, x:480, y:1440}],
[{o:podloze_ziemia, x:480, y:1456}],
[{o:podloze_ziemia, x:480, y:1472}],
[{o:podloze_ziemia, x:528, y:1456}],
[{o:podloze_ziemia, x:528, y:1472}],
[{o:podloze_ziemia, x:528, y:1488}],
[{o:podloze_ziemia, x:512, y:1488}],
[{o:podloze_ziemia, x:496, y:1488}],
[{o:podloze_ziemia, x:480, y:1488}],
[{o:podloze_ziemia, x:496, y:1472}],
[{o:podloze_ziemia, x:512, y:1472}],
[{o:podloze_ziemia, x:512, y:1456}],
[{o:podloze_ziemia, x:496, y:1456}],
[{o:podloze_ziemia, x:512, y:1424}],
[{o:podloze_ziemia, x:512, y:1440}],
[{o:podloze_ziemia, x:496, y:1440}],
[{o:podloze_ziemia, x:496, y:1424}],
[{o:podloze_ziemia, x:480, y:1424}],
[{o:podloze_ziemia, x:496, y:1408}],
[{o:podloze_ziemia, x:512, y:1408}],
[{o:podloze_ziemia, x:528, y:1424}],
[{o:podloze_ziemia, x:480, y:1296}],
[{o:podloze_ziemia, x:496, y:1296}],
[{o:podloze_ziemia, x:512, y:1296}],
[{o:podloze_ziemia, x:528, y:1296}],
[{o:podloze_ziemia, x:528, y:1280}],
[{o:podloze_ziemia, x:512, y:1280}],
[{o:podloze_ziemia, x:496, y:1280}],
[{o:podloze_ziemia, x:480, y:1280}],
[{o:podloze_ziemia, x:480, y:1264}],
[{o:podloze_ziemia, x:496, y:1264}],
[{o:podloze_ziemia, x:512, y:1264}],
[{o:podloze_ziemia, x:528, y:1264}],
[{o:podloze_ziemia, x:464, y:1248}],
[{o:podloze_ziemia, x:480, y:1248}],
[{o:podloze_ziemia, x:496, y:1248}],
[{o:podloze_ziemia, x:512, y:1248}],
[{o:podloze_ziemia, x:528, y:1248}],
[{o:podloze_ziemia, x:544, y:1248}],
[{o:podloze_ziemia, x:528, y:1232}],
[{o:podloze_ziemia, x:512, y:1232}],
[{o:podloze_ziemia, x:496, y:1232}],
[{o:podloze_ziemia, x:480, y:1232}],
[{o:podloze_ziemia, x:496, y:1216}],
[{o:podloze_ziemia, x:512, y:1216}],
[{o:podloze_skos_lewy, x:496, y:1200}],
[{o:podloze_skos_lewy, x:480, y:1216}],
[{o:podloze_skos_lewy, x:464, y:1232}],
[{o:podloze_skos_lewy, x:448, y:1248}],
[{o:podloze_skos_prawy, x:512, y:1200}],
[{o:podloze_skos_prawy, x:528, y:1216}],
[{o:podloze_skos_prawy, x:544, y:1232}],
[{o:podloze_skos_prawy, x:560, y:1248}],
[{o:podloze_ziemia, x:272, y:1360}],
[{o:podloze_ziemia, x:288, y:1360}],
[{o:podloze_ziemia, x:336, y:1312}],
[{o:podloze_ziemia, x:368, y:1312}],
[{o:podloze_ziemia, x:352, y:1312}],
[{o:podloze_ziemia, x:576, y:1152}],
[{o:podloze_ziemia, x:592, y:1152}],
[{o:podloze_ziemia, x:608, y:1152}],
[{o:podloze_ziemia, x:608, y:1136}],
[{o:podloze_ziemia, x:608, y:1120}],
[{o:podloze_ziemia, x:608, y:1104}],
[{o:podloze_ziemia, x:608, y:1024}],
[{o:podloze_ziemia, x:608, y:1008}],
[{o:podloze_ziemia, x:592, y:1008}],
[{o:podloze_ziemia, x:576, y:1008}],
[{o:podloze_ziemia, x:560, y:1008}],
[{o:podloze_ziemia, x:544, y:1008}],
[{o:podloze_ziemia, x:528, y:1008}],
[{o:podloze_ziemia, x:512, y:1008}],
[{o:podloze_ziemia, x:496, y:1008}],
[{o:podloze_ziemia, x:480, y:1008}],
[{o:podloze_ziemia, x:448, y:1024}],
[{o:podloze_ziemia, x:448, y:1008}],
[{o:podloze_ziemia, x:464, y:1008}],
[{o:podloze_ziemia, x:432, y:1024}],
[{o:podloze_ziemia, x:416, y:1024}],
[{o:podloze_ziemia, x:400, y:1024}],
[{o:podloze_ziemia, x:368, y:1024}],
[{o:podloze_ziemia, x:384, y:1024}],
[{o:podloze_ziemia, x:368, y:1040}],
[{o:podloze_ziemia, x:368, y:1056}],
[{o:podloze_ziemia, x:368, y:1072}],
[{o:podloze_ziemia, x:368, y:1104}],
[{o:podloze_ziemia, x:368, y:1088}],
[{o:podloze_ziemia, x:368, y:1120}],
[{o:podloze_ziemia, x:368, y:1136}],
[{o:podloze_ziemia, x:368, y:1152}],
[{o:podloze_ziemia, x:384, y:1152}],
[{o:podloze_ziemia, x:400, y:1152}],
[{o:Walenty, x:64, y:80}],
[{o:zlozona_dziewczyna, x:416, y:1056}],
[{o:klocek, x:416, y:1120}],
[{o:klocek, x:448, y:1120}],
[{o:klocek, x:480, y:1120}],
[{o:klocek, x:1328, y:128}],
[{o:klocek, x:1296, y:128}],
[{o:klocek, x:1360, y:128}],
[{o:podloze_ziemia, x:1280, y:192}],
[{o:podloze_ziemia, x:1296, y:192}],
[{o:podloze_ziemia, x:1312, y:192}],
[{o:podloze_ziemia, x:1280, y:176}],
[{o:podloze_ziemia, x:1328, y:192}],
[{o:podloze_ziemia, x:1344, y:192}],
[{o:podloze_ziemia, x:1264, y:176}],
[{o:podloze_ziemia, x:1248, y:176}],
[{o:podloze_ziemia, x:1248, y:160}],
[{o:podloze_ziemia, x:1360, y:192}],
[{o:podloze_ziemia, x:1376, y:192}],
[{o:podloze_ziemia, x:1392, y:192}],
[{o:podloze_ziemia, x:1408, y:192}],
[{o:podloze_ziemia, x:1424, y:176}],
[{o:podloze_ziemia, x:1408, y:176}],
[{o:podloze_ziemia, x:1440, y:176}],
[{o:podloze_ziemia, x:1440, y:160}],
[{o:zlozona_dziewczyna, x:1328, y:64}],
[{o:podloze_trawa, x:256, y:1216}],
[{o:podloze_trawa, x:192, y:1216}],
[{o:podloze_trawa, x:128, y:1152}],
[{o:podloze_trawa, x:256, y:1024}],
[{o:podloze_trawa, x:192, y:896}],
[{o:podloze_trawa, x:256, y:832}],
[{o:podloze_trawa, x:384, y:896}],
[{o:podloze_ziemia, x:288, y:1248}],
[{o:podloze_ziemia, x:160, y:1152}],
[{o:podloze_ziemia, x:352, y:896}],
[{o:podloze_ziemia, x:224, y:1088}],
[{o:klocek_ciemny, x:320, y:960}],
[{o:klocek_ciemny, x:448, y:864}],
[{o:klocek_ciemny, x:512, y:832}],
[{o:klocek_ciemny, x:576, y:800}],
[{o:klocek_ciemny, x:640, y:768}],
[{o:klocek_ciemny, x:704, y:736}],
[{o:klocek, x:768, y:704}],
[{o:klocek, x:832, y:672}],
[{o:klocek, x:896, y:640}],
[{o:klocek, x:960, y:608}],
[{o:klocek, x:1024, y:576}],
[{o:klocek, x:1088, y:544}],
[{o:klocek, x:1152, y:512}],
[{o:klocek, x:1216, y:480}],
[{o:klocek, x:1280, y:448}],
[{o:klocek, x:1216, y:384}],
[{o:podloze_ziemia, x:704, y:1312}],
[{o:podloze_ziemia, x:688, y:1320}],
[{o:podloze_ziemia, x:680, y:1336}],
[{o:podloze_ziemia, x:672, y:1352}],
[{o:podloze_ziemia, x:672, y:1360}],
[{o:podloze_ziemia, x:680, y:1376}],
[{o:podloze_ziemia, x:696, y:1384}],
[{o:podloze_ziemia, x:712, y:1384}],
[{o:podloze_ziemia, x:720, y:1368}],
[{o:podloze_ziemia, x:720, y:1352}],
[{o:podloze_ziemia, x:704, y:1344}],
[{o:podloze_ziemia, x:696, y:1344}],
[{o:podloze_ziemia, x:720, y:1304}],
[{o:podloze_ziemia, x:808, y:1304}],
[{o:podloze_ziemia, x:792, y:1312}],
[{o:podloze_ziemia, x:776, y:1320}],
[{o:podloze_ziemia, x:768, y:1336}],
[{o:podloze_ziemia, x:760, y:1352}],
[{o:podloze_ziemia, x:760, y:1368}],
[{o:podloze_ziemia, x:768, y:1376}],
[{o:podloze_ziemia, x:776, y:1384}],
[{o:podloze_ziemia, x:792, y:1384}],
[{o:podloze_ziemia, x:808, y:1376}],
[{o:podloze_ziemia, x:816, y:1360}],
[{o:podloze_ziemia, x:808, y:1344}],
[{o:podloze_ziemia, x:792, y:1344}],
[{o:podloze_ziemia, x:776, y:1344}],
[{o:podloze_ziemia, x:888, y:1304}],
[{o:podloze_ziemia, x:872, y:1312}],
[{o:podloze_ziemia, x:856, y:1320}],
[{o:podloze_ziemia, x:848, y:1336}],
[{o:podloze_ziemia, x:848, y:1352}],
[{o:podloze_ziemia, x:848, y:1368}],
[{o:podloze_ziemia, x:856, y:1384}],
[{o:podloze_ziemia, x:864, y:1384}],
[{o:podloze_ziemia, x:880, y:1384}],
[{o:podloze_ziemia, x:896, y:1376}],
[{o:podloze_ziemia, x:896, y:1360}],
[{o:podloze_ziemia, x:888, y:1352}],
[{o:podloze_ziemia, x:880, y:1344}],
[{o:podloze_ziemia, x:864, y:1344}],
[{o:podloze_ziemia, x:1280, y:1216}],
[{o:podloze_trawa, x:1280, y:960}],
[{o:bigBoss, x:1280, y:576}],
[{o:skrzydla, x:320, y:1408}],
[{o:podloze_ziemia, x:1312, y:960}],
[{o:podloze_ziemia, x:1328, y:960}],
[{o:podloze_ziemia, x:1280, y:704}],
[{o:podloze_ziemia, x:1296, y:704}],
[{o:podloze_ziemia, x:1312, y:704}],
[{o:podloze_ziemia, x:1328, y:704}],
[{o:podloze_ziemia, x:1344, y:704}],
[{o:podloze_ziemia, x:1360, y:704}],
[{o:podloze_ziemia, x:1376, y:704}],
[{o:podloze_ziemia, x:1392, y:704}],
[{o:podloze_ziemia, x:1408, y:704}],
[{o:podloze_ziemia, x:1424, y:704}],
[{o:podloze_ziemia, x:1440, y:704}],
[{o:podloze_ziemia, x:1456, y:704}],
[{o:podloze_ziemia, x:1456, y:688}],
[{o:podloze_ziemia, x:1456, y:672}],
[{o:podloze_ziemia, x:1264, y:704}],
[{o:podloze_ziemia, x:1248, y:704}],
[{o:podloze_ziemia, x:1232, y:704}],
[{o:podloze_ziemia, x:1136, y:928}],
[{o:podloze_ziemia, x:1136, y:944}],
[{o:podloze_ziemia, x:1152, y:944}],
[{o:podloze_ziemia, x:1168, y:944}],
[{o:podloze_ziemia, x:1200, y:944}],
[{o:podloze_ziemia, x:1184, y:944}],
[{o:podloze_ziemia, x:1216, y:944}],
[{o:podloze_ziemia, x:1232, y:944}],
[{o:podloze_ziemia, x:1248, y:944}],
[{o:podloze_ziemia, x:1248, y:960}],
[{o:podloze_ziemia, x:1264, y:960}],
[{o:podloze_ziemia, x:1120, y:928}],
[{o:podloze_ziemia, x:1120, y:912}],
[{o:podloze_ziemia, x:1120, y:896}],
[{o:podloze_ziemia, x:1296, y:1216}],
[{o:podloze_ziemia, x:1312, y:1216}],
[{o:podloze_ziemia, x:1328, y:1216}],
[{o:podloze_ziemia, x:1344, y:1216}],
[{o:podloze_ziemia, x:1360, y:1216}],
[{o:podloze_ziemia, x:1376, y:1216}],
[{o:podloze_ziemia, x:1392, y:1216}],
[{o:podloze_ziemia, x:1408, y:1216}],
[{o:podloze_ziemia, x:1424, y:1216}],
[{o:podloze_ziemia, x:1440, y:1216}],
[{o:podloze_ziemia, x:1456, y:1216}],
[{o:podloze_ziemia, x:1472, y:1216}],
[{o:podloze_ziemia, x:1488, y:1216}],
[{o:podloze_ziemia, x:1504, y:1216}],
[{o:podloze_ziemia, x:1520, y:1216}],
[{o:podloze_ziemia, x:1536, y:1216}],
[{o:podloze_ziemia, x:1536, y:1200}],
[{o:podloze_ziemia, x:1552, y:1200}],
[{o:podloze_ziemia, x:1552, y:1184}],
[{o:podloze_ziemia, x:1552, y:1168}],
[{o:podloze_ziemia, x:1552, y:1152}],
[{o:podloze_ziemia, x:1568, y:1152}],
[{o:podloze_ziemia, x:1568, y:1136}],
[{o:podloze_ziemia, x:1568, y:1120}],
[{o:podloze_ziemia, x:1568, y:1104}],
[{o:podloze_ziemia, x:1584, y:1104}],
[{o:podloze_ziemia, x:1584, y:1088}],
[{o:podloze_ziemia, x:1584, y:1072}],
[{o:podloze_ziemia, x:1584, y:1056}],
[{o:klocek, x:1040, y:1312}],
[{o:klocek, x:1008, y:1312}],
[{o:klocek, x:976, y:1312}],
[{o:klocek, x:944, y:1312}],
[{o:klocek, x:1088, y:896}],
[{o:klocek, x:1056, y:896}],
[{o:rozwalacz, x:240, y:20}],
[{o:rozwalacz, x:256, y:64}],
[{o:rozwalacz, x:320, y:32}],
[{o:klocek_ciemny, x:224, y:128}],
[{o:klocek_ciemny, x:288, y:128}],
[{o:klocek_ciemny, x:352, y:128}],
[{o:klocek_ciemny, x:416, y:128}],
[{o:klocek_ciemny, x:448, y:96}],
[{o:klocek_ciemny, x:448, y:32}],
[{o:klocek, x:192, y:128}],
[{o:klocek, x:448, y:128}],
[{o:klocek, x:448, y:0}],
[{o:podloze_trawa, x:256, y:128}],
[{o:podloze_trawa, x:448, y:64}],
[{o:podloze_trawa, x:384, y:128}],
[{o:podloze_trawa, x:288, y:320}],
[{o:podloze_trawa, x:320, y:320}],
[{o:podloze_trawa, x:352, y:320}],
[{o:podloze_trawa, x:320, y:352}],
[{o:podloze_trawa, x:320, y:384}],
[{o:podloze_trawa, x:320, y:288}],
[{o:podloze_skos_lewy, x:272, y:320}],
[{o:podloze_skos_lewy, x:288, y:304}],
[{o:podloze_skos_lewy, x:304, y:288}],
[{o:podloze_skos_lewy, x:320, y:272}],
[{o:podloze_skos_prawy, x:336, y:272}],
[{o:podloze_skos_prawy, x:352, y:288}],
[{o:podloze_skos_prawy, x:368, y:304}],
[{o:podloze_skos_prawy, x:384, y:320}],
[{o:podloze_skos_prawy, x:400, y:336}],
[{o:podloze_skos_lewy, x:256, y:336}],
[{o:podloze_ziemia, x:272, y:336}],
[{o:podloze_ziemia, x:304, y:304}],
[{o:podloze_ziemia, x:352, y:304}],
[{o:podloze_ziemia, x:384, y:336}],
[{o:podloze_ziemia, x:320, y:416}],
[{o:podloze_ziemia, x:336, y:416}],
[{o:podloze_ziemia, x:144, y:256}],
[{o:podloze_ziemia, x:160, y:256}],
[{o:podloze_ziemia, x:144, y:272}],
[{o:podloze_ziemia, x:128, y:272}],
[{o:podloze_trawa, x:112, y:288}],
[{o:podloze_trawa, x:112, y:320}],
[{o:podloze_trawa, x:112, y:352}],
[{o:podloze_trawa, x:112, y:384}],
[{o:podloze_trawa, x:112, y:416}],
[{o:tasma_skraj, x:944, y:240}],
[{o:tasma_skraj_prawy, x:1040, y:240}],
[{o:tasma_lewo, x:960, y:240}],
[{o:tasma_lewo, x:976, y:240}],
[{o:tasma_lewo, x:992, y:240}],
[{o:tasma_lewo, x:1008, y:240}],
[{o:tasma_lewo, x:1024, y:240}],
[{o:klocek_ciemny, x:912, y:288}],
[{o:klocek_ciemny, x:832, y:256}],
[{o:klocek_ciemny, x:752, y:208}],
[{o:klocek_ciemny, x:736, y:144}],
[{o:klocek_ciemny, x:832, y:112}],
[{o:klocek_ciemny, x:896, y:80}],
[{o:klocek_ciemny, x:992, y:64}],
[{o:klocek_ciemny, x:1088, y:48}],
[{o:klocek_ciemny, x:1488, y:272}],
[{o:klocek_ciemny, x:1536, y:224}],
[{o:klocek_ciemny, x:1552, y:144}],
[{o:klocek_ciemny, x:1520, y:64}],
[{o:klocek_ciemny, x:1440, y:32}],
[{o:klocek_ciemny, x:1216, y:32}],
[{o:klocek_ciemny, x:1184, y:32}],
[{o:klocek_ciemny, x:1408, y:32}],
[{o:klocek_ciemny, x:1136, y:160}],
[{o:klocek_ciemny, x:1168, y:160}],
[{o:filizanka_do_wziecia, x:1520, y:16}],
[{o:podloze_ziemia, x:1472, y:1088}],
[{o:podloze_ziemia, x:1488, y:1104}],
[{o:podloze_ziemia, x:1504, y:1104}],
[{o:podloze_ziemia, x:1520, y:1104}],
[{o:podloze_ziemia, x:1536, y:1104}],
[{o:podloze_ziemia, x:1552, y:1104}],
[{o:podloze_ziemia, x:1488, y:1088}],
[{o:kot_do_wziecia, x:1520, y:1056}],
[{o:serduszko, x:576, y:1344}],
[{o:bonus, x:256, y:1280}],
[{o:bonus, x:256, y:1088}],
[{o:bonus, x:256, y:768}],
[{o:bonus, x:256, y:704}],
[{o:bonus, x:256, y:640}],
[{o:bonus, x:384, y:768}],
[{o:bonus, x:384, y:704}],
[{o:bonus, x:384, y:640}],
[{o:bonus, x:512, y:704}],
[{o:bonus, x:512, y:640}],
[{o:bonus, x:512, y:576}],
[{o:bonus, x:576, y:1280}],
[{o:bonus, x:576, y:1216}],
[{o:bonus, x:832, y:192}],
[{o:bonus, x:896, y:128}],
[{o:bonus, x:960, y:128}],
[{o:bonus, x:1024, y:128}],
[{o:bonus, x:704, y:0}],
[{o:bonus, x:768, y:0}],
[{o:bonus, x:832, y:0}],
[{o:bonus, x:704, y:64}],
[{o:bonus, x:768, y:64}],
[{o:bonus, x:704, y:256}],
[{o:bonus, x:768, y:256}],
[{o:bonus, x:512, y:0}],
[{o:bonus, x:576, y:0}],
[{o:bonus, x:512, y:64}],
[{o:bonus, x:576, y:64}],
[{o:bonus, x:512, y:256}],
[{o:bonus, x:576, y:256}],
[{o:bonus, x:576, y:320}],
[{o:bonus, x:512, y:320}],
[{o:bonus, x:1024, y:1216}],
[{o:bonus, x:1024, y:1152}],
[{o:bonus, x:1024, y:1088}],
[{o:bonus, x:1280, y:1152}],
[{o:bonus, x:1280, y:1088}],
[{o:bonus, x:1280, y:1024}],
[{o:bonus, x:1344, y:1152}],
[{o:bonus, x:1344, y:1088}],
[{o:bonus, x:1344, y:1024}],
[{o:bonus, x:1408, y:1472}],
[{o:bonus, x:1472, y:1472}],
[{o:bonus, x:1536, y:1472}],
[{o:bonus, x:1536, y:1408}],
[{o:bonus, x:1472, y:1408}],
[{o:bonus, x:1408, y:1408}],
[{o:bonus, x:1408, y:1344}],
[{o:bonus, x:1472, y:1344}],
[{o:bonus, x:1536, y:1344}],
[{o:podloze_ziemia, x:416, y:1152}],
[{o:podloze_trawa, x:128, y:448}],
[{o:podloze_trawa, x:128, y:480}],
[{o:podloze_trawa, x:128, y:512}],
[{o:podloze_trawa, x:128, y:544}],
[{o:podloze_trawa, x:128, y:576}],
[{o:podloze_trawa, x:128, y:608}],
[{o:podloze_trawa, x:128, y:640}],
[{o:podloze_trawa, x:128, y:672}],
[{o:podloze_trawa, x:128, y:704}],
[{o:podloze_trawa, x:128, y:736}],
[{o:podloze_trawa, x:128, y:768}],
[{o:podloze_trawa, x:128, y:800}],
[{o:podloze_trawa, x:128, y:832}],
[{o:podloze_trawa, x:128, y:864}],
[{o:podloze_trawa, x:128, y:896}],
[{o:podloze_trawa, x:128, y:928}],
[{o:podloze_trawa, x:128, y:960}],
[{o:podloze_trawa, x:1568, y:992}],
[{o:podloze_trawa, x:1568, y:1024}],
[{o:skrzydla, x:1420, y:540}]];
this.start = function() {
__room_start__(this, bossFight, 1600, 1600, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, Walenty, 200, 200);

co_wymagane=['filizanka','kot'];

};
}
var bossFight = new __bossFight();
tu_scenes.push(bossFight);
function __ekran_koncowy() { 
this.tiles = [
];
this.objects = [
[{o:kot_do_wziecia, x:140, y:400}],
[{o:chmurkaKoncowa, x:80, y:0}]];
this.start = function() {
__room_start__(this, ekran_koncowy, 640, 480, 30, 0, 0, 0, paniD.image, 0, 0, 0, 640, 480, null, 50, 50);

end_text='Your score:'+punkty+' ';
end_text2="Now, after pick up all the girls in Hell...";
end_text3="try the same in the real world!";
end_text4="Or just press SPACE to restart game.";


var t_game = document.getElementById('tululoogame');

var end_game1 = document.getElementById('end_game1');

var end_game2 = document.getElementById('end_game2');

komunikatKoncowy('end_game1',end_text,190,35,36);
komunikatKoncowy('end_game2',end_text2,150,110,24);
komunikatKoncowy('end_game3',end_text3,160,150,24);
komunikatKoncowy('end_game4',end_text4,160,180,16);

	/*
	end_game1_div.addEventListener("click",room_goto_first,false);
	end_game2_div.addEventListener("click",room_goto_first,false);
	end_game3_div.addEventListener("click",room_goto_first,false);
*/

};
}
var ekran_koncowy = new __ekran_koncowy();
tu_scenes.push(ekran_koncowy);
tu_room_to_go = EkranStartowy;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/
global.gra_w_pelni_zaladowana = false;

strefaParzeniaLawy=40;

global.czestotliwoscTworzenia=100;

dnoPiekieł = 1480;
global.poziomLawy = dnoPiekieł;

dzwieki_on_bool=true;
muzyka_on_bool=true;

dzwieki_tylko_etapu=true;

odgrywany_utwor=Greensleeves;


procent_latania=0;

moze_latac=false;
maPistolet=false;

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


bronie={
	'pistolet':[pistolet,pistoletHUD,6,40,pociskPistoletu,15,1,snd_glock],
	'kalasz':[kalasz,kalaszS,60,10,pociskPistoletu,20,3,snd_ak47],
	'granat':[granat,granatS,5,20,granatRzucony,5,1,snd_rzut],
	'granatnik':[granatnik,granatnikS,4,60,pociskGranatnika,5,1,snd_granat],
	'rozwalacz':[rozwalacz,rozwalaczS,3,70,pociskRozwalacza,11,1,snd_rozwalacz]
};



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


if (ile<0)
	{
		zerujStanPosiadania();
	}

if (zycia>0)
{
	if (ile<0)
	{
		room_restart();
	}
}
else
{
	
	room_goto_first();
}
}
function letsStartGame() { 
zerujStanPosiadania();

room_goto_first();

poziomu_nr=0;
kolejnyEtap();

}
function wyliczDno() { 
return global.poziomLawy;
}
function dodajBron(ktora) { 
posiadane_bronie[ktora]+=bronie[ktora][2];
wybrana_bron=ktora;
}
function wybuchGranatu(x,y) { 
for (i=0;i<10;i++)
{
	instance_create(x,y,kawalek);
}

}
function wybuchCzaszki(x,y) { 
kule=[];

for (var i=0;i<=360;i+=15) {
	kule[i] = instance_create(x,y,pociskPistoletu);
	kule[i].direction = i;
	kule[i].speed = 20;
}
}
function tworzenieWroga(bossThis,rodzaj) { 
bossThis.odliczStworzenie--;
		if (bossThis.odliczStworzenie<0) {
			bossThis.odliczStworzenie=global.czestotliwoscTworzenia;
			wrog=instance_create(bossThis.x,bossThis.y+8,rodzaj);
		}
}
function animacjaBosa(bossThis,bossType) { 
var srodek=bossThis.x+bossType.width/2-miniLifeBarS.width/2;
	draw_sprite_ext(miniLifeBarS ,0,srodek,bossThis.y-30,bossThis.zycie/100,1,0,0.75);
	subimg=0;
	if (bossThis.odliczStworzenie>global.czestotliwoscTworzenia-30) {
		subimg=1;
		if (bossThis.odliczStworzenie>global.czestotliwoscTworzenia-20) {
			subimg=2;
			if (bossThis.odliczStworzenie>global.czestotliwoscTworzenia-10) {
				subimg=1;
			}
		}
	}
	if (bossType==glownyBossS) {
		subimg=0;
	}
	draw_sprite_ext(bossType,subimg,bossThis.x,bossThis.y-30,1,1,0,1);
}
function wybieranieBroni() { 
nowowybrana='';
if ( keyboard_check(vk_1)) {
	nowowybrana= 'pistolet';
}

if ( keyboard_check(vk_2)) {
	nowowybrana='kalasz';
}

if ( keyboard_check(vk_3)) {
	nowowybrana='granat';
}

if ( keyboard_check(vk_4)) {
	nowowybrana='granatnik';
}


if ( keyboard_check(vk_5)) {
	nowowybrana='rozwalacz';
}

if (nowowybrana!='') {
	if (posiadane_bronie[nowowybrana]>0) {
		wybrana_bron=nowowybrana;
	}
}

}
function ranaPotworowi(_this,_other,ile) { 
if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(snd_ou);
_this.zycie-=ile;
_other.instance_destroy();
}
function zabiciePotwora(_this,pkt) { 
if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(snd_potwor);

expl = instance_create(_this.x+irandom(5)-3,_this.y +irandom(5)-3 ,explozja);
doliczPunkty(pkt);


}
function wybuchRozwalacza(x,y) { 
kule=[];

for (var i=0;i<=360;i+=60) {
	kule[i] = instance_create(x,y,odlamek);
	kule[i].direction = i;
	kule[i].speed = 30;
}
}
function sound_loop_2(a) { 

    myAudio = a.audio
    if (typeof myAudio.loop == 'boolean')
    {
        myAudio.loop = true;
    }
    else
    {
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    myAudio.play();

}
function muzyka_on_off() { 
muzyka_on_bool=!muzyka_on_bool;

if (muzyka_on_bool) {
	sound_loop_2(odgrywany_utwor);
} else {
		wycisz_muzyke();
}

}
function ustaw_odgrywany_utwor(utwor) { 
odgrywany_utwor=utwor;
if (muzyka_on_bool) {
	wycisz_muzyke();
	myAudio = odgrywany_utwor.audio
	myAudio.currentTime=0;
	sound_loop_2(odgrywany_utwor);
}
}
function wycisz_muzyke() { 
sound_stop_all();
}
function przyblizIpomniejsz(obj,other) { 
obj.x=(obj.x+other.x)/2;
obj.y=(obj.y+other.y)/2;
if (obj.image_yscale>0.1) {
	obj.image_yscale-=0.1;
	obj.image_yscale-=0.1;
}
}
function zerujStanPosiadania() { 
moze_latac=false;
maPistolet=false;

posiadane_bronie={
	'pistolet':0,
	'kalasz':0,
	'granat':0,
	'granatnik':0,
	'rozwalacz':0
};

wybrana_bron='';

liczba_spelnionych=0;
}
function komunikatKoncowy(idn,tresc,pozX,pozY,wlk) { 
// idn,tresc,pozX,pozY,wlk
var t_game = document.getElementById('tululoogame');
var dodawany_div = document.createElement('div');

dodawany_div.setAttribute('id',idn);
dodawany_div.setAttribute('name',idn);
dodawany_div.setAttribute('style','position: absolute; top: '+pozY+'px; left: '+pozX+'px; font-size: '+wlk+'px; color: red; text-align: center;');

dodawany_div.innerHTML = tresc;

t_game.appendChild(dodawany_div);
}
function kolejnyEtap() { 
punkty*=3;
gra_wstepna=0;
room_goto_next();
ustaw_odgrywany_utwor(Greensleeves);
poziomu_nr++;
}


tu_gameloop = tu_loop;
tu_loop();
