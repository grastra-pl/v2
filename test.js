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

szybkosc_utraty_latania=6;
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
		
		
		
		//if (image_index>0)
		//{
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

		//}
		
		
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
		if (this.spada==false) {
			image_angle=0;
		} else {
			image_angle=air*12;
		}
		
		if ( (keyboard_check_pressed(vk_w) ||  keyboard_check( vk_up )) && this.jump == 0 && this.air ==0 && this.spada == false) {
			jump = 1;
			air =  9; // siła skoku
			if (dzwieki_on_bool && dzwieki_tylko_etapu) sound_play(snd_jump);
			 
		}

		if ( air > -32 ) air -= 0.5;

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
	
		if ( keyboard_check(vk_d) || keyboard_check( vk_right ) )  {
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

		if ( keyboard_check(vk_a) || keyboard_check( vk_left )) {
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

	strefaParzeniaLawy=20;
	
	if (y>wyliczDno()-strefaParzeniaLawy)
	{
		bity++;
	}

	if (y>wyliczDno())
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